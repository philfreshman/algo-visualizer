declare global {
  type Matrix = number[][]

  type Position = {
    row: number // y
    col: number // x
  }

  type AlgoType = {
    [key: string]: string
  }
}

export {}
