"use client"

import Box from "@/components/ui/box"
import { useBoxes } from "@/lib/maze/maze"

export default function Board() {
  const { matrix, toggleBox } = useBoxes()

  return (
    <div className={"flex rotate-90 transform justify-center md:rotate-0"}>
      <table>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <Box id={`B${i}:${j}`} key={j} isToggled={value} toggleBox={() => toggleBox(i, j)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
