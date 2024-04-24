"use client"

import { useRunner } from "@/lib/runner"
import { keyShortcuts } from "@/lib/utils/key-shortcuts"
import { clearToggled } from "@/lib/utils/reset"
import { memo, useState } from "react"
import Box from "./ui/box"

const Board = memo(() => {
  const { matrix, toggleBox, resetBoard, start, end, setStart, setEnd } = useRunner()
  const [dragging, setDragging] = useState<null | "start" | "end" | "wall">(null)

  keyShortcuts("c", clearToggled)
  keyShortcuts("x", resetBoard)

  const isStartPosition = (p: Position): boolean => p.row == start.row && p.col == start.col
  const isEndPosition = (p: Position): boolean => p.row == end.row && p.col == end.col

  const getId = (p: Position): string => {
    if (isStartPosition(p)) {
      return "start"
    } else if (isEndPosition(p)) {
      return "end"
    }
    return `B${p.row}:${p.col}`
  }

  const isStart = (p: Position): boolean => {
    return p.row == start.row && p.col == start.col
  }

  const isEnd = (p: Position): boolean => {
    return p.row == end.row && p.col == end.col
  }

  const handleDragStart = (type: "start" | "end" | "wall") => {
    setDragging(type)
  }

  const handleDragEnd = () => {
    setDragging(null)
  }

  const handleDragOver = (i: number, j: number) => {
    if (dragging === "start") {
      setStart({ row: i, col: j })
    } else if (dragging === "end") {
      setEnd({ row: i, col: j })
    } else if (dragging === "wall") {
      toggleBox(i, j)
    }
  }

  // 24px - 960 px
  // 22px - 880 px
  // 20px - 800
  // 19px - 760
  //
  // 17px - 680 px

  const tableSize = (): string => {
    return "aspect-[4/3] w-full xxs:w-[680px] xs:w-[760px] sm:w-[800px] md:w-[880px] lg:w-[960px]"
  }

  const bg = (): string => {
    return "xxs:bg-blue-400 xs:bg-yellow-400 sm:bg-brown-400 md:bg-gray-400 lg:bg-green-400 "
  }

  return (
    // <div className={`flex rotate-90 transform justify-center sm:rotate-0 ${tableSize()} ${bg()}} `}>
    <div className={`flip-vertical sm: flip-vertical-none flex rotate-90 transform justify-center sm:rotate-0 ${tableSize()} ${bg()}} `}>
      <table id="table" className={"h-full w-full"} style={{ cursor: "crosshair" }}>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <Box
                  id={getId({ row: i, col: j })}
                  key={j}
                  isToggled={value !== 0}
                  toggleBox={() => toggleBox(i, j)}
                  start={isStart({ row: i, col: j })}
                  end={isEnd({ row: i, col: j })}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragOver={() => handleDragOver(i, j)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/*</div>*/}
    </div>
  )
})

export default Board
