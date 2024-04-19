import { Button } from "@/components/ui/button"
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { Slider } from "@/components/ui/slider"
import { AlgorithmContext } from "@/lib/context"
import { local } from "@/lib/utils/local"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useContext, useEffect, useState } from "react"

export default function NavMenu() {
  const speedScale = 150
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)

  const setThemeClick = (theme: "light" | "dark") => {
    setTheme(theme)
    setCurrentTheme(theme)
  }

  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")
  const { pathfindingAlgorithm, setPathfindingAlgorithm, mazeGenerationAlgorithm, setMazeGenerationAlgorithm, searchAlgorithms, mazeAlgorithms, startAlgorithm } = algorithmContext

  const [delay, setDelay] = useState<number>(0)
  const onSetDelay = (value: number) => {
    setDelay((prevState) => {
      if (prevState === value) return prevState
      local.setItem("delay", String(speedScale - value))
      return speedScale - value
    })
  }

  useEffect(() => setDelay(100 - Number(local.getItem("delay"))), [])

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Algorithm</MenubarTrigger>
        <MenubarContent>
          {Object.entries(searchAlgorithms).map(([key, value]) => (
            <MenubarCheckboxItem checked={pathfindingAlgorithm == key} key={key} onClick={() => setPathfindingAlgorithm(key)}>
              {value}
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Grid</MenubarTrigger>
        <MenubarContent>
          {Object.entries(mazeAlgorithms).map(([key, value]) => (
            <MenubarCheckboxItem checked={mazeGenerationAlgorithm == key} key={key} onClick={() => setMazeGenerationAlgorithm(key)}>
              {value}
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Speed</MenubarTrigger>
        <MenubarContent align={"center"}>
          <MenubarItem>
            <Slider defaultValue={[speedScale - delay]} min={0} max={speedScale} name={"slow"} onValueChange={(num) => onSetDelay(num[0])} step={1} />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem onClick={() => setThemeClick("light")} checked={currentTheme === "light"}>
            Light
          </MenubarCheckboxItem>
          <MenubarCheckboxItem onClick={() => setThemeClick("dark")} checked={currentTheme === "dark"}>
            Dark
          </MenubarCheckboxItem>
          <MenubarCheckboxItem disabled>System</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>

      <Button variant={"ghost"}>Reset</Button>
      <Button variant={"ghost"} onClick={() => startAlgorithm()}>
        Run
      </Button>
    </Menubar>
  )
}
