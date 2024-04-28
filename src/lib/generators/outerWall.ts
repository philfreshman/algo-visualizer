const outerWall = (matrix: Matrix): Matrix => {
  const height = matrix.length
  const width = matrix[0].length

  // Draw top wall from left to right
  for (let i = 0; i < width; i++) {
    matrix[0][i] = 1
    document.querySelector(`#B0\\:${i}`)!.classList.toggle("toggled")
  }

  // Draw right wall from top to bottom
  for (let i = 1; i < height; i++) {
    matrix[i][width - 1] = 1
    document.querySelector(`#B${i}\\:${width - 1}`)!.classList.toggle("toggled")
  }

  // Draw bottom wall from right to left
  for (let i = width - 2; i >= 0; i--) {
    matrix[height - 1][i] = 1
    document.querySelector(`#B${height - 1}\\:${i}`)!.classList.toggle("toggled")
  }

  // Draw left wall from bottom to top
  for (let i = height - 2; i > 0; i--) {
    matrix[i][0] = 1
    document.querySelector(`#B${i}\\:0`)!.classList.toggle("toggled")
  }

  return matrix
}

export default outerWall
