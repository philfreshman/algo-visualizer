import Index from "@/components/nav-menu"
import { MousePositionContext } from "@/lib/mouseContext"
import { Roboto_Condensed } from "next/font/google"
import { FC, useContext, useEffect, useRef } from "react"

const robotoCondensed = Roboto_Condensed({ weight: "800", style: "italic", subsets: ["latin"] })

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const h1Ref = useRef<HTMLHeadingElement | null>(null)
  const { x, y } = useContext(MousePositionContext)

  // glitch - colors
  const a = "#071325"
  const b = "#122C59"
  const c = "#39FBDB"
  const d = "#FD10F5"
  const e = "#563193"

  useEffect(() => {
    if (h1Ref.current) {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const rXP = centerX - x
      const rYP = centerY - y
      const shadowX = (rYP >= 0 ? 1 : -1) * Math.min(Math.abs(rYP) / 50, 5)
      const shadowY = (rXP >= 0 ? 1 : -1) * Math.min(Math.abs(rXP) / 50, 5)
      const shadowZ = Math.min(Math.abs((rXP + rYP) / 100), 5)
      const blur = "5px" // Adjust this value to change the amount of blur
      h1Ref.current.style.textShadow = `${shadowX}px ${shadowY}px ${blur} ${d}, ${shadowY}px ${shadowZ}px ${blur} ${e}, ${shadowZ}px ${shadowX}px ${blur} ${b}`
    }
  }, [x, y])

  return (
    <div className={"flex h-40 w-full items-center justify-center"}>
      <div
        className={
          "flex h-[110px] w-[500px] flex-col  rounded-2xl border-[1px] border-b-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)]"
        }
      >
        <div className={"flex h-1/2 items-center justify-center "}>
          <h1
            ref={h1Ref}
            className={
              `select-none text-[50px] text-[#39FBDB] outline-amber-500 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] ` + robotoCondensed.className
            }
          >
            ALGO-VISUALIZER
          </h1>
        </div>
        <div className={"flex h-1/2 items-center justify-center"}>
          <Index />
        </div>
      </div>
    </div>
  )
}
