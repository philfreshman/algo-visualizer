import { Button } from "@/components/ui/button"
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { AlgorithmContext } from "@/lib/context"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useContext, useState } from "react"

export default function NavMenu() {
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)

  const setThemeClick = (theme: "light" | "dark") => {
    setTheme(theme)
    setCurrentTheme(theme)
  }

  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")
  const { pathfindingAlgorithm, setPathfindingAlgorithm, mazeGenerationAlgorithm, setMazeGenerationAlgorithm, searchAlgorithms, mazeAlgorithms, startAlgorithm } = algorithmContext

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
        <MenubarTrigger>Placeholder</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem onSelect={() => console.log(123)}>A</MenubarCheckboxItem>
          <MenubarCheckboxItem>B</MenubarCheckboxItem>
          <MenubarCheckboxItem>C</MenubarCheckboxItem>
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
