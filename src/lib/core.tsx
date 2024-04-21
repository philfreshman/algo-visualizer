"use client"

import bfs from "@/lib/algorithms/bfs"
import dfs from "@/lib/algorithms/dfs"
import { clearVisited, markStartAsVisited } from "@/lib/utils/reset"
import { session } from "@/lib/utils/session"
import { useContext, useEffect, useState } from "react"
import { AlgorithmContext } from "./context"

export function useCore() {
  // config
  const cols = 40
  const rows = 30
  const init = () =>
    Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0))

  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")

  const { pathfindingAlgorithm, isRunning, startTrigger, setCompleted, setCreateMazeTrigger } = algorithmContext
  const [start, setStart] = useState<Position>({ col: 8, row: 8 })
  const [end, setEnd] = useState<Position>({ col: 32, row: 22 })
  const [matrix, setMatrix] = useState<Matrix>(init())

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

  const createMaze = () => {
    generateMaze(matrix, 0, 0, cols, rows)
    setCreateMazeTrigger(false)
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

  const clearMatrix = () => {
    setMatrix((prevMatrix: Matrix) => {
      return prevMatrix.map((row) => row.map(() => 0))
    })
  }

  const resetBoard = async () => {
    session.setItem("shouldTerminate", "true")
    session.setItem("isRunning", "false")
    clearVisited()
  }

  useEffect(() => {
    if (isRunning) run().then()
  }, [startTrigger])

  // useEffect(() => {
  //   if (createMazeTrigger) {
  //     createMaze()
  //   }
  // }, [createMazeTrigger])

  return { cols, rows, matrix, start, end, toggleBox, resetBoard, setStart, setEnd, createMaze }
}
