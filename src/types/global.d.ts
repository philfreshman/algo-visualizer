// global.d.ts

declare global {
  type AlgorithmTypes = {
    [key: string]: string
  }

  type Matrix = number[][]

  type Position = {
    row: number // y
    col: number // x
  }
}

export {}
