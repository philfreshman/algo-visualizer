"use client"

import Box from "@/components/ui/box"
import { useCore } from "@/lib/core"
import { keyShortcuts } from "@/lib/utils/key-shortcuts"
import { clearToggled } from "@/lib/utils/reset"

export default function Board() {
  const { matrix, toggleBox, resetBoard } = useCore()

  keyShortcuts("c", clearToggled)
  keyShortcuts("x", resetBoard)

  return (
    <div className={"flex rotate-90 transform justify-center hover:cursor-crosshair md:rotate-0"}>
      <table id="table">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <Box id={`B${i}:${j}`} key={j} isToggled={value !== 0} toggleBox={() => toggleBox(i, j)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
