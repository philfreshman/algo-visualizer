// DEPTH FIRST SEARCH
// Helper function that returns a Promise that resolves after `ms` milliseconds
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const dfs = async (matrix: Matrix, visited: Position[], current: Position, target: Position, speed: number): Promise<Position[] | null> => {
  // walls
  if (current.row < 0 || current.row === matrix.length || current.col < 0 || current.col === matrix[0].length) {
    return null
  }

  if (matrix[current.row][current.col] === 1) {
    return null
  }

  // target
  if (current.row === target.row && current.col === target.col) {
    visited.push({ row: current.row, col: current.col })
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
  matrix[current.row][current.col] = 1

  // explore neighbors
  let res: Position[] | null
  await delay(speed)
  res = await dfs(matrix, visited, { row: current.row, col: current.col + 1 }, target, speed) // left
  if (res !== null) {
    return res
  }

  res = await dfs(matrix, visited, { row: current.row + 1, col: current.col }, target, speed) // down
  if (res !== null) {
    return res
  }

  res = await dfs(matrix, visited, { row: current.row, col: current.col - 1 }, target, speed) // right
  if (res !== null) {
    return res
  }

  res = await dfs(matrix, visited, { row: current.row - 1, col: current.col }, target, speed) // up
  if (res !== null) {
    return res
  }

  return null
}

export default dfs
