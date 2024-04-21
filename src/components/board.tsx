"use client"

import Box from "@/components/ui/box"
import { useCore } from "@/lib/core"
import { keyShortcuts } from "@/lib/utils/key-shortcuts"
import { clearToggled } from "@/lib/utils/reset"
import { memo, useState } from "react"

const Board = memo(() => {
  const { matrix, toggleBox, resetBoard, start, end, setStart, setEnd } = useCore()
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

  return (
    <div className={"flex rotate-90 transform justify-center md:rotate-0"}>
      {/*<table id="table">*/}
      <table id="table" style={{ cursor: "crosshair" }}>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) =>
                // prettier-ignore
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
                />,
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

export default Board
