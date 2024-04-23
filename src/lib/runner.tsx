"use client"

import { bfs } from "@/lib/algorithms/bfs"
import { dfs } from "@/lib/algorithms/dfs"
import { clearVisited, markStartAsVisited } from "@/lib/utils/reset"
import { storage } from "@/lib/utils/storage"
import { useContext, useEffect, useState } from "react"
import { AlgorithmContext } from "./coreContext"

export function useRunner() {
  const startPos: Position = { col: 8, row: 8 }
  const endPos: Position = { col: 32, row: 22 }

  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")

  const { pathfindingAlgorithm, isRunning, startTrigger, setCompleted, matrix, setMatrix } = algorithmContext
  const [start, setStart] = useState<Position>(startPos)
  const [end, setEnd] = useState<Position>(endPos)

  // handlers
  const run = async () => {
    let visited: Position[] = []
    clearVisited()

    switch (pathfindingAlgorithm) {
      case "DFS":
        markStartAsVisited()
        await dfs(matrix, visited, start, end)
        break
      case "BFS":
        markStartAsVisited()
        await bfs(matrix, visited, start, end)
        break
      default:
        console.log("run => algorithm not found!")
    }
    setCompleted()
  }

  const toggleBox = (i: number, j: number) => {
    let box = document.querySelector(`#B${i}\\:${j}`)
    if (box && !box.classList.contains("wall")) {
      box!.classList.toggle("toggled")
    }
    setMatrix((prevMatrix: Matrix) => {
      const newMatrix = prevMatrix.map((row) => [...row])
      newMatrix[i][j] = newMatrix[i][j] === 0 ? 1 : 0
      return newMatrix
    })
  }

  const resetBoard = async () => {
    storage.setItem("shouldTerminate", "true")
    storage.setItem("isRunning", "false")
    clearVisited()
  }

  useEffect(() => {
    if (isRunning) run().then()
  }, [startTrigger])

  return { matrix, start, end, toggleBox, resetBoard, setStart, setEnd }
}
