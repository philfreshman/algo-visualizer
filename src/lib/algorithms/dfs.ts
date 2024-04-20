// DEPTH FIRST SEARCH
// Helper function that returns a Promise that resolves after `ms` milliseconds
import { local } from "@/lib/utils/local"
import { session } from "@/lib/utils/session"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const dfs = async (matrix: Matrix, visited: Position[], current: Position, target: Position): Promise<Position[] | null> => {
  if (session.getItem("shouldTerminate") === "true") {
    return null // terminate the algorithm
  }

  // walls
  if (current.row < 0 || current.row === matrix.length || current.col < 0 || current.col === matrix[0].length) {
    return null
  }

  // custom wall
  if (matrix[current.row][current.col] === 1) {
    return null
  }

  // target found
  if (current.row === target.row && current.col === target.col) {
    visited.push({ row: current.row, col: current.col })
    session.setItem("isCompleted", "true")
    return visited
  }

  // check if current position is already visited
  for (let v of visited) {
    if (v.row === current.row && v.col === current.col) {
      return null
    }
  }

  // mark current position as visited
  visited.push({ row: current.row, col: current.col })
  let box = document.querySelector(`#B${current.row}\\:${current.col}`)
  if (box && !box.classList.contains("wall")) {
    box!.classList.toggle("visited")
  }

  // mark the matrix cell as visited
  // matrix[current.row][current.col] = 1

  // speed
  await delay(Number(local.getItem("delay")))

  // pause / resume
  let isRunning = session.getItem("isRunning") === "false"
  let shouldTerminate = session.getItem("shouldTerminate") === "true"
  if (isRunning || shouldTerminate) {
    while (isRunning && !shouldTerminate) {
      await delay(100)
      isRunning = session.getItem("isRunning") === "false"
      shouldTerminate = session.getItem("shouldTerminate") === "true"
    }
    if (shouldTerminate) {
      return null // terminate the algorithm
    }
  }

  // explore neighbors
  let res: Position[] | null
  res = await dfs(matrix, visited, { row: current.row, col: current.col + 1 }, target) // left
  if (res !== null) {
    return res
  }

  res = await dfs(matrix, visited, { row: current.row + 1, col: current.col }, target) // down
  if (res !== null) {
    return res
  }

  res = await dfs(matrix, visited, { row: current.row, col: current.col - 1 }, target) // right
  if (res !== null) {
    return res
  }

  res = await dfs(matrix, visited, { row: current.row - 1, col: current.col }, target) // up
  if (res !== null) {
    return res
  }

  return null
}

export default dfs
