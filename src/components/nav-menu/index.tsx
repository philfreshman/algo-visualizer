import RunMenu from "@/components/nav-menu/run-menu"
import { SpeedMenu } from "@/components/nav-menu/speed-menu"
import { ThemeMenu } from "@/components/nav-menu/theme-menu"
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { AlgorithmContext } from "@/lib/context"
import { useContext } from "react"

export default function Index() {
  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")
  const { pathfindingAlgorithm, setPathfindingAlgorithm, mazeGenerationAlgorithm, setMazeGenerationAlgorithm, searchAlgorithms, mazeAlgorithms } = algorithmContext

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
            <MenubarCheckboxItem checked={mazeGenerationAlgorithm == key} key={key} onClick={() => setMazeGenerationAlgorithm(key)} disabled={key == "LABIRYNT"}>
              {value}
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>

      <SpeedMenu />

      <ThemeMenu />

      <RunMenu />
    </Menubar>
  )
}
