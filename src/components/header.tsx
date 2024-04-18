import NavMenu from "@/components/nav-menu"
import { Roboto_Condensed } from "next/font/google"

const robotoCondensed = Roboto_Condensed({ weight: "800", style: "italic", subsets: ["latin"] })

export default function Header() {
  return (
    <div className={"flex h-40 w-full items-center justify-center"}>
      <div className={"flex h-[110px] w-[500px] flex-col  rounded-2xl border-[1px] border-b-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)]"}>
        <div className={"flex h-1/2 items-center justify-center "}>
          <h1 className={"select-none text-[50px] text-[#ACE9EC] outline-amber-500 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] " + robotoCondensed.className}>ALGO-VISUALIZER</h1>
        </div>
        <div className={"flex h-1/2 items-center justify-center"}>
          <NavMenu />
        </div>
      </div>
    </div>
  )
}
