import { AlgorithmContext } from "@/lib/coreContext"
import labyrinth from "@/lib/generators/labyrinth"
import spiced from "@/lib/generators/spiced"
import { session } from "@/lib/helpers/storage"
import { ui } from "@/lib/helpers/ui"
import { useContext, useEffect } from "react"

export function useGenerator() {
  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")

  const { matrix, setMatrix, clearMatrixWalls, setIsRunning, mazeGenerationAlgorithm, setIsCompleted } = algorithmContext

  const generate = () => {
    switch (mazeGenerationAlgorithm) {
      case "CUSTOM":
        break
      case "RECURSIVE_DIVISION":
        setMatrix(labyrinth())
        break
      case "SPICED":
        setMatrix(spiced())
        break
      default:
        console.log("run => algorithm not found!")
    }
  }

  const prepare = () => {
    clearMatrixWalls()
    setIsCompleted(true)
    setIsRunning(false)
    session.setItem("mazeGenerationAlgorithm", mazeGenerationAlgorithm)
    ui.clearVisitedAndWalls()
  }

  useEffect(() => {
    prepare()
    generate()
  }, [mazeGenerationAlgorithm])
}
