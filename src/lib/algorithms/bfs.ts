import { delay } from "@/lib/utils/helpers"
import { local } from "@/lib/utils/local"
import { session } from "@/lib/utils/session"

const bfs = async (matrix: Matrix, visited: Position[], start: Position, target: Position): Promise<Position[] | null> => {
  const queue: Position[] = [start]

  while (queue.length > 0) {
    const current = queue.shift()! // Get the first node in the queue

    // Check if the current node is the target
    if (current.row === target.row && current.col === target.col) {
      visited.push(current)
      return visited
    }

    // Check if the current node is already visited
    if (visited.some((v) => v.row === current.row && v.col === current.col)) {
      continue
    }

    // Mark the current node as visited
    visited.push(current)
    let box = document.querySelector(`#B${current.row}\\:${current.col}`)
    if (box && !box.classList.contains("wall")) {
      box.classList.toggle("visited")
    }

    // Add unvisited neighbors to the queue
    const neighbors = [
      { row: current.row, col: current.col + 1 }, // right
      { row: current.row + 1, col: current.col }, // down
      { row: current.row, col: current.col - 1 }, // left
      { row: current.row - 1, col: current.col }, // up
    ]

    for (const neighbor of neighbors) {
      if (neighbor.row >= 0 && neighbor.row < matrix.length && neighbor.col >= 0 && neighbor.col < matrix[0].length && matrix[neighbor.row][neighbor.col] !== 1) {
        queue.push(neighbor)
      }
    }

    // pause / resume
    let isRunning = session.getItem("isRunning") === "false"
    if (isRunning) {
      while (isRunning) {
        await delay(100)
        isRunning = session.getItem("isRunning") === "false"
      }
    }

    await delay(Number(local.getItem("delay")))
  }

  return null
}

export default bfs
