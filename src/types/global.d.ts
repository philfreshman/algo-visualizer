// global.d.ts

declare global {
  type AlgorithmType = "DFS" | "BFS"

  type Matrix = number[][]

  type Position = {
    row: number // y
    col: number // x
  }
}

export {}
