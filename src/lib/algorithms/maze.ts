function generateMaze(matrix: Matrix, x: number, y: number, width: number, height: number) {
  // Base case: if the section is too small, return
  if (width < 3 || height < 3) return

  // Choose a random point for the wall
  let horizontal = width < height
  let wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)) + 1)
  let wy = y + (horizontal ? Math.floor(Math.random() * (height - 2)) + 1 : 0)
  let px = wx + (horizontal ? Math.floor(Math.random() * width) : 0)
  let py = wy + (horizontal ? 0 : Math.floor(Math.random() * height))

  // Add the wall to the maze
  for (let i = 0; i < (horizontal ? width : height); i++) {
    if (horizontal) {
      if (matrix[wy][x + i] !== 1) matrix[wy][x + i] = 1
    } else {
      if (matrix[y + i][wx] !== 1) matrix[y + i][wx] = 1
    }
  }

  // Remove the passage from the wall
  if (horizontal) {
    matrix[wy][px] = 0
  } else {
    matrix[py][wx] = 0
  }

  // Recursively generate walls in the new sections
  let nx = horizontal ? x : wx + 1
  let ny = horizontal ? wy + 1 : y
  let w = horizontal ? width : wx - x + 1
  let h = horizontal ? wy - y + 1 : height
  generateMaze(matrix, nx, ny, w, h)

  nx = horizontal ? x : x
  ny = horizontal ? y : wy + 1
  w = horizontal ? width : wx - x + 1
  h = horizontal ? wy - y + 1 : height
  generateMaze(matrix, nx, ny, w, h)
}
