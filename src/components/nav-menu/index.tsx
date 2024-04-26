import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/atoms/menubar"
import RunMenu from "@/components/nav-menu/run-menu"
import { ThemeMenu } from "@/components/nav-menu/theme-menu"
import { AlgorithmContext } from "@/lib/coreContext"
import { clearVisited } from "@/lib/utils/reset"
import { storage } from "@/lib/utils/storage"
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
    searchAlgorithms,
    mazeAlgorithms,
    setIsRunning,
  } = algorithmContext

  const onPathfindingChange = (key: string) => {
    if (!isCompleted) storage.setItem("shouldTerminate", "true")
    setIsRunning(false)
    setIsCompleted(true)
    setPathfindingAlgorithm(key)
    clearVisited()
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
            <MenubarCheckboxItem
              checked={mazeGenerationAlgorithm == key}
              key={key}
              onClick={() => setMazeGenerationAlgorithm(key)}
              disabled={key == "LABIRYNT"}
            >
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
