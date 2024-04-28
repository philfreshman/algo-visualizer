import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/atoms/menubar"
import RunMenu from "@/components/nav-menu/run-menu"
import { ThemeMenu } from "@/components/nav-menu/theme-menu"
import { MazeAlgorithms, MazeKey, SearchAlgorithms, SearchKey } from "@/lib/constants"
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

  const onPathfindingChange = (key: SearchKey) => {
    if (!isCompleted) session.setItem("shouldTerminate", "true")
    setIsRunning(false)
    setIsCompleted(true)
    setPathfindingAlgorithm(key)
    ui.clearVisited()
  }

  const onMazeGenerationChange = (key: MazeKey) => {
    setMazeGenerationAlgorithm(key)
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Algorithm</MenubarTrigger>
        <MenubarContent>
          {Object.entries(SearchAlgorithms).map(([key, value]) => (
            <MenubarCheckboxItem checked={mazeGenerationAlgorithm == key} key={key} onClick={() => onPathfindingChange(key as SearchKey)}>
              {value}
            </MenubarCheckboxItem>
          ))}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Grid</MenubarTrigger>
        <MenubarContent>
          {Object.entries(MazeAlgorithms).map(([key, value]) => (
            <MenubarCheckboxItem
              checked={mazeGenerationAlgorithm == key}
              key={key}
              onClick={() => onMazeGenerationChange(key as MazeKey)}
              disabled={key === "RD"}
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
