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

  // 24px - 960 px // lg
  // 23px - 920 px
  // 22px - 880 px // md
  // 21px - 840 px
  // 20px - 800 px // sm
  // 19px - 760 px // xs
  // 18px - 720 px
  // 17px - 680 px // xxs

  const tableSize = (): string => {
    return "aspect-[4/3] w-full box17:w-[680px] box19:w-[760px] box20:w-[800px] box22:w-[880px] box23:w-[920px] box24:w-[961px]"
  }

  const bg = (): string => {
    return "box17:bg-blue-400 box18:bg-red-400 box19:bg-yellow-400 box20:bg-pink-200 box21:bg-blue-400 box22:bg-gray-400 box23:bg-red-400 box24:bg-green-400"
  }

  return (
    <div className={`box17:rotate-0 flex rotate-90 transform justify-center ${tableSize()} ${bg()}} `}>
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
