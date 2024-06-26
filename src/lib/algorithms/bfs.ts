import { delay, exe } from "@/lib/helpers/exe"
import { local, session } from "@/lib/helpers/storage"
import { ui } from "@/lib/helpers/ui"

// BREATH FIRST SEARCH
export const bfs = async (matrix: Matrix, visited: Position[], start: Position, target: Position): Promise<Position[] | null> => {
  const queue: Position[] = [start]

  while (queue.length > 0) {
    if (exe.shouldTerminate()) {
      return null
    }
    const current = queue.shift()! // Get the first node in the queue

    // Check if the current node is the target
    if (current.row === target.row && current.col === target.col) {
      session.setItem("isCompleted", "true")
      visited.push(current)
      ui.markEndAsVisited()
      return visited
    }

    // Check if the current node is already visited
    if (visited.some((v) => v.row === current.row && v.col === current.col)) {
      continue
    }

    // custom wall
    if (matrix[current.row][current.col] === 1 || document.querySelector(`#B${current.row}\\:${current.col}`)?.classList.contains("toggled")) {
      continue
    }

    // Mark the current node as visited
    visited.push(current)
    const box = document.querySelector(`#B${current.row}\\:${current.col}`)
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
      if (
        neighbor.row >= 0 &&
        neighbor.row < matrix.length &&
        neighbor.col >= 0 &&
        neighbor.col < matrix[0].length &&
        matrix[neighbor.row][neighbor.col] !== 1
      ) {
        queue.push(neighbor)
      }
    }

    // pause / resume / terminate
    if ((await exe.pauseResumeOrTerminate()) === null) {
      return null // terminate the algorithm
    }

    await delay(Number(local.getItem("delay")))
  }

  return null
}
