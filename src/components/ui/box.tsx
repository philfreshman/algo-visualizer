"use client"
import { memo } from "react"

interface BoxProps {
  isToggled: boolean
  toggleBox: () => void
}

const Box = memo<BoxProps>(({ isToggled, toggleBox }) => {
  const handleMouseDown = () => {
    toggleBox()
  }

  const handleMouseOver = (e: any) => {
    if (e.buttons === 1) {
      toggleBox()
    }
  }

  return (
    <td
      className={`aspect-square h-6 min-w-6  hover:cursor-pointer border border-sky-500 ${isToggled ? "bg-black" : "bg-white"}`}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
    />
  )
})

export default Box
