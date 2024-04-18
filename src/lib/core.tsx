"use client"

import bfs from "@/lib/algorithms/bfs"
import dfs from "@/lib/algorithms/dfs"
import { useContext, useEffect, useState } from "react"
import { AlgorithmContext } from "./context"

export function useCore() {
  // config
  const cols = 40
  const rows = 30
  const speed = 10 //ms
  const init = () => {
    return Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0))
  }

  const algorithmContext = useContext(AlgorithmContext)
  if (!algorithmContext) throw new Error("AlgorithmContext is missing")

  const { pathfindingAlgorithm, isRunning, stopAlgorithm } = algorithmContext
  const [matrix, setMatrix] = useState<Matrix>(init())

  // handlers
  const run = () => {
    let visited: Position[] = []

    switch (pathfindingAlgorithm) {
      case "DFS":
        dfs(matrix, visited, { col: 0, row: 0 }, { col: 28, row: 28 }, speed).then()
        break
      case "BFS":
        bfs(matrix, { col: 0, row: 0 }, { col: 28, row: 28 }, speed).then()
        break
      default:
        console.log("run => algorithm not found!")
    }
  }

  const toggleBox = (i: number, j: number) => {
    let box = document.querySelector(`#B${i}\\:${j}`)
    if (box && !box.classList.contains("wall")) {
      box!.classList.toggle("checked")
    }
    setMatrix((prevMatrix: Matrix) => {
      const newMatrix = prevMatrix.map((row) => [...row])
      newMatrix[i][j] = newMatrix[i][j] === 0 ? 1 : 0
      return newMatrix
    })
  }

  const clearBox = async (col: number, row: number) => {
    document.querySelector(`#B${col}\\:${row}`)?.classList.remove("visited")
  }
  const clearBoard = () => {
    setMatrix((prevMatrix: Matrix) => {
      return prevMatrix.map((row, i) =>
        row.map((col, j) => {
          clearBox(i, j).then()
          return 0
        }),
      )
    })
  }

  useEffect(() => {
    if (isRunning) {
      run()
      stopAlgorithm()
    }
  }, [isRunning])

  return { cols, rows, matrix, toggleBox, clearBoard }
}
