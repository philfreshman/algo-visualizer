import { AlienIcon, DiamondIcon } from "@/components/ui/icons"
import { memo, useState } from "react"

interface BoxProps {
  id: string
  isToggled: boolean
  toggleBox: () => void
  start?: boolean
  end?: boolean
  onDragStart: any
  onDragEnd: any
  onDragOver?: any // Optional for handling drag over within the box itself
  dragging?: "start" | "end" | null // New prop to receive dragging state
}

const alien = () => {}

const Box = memo(({ id, isToggled, toggleBox, start, end, onDragStart, onDragEnd, onDragOver }: BoxProps) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (e: any) => {
    e.preventDefault()
    if (start) {
      onDragStart("start")
    } else if (end) {
      onDragStart("end")
    } else {
      handleOnClick(e)
      onDragStart("wall")
    }
  }

  const handleMouseUp = (e: any) => {
    e.preventDefault()
    onDragEnd()
  }

  const handleMouseOver = (e: any) => {
    e.preventDefault()
    onDragOver()
  }

  const handleOnClick = (e: any) => {
    if (start || end) return
    e.preventDefault()
    toggleBox()
  }

  return (
    <td
      id={id}
      className={`aspect-square h-3 w-3 border border-sky-500 p-0 ${isToggled ? "toggled" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
      style={{ cursor: start || end ? (isDragging ? "grabbing" : "grab") : "" }}
    >
      <div className={"flex aspect-square h-full w-full items-center justify-center"}>
        {id === "end" && <DiamondIcon className={" -rotate-90 md:rotate-0"} />}
        {id === "start" && <AlienIcon className={"-rotate-90 md:rotate-0"} />}
      </div>
    </td>
  )
})

export default Box
