import { memo } from "react"

interface BoxProps {
  id: string
  isToggled: boolean
  toggleBox: () => void
}

const Box = memo<BoxProps>(({ id, isToggled, toggleBox }) => {
  const handleMouseDown = () => toggleBox()
  const handleMouseOver = (e: any) => e.buttons === 1 && toggleBox()

  return (
    <td
      id={id}
      className={`md-min-w-[22px] h-[18px] min-w-[18px] border border-sky-500 hover:cursor-pointer sm:h-[20px] sm:min-w-[20px] md:h-[22px] lg:h-[24px] lg:min-w-[24px] ${isToggled ? "checked" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
    />
  )
})

export default Box
