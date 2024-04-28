import { AlgorithmContext } from "@/lib/coreContext"
import recursiveDivision from "@/lib/generators/recursiveDivision"
import { session } from "@/lib/helpers/storage"
import { ui } from "@/lib/helpers/ui"
import { useContext, useEffect } from "react"

export function useGenerator() {
  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")
  const { mazeGenerationAlgorithm, clearMatrixWalls, setCompleted, matrix, setMatrix } = algorithmContext

  const generate = () => {
    switch (mazeGenerationAlgorithm) {
      case "CUSTOM":
        console.log("custom")
        break
      case "STAR":
        console.log("STAR")
        console.dir(matrix)
        // starPattern(matrix)
        break
      case "RD":
        recursiveDivision(matrix, { row: 0, col: 0 }, { row: 29, col: 39 })
        break
      default:
        console.log("run => algorithm not found!")
    }
  }

  const prepare = () => {
    session.setItem("shouldTerminate", "true")
    session.setItem("mazeGenerationAlgorithm", mazeGenerationAlgorithm)
    ui.clearVisitedAndWalls()
    clearMatrixWalls()
  }

  useEffect(() => {
    prepare()
    generate()
  }, [mazeGenerationAlgorithm])
}
