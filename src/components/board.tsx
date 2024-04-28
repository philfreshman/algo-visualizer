"use client"

import Box from "@/components/atoms/box"
import { useGenerator } from "@/lib/generator"
import { keyPress } from "@/lib/helpers/keyPress"
import { ui } from "@/lib/helpers/ui"
import { useRunner } from "@/lib/runner"
import { memo, useState } from "react"

export const Board = memo(() => {
  useGenerator()

  const { matrix, toggleBox, resetBoard, start, end, setStart, setEnd } = useRunner()
  const [dragging, setDragging] = useState<null | "start" | "end" | "wall">(null)

  keyPress("c", ui.clearToggled)
  keyPress("x", resetBoard)

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
  // 23px - 920 px
  // 22px - 880 px
  // 21px - 840 px
  // 20px - 800 px
  // 19px - 760 px
  // 18px - 720 px
  // 17px - 680 px

  const tableSize = (): string => {
    return "aspect-[4/3] w-full box17:w-[680px] box19:w-[760px] box20:w-[800px] box22:w-[880px] box23:w-[920px] box24:w-[961px]"
  }

  return (
    <div className={` flex rotate-90 transform justify-center box17:rotate-0 ${tableSize()}}} `}>
      <table id="table" className={"h-full w-full "} style={{ cursor: "crosshair" }}>
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
    </div>
  )
})
