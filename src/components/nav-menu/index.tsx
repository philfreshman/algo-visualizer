import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/atoms/menubar"
import RunMenu from "@/components/nav-menu/run-menu"
import { ThemeMenu } from "@/components/nav-menu/theme-menu"
import { mazeAlgorithms, searchAlgorithms } from "@/lib/constants"
import { AlgorithmContext } from "@/lib/coreContext"
import { session } from "@/lib/helpers/storage"
import { ui } from "@/lib/helpers/ui"
import { useContext } from "react"
import { SpeedMenu } from "./speed-menu"

export default function Index() {
  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")
  const {
    pathfindingAlgorithm,
    isCompleted,
    setPathfindingAlgorithm,
    setIsCompleted,
    mazeGenerationAlgorithm,
    setMazeGenerationAlgorithm,
    setIsRunning,
  } = algorithmContext

  const onPathfindingChange = (key: string) => {
    if (!isCompleted) session.setItem("shouldTerminate", "true")
    setIsRunning(false)
    setIsCompleted(true)
    setPathfindingAlgorithm(key)
    ui.clearVisited()
  }

  const onMazeGenerationChange = (key: string) => {
    ui.clearVisited()
    if (!isCompleted) session.setItem("shouldTerminate", "true")
    setIsRunning(false)
    setIsCompleted(true)
    setMazeGenerationAlgorithm(key)
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Algorithm</MenubarTrigger>
        <MenubarContent>
          {Object.entries(searchAlgorithms).map(([key, value]) => (
            <MenubarCheckboxItem checked={pathfindingAlgorithm == key} key={key} onClick={() => onPathfindingChange(key)}>
              {value}
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Grid</MenubarTrigger>
        <MenubarContent>
          {Object.entries(mazeAlgorithms).map(([key, value]) => (
            <MenubarCheckboxItem checked={mazeGenerationAlgorithm == key} key={key} onClick={() => onMazeGenerationChange(key)}>
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
