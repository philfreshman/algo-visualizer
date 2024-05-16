import { PriorityQueue } from "@/lib/helpers/priorityQueue"

export async function aStar(matrix: number[][], start: Position, end: Position) {
  const fScore = new Map<string, number>()
  const gScore = new Map<string, number>()
  const cameFrom = new Map<string, Position>()

  const startKey = `${start.row}:${start.col}`
  const endKey = `${end.row}:${end.col}`

  gScore.set(startKey, 0)
  fScore.set(startKey, heuristic(start, end))

  //@ts-ignore
  const openSet = new PriorityQueue<Position>((a, b) => (fScore.get(`${a.row}:${a.col}`) ?? Infinity) - (fScore.get(`${b.row}:${b.col}`) ?? Infinity))
  openSet.push(start, fScore.get(startKey)!)

  while (!openSet.isEmpty()) {
    const current = openSet.pop()!

    const currentKey = `${current.row}:${current.col}`

    if (currentKey === endKey) {
      return reconstructPath(cameFrom, current)
    }

    for (const neighbor of getNeighbors(current, matrix)) {
      const neighborKey = `${neighbor.row}:${neighbor.col}`

      const tentativeGScore = (gScore.get(currentKey) ?? Infinity) + 1

      if (tentativeGScore < (gScore.get(neighborKey) ?? Infinity)) {
        cameFrom.set(neighborKey, current)
        gScore.set(neighborKey, tentativeGScore)
        fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, end))
        if (!openSet.has(neighbor)) {
          openSet.push(neighbor, fScore.get(neighborKey)!)
        }
      }
    }
  }

  return null
}

function heuristic(a: Position, b: Position) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

function getNeighbors(pos: Position, matrix: number[][]) {
  const neighbors = []

  if (pos.row > 0) neighbors.push({ row: pos.row - 1, col: pos.col })
  if (pos.row < matrix.length - 1) neighbors.push({ row: pos.row + 1, col: pos.col })
  if (pos.col > 0) neighbors.push({ row: pos.row, col: pos.col - 1 })
  if (pos.col < matrix[0].length - 1) neighbors.push({ row: pos.row, col: pos.col + 1 })

  return neighbors.filter((neighbor) => matrix[neighbor.row][neighbor.col] !== 1)
}

function reconstructPath(cameFrom: Map<string, Position>, current: Position) {
  const totalPath = [current]

  while (cameFrom.has(`${current.row}:${current.col}`)) {
    current = cameFrom.get(`${current.row}:${current.col}`)!
    totalPath.unshift(current)
  }

  return totalPath
}
