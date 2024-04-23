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
      className={`h-[18px] w-[18px] border border-sky-500 p-0 sm:h-[20px] sm:w-[20px] md:h-[22px] md:w-[22px] lg:h-[24px] lg:w-[24px] ${isToggled ? "toggled" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
      style={{ cursor: start || end ? (isDragging ? "grabbing" : "grab") : "" }}
    >
      {id === "start" && <div className="emoji alien -rotate-90 md:rotate-0" />}
      {id === "end" && <div className="emoji diamond -rotate-90 md:rotate-0" />}
    </td>
  )
})

export default Box
