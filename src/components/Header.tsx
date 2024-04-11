import NavMenu from "@/components/NavMenu"
import { Roboto_Condensed } from "next/font/google"

const robotoCondensed = Roboto_Condensed({ weight: "800", style: "italic" })

export default function Header() {
  return (
    <div className={"w-full h-40 flex justify-center items-center"}>
      <div className={"h-[110px] w-[500px] flex flex-col  border-b-white border-[1px] rounded-2xl shadow-[0_15px_50px_-15px_rgba(0,0,0,0.2)]"}>
        <div className={"h-1/2 flex justify-center items-center "}>
          <h1 className={"select-none text-[50px] outline-amber-500 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] text-[#ACE9EC] " + robotoCondensed.className}>ALGO-VISUALIZER</h1>
        </div>
        <div className={"h-1/2 flex justify-center items-center"}>
          <NavMenu />
        </div>
      </div>
    </div>
  )
}
