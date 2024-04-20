"use client"

import bfs from "@/lib/algorithms/bfs"
import dfs from "@/lib/algorithms/dfs"
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

  const { pathfindingAlgorithm, isRunning, startTrigger, setCompleted } = algorithmContext
  const [matrix, setMatrix] = useState<Matrix>(init())

  // handlers
  const run = async () => {
    let visited: Position[] = []
    await clearVisited()
    switch (pathfindingAlgorithm) {
      case "DFS":
        await dfs(matrix, visited, { col: 0, row: 0 }, { col: 28, row: 28 }).then()
        break
      case "BFS":
        await bfs(matrix, { col: 0, row: 0 }, { col: 28, row: 28 }).then()
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

  const clearVisited = async (): Promise<void> => {
    const clear = (col: number, row: number) => {
      document.querySelector(`#B${col}\\:${row}`)?.classList.remove("visited")
    }

    const promises = []
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        promises.push(clear(i, j))
      }
    }

    await Promise.all(promises)
  }

  const clearMatrix = () => {
    setMatrix((prevMatrix: Matrix) => {
      return prevMatrix.map((row) => row.map(() => 0))
    })
  }

  const clearToggled = () => {
    const clear = async (col: number, row: number) => {
      document.querySelector(`#B${col}\\:${row}`)?.classList.remove("toggled")
    }
    matrix.map((row, i) => {
      row.map((col, j) => {
        clear(i, j).then()
      })
    })
  }

  const resetBoard = async () => {
    session.setItem("shouldTerminate", "true")
    session.setItem("isRunning", "false")
    await clearVisited()
    console.log(matrix)
  }

  useEffect(() => {
    if (isRunning) run().then()
  }, [startTrigger])

  return { cols, rows, matrix, toggleBox, clearToggled, resetBoard }
}
