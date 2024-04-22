// DEPTH FIRST SEARCH
// Helper function that returns a Promise that resolves after `ms` milliseconds
import { delay, shouldTerminate } from "@/lib/utils/helpers"
import { local } from "@/lib/utils/local"
import { markEndAsVisited } from "@/lib/utils/reset"
import { session } from "@/lib/utils/session"

const dfs = async (matrix: Matrix, visited: Position[], current: Position, target: Position): Promise<Position[] | null> => {

  if (shouldTerminate()) {
    return null;
  }

  // walls
  if (current.row < 0 || current.row === matrix.length || current.col < 0 || current.col === matrix[0].length) {
    return null
  }

  // custom wall
  if (matrix[current.row][current.col] === 1 || document.querySelector(`#B${current.row}\\:${current.col}`)?.classList.contains("toggled")) {
    return null
  }

  // target found
  if (current.row === target.row && current.col === target.col) {
    visited.push(current)
    session.setItem("isCompleted", "true")
    markEndAsVisited()
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
  if (box && !box.classList.contains("toggled")) {
    box!.classList.toggle("visited")
  }

  // mark the matrix cell as visited
  // matrix[current.row][current.col] = 1

  // speed
  await delay(Number(local.getItem("delay")))

  // pause / resume
  let isRunning = session.getItem("isRunning") === "false"
  let terminate = shouldTerminate()
  if (isRunning || terminate) {
    while (isRunning && !terminate) {
      await delay(100)
      isRunning = session.getItem("isRunning") === "false"
      terminate = shouldTerminate()
    }
    if (terminate) {
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
