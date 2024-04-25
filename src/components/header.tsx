import Index from "@/components/nav-menu"
import { Roboto_Condensed } from "next/font/google"
import { FC } from "react"

const robotoCondensed = Roboto_Condensed({ weight: "800", style: "italic", subsets: ["latin"] })

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  // glitch - colors
  const a = "#071325"
  const b = "#122C59"
  const c = "#39FBDB"
  const d = "#FD10F5"
  const e = "#563193"

  return (
    <div className={"flex h-40 w-full items-center justify-center"}>
      <div
        className={
          "flex h-[110px] w-[500px] flex-col  rounded-2xl border-[1px] border-b-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)]"
        }
      >
        <div className={"flex h-1/2 items-center justify-center "}>
          <h1
            className={
              `text-shadow-header select-none text-[50px] text-[#39FBDB] outline-amber-500 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] ` +
              robotoCondensed.className
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
