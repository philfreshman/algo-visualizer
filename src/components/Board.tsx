"use client"
import Box from "@/components/ui/box"
import { useEffect, useState } from "react"

export default function Board() {
  const [isDragging, setIsDragging] = useState(false)
  const [boxes, setBoxes] = useState(Array(30 * 60).fill(false))

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const toggleBox = (index: number) => {
    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes]
      newBoxes[index] = !newBoxes[index]
      return newBoxes
    })
  }

  return (
    <div className={"flex rotate-90 transform justify-center md:rotate-0"} onMouseUp={handleMouseUp}>
      <table>
        <tbody>
          {Array.from({ length: 30 }, (_, i) => (
            <tr key={i}>
              {Array.from({ length: 40 }, (_, j) => (
                <Box id={`${i}:${j}`} key={j} isToggled={boxes[i * 60 + j]} toggleBox={() => toggleBox(i * 60 + j)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
