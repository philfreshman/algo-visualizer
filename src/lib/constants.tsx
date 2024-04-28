export const cols = 40
export const rows = 30

export enum SearchAlgorithms {
  DFS = "Depth first search",
  BFS = "Breath first search",
}

export type SearchKey = keyof typeof SearchAlgorithms

export enum MazeAlgorithms {
  CUSTOM = "Custom",
  STAR = "Star",
  SPICED = "Spiced",
  RECURSIVE_DIVISION = "Recursive Division",
}

export type MazeKey = keyof typeof MazeAlgorithms
