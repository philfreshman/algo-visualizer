import { delay, exe } from '@/lib/helpers/exe'
import { local, session } from '@/lib/helpers/storage'
import { ui } from '@/lib/helpers/ui'

// DIJKSTRA'S ALGORITHM - Compatible with BFS interface
export const dijkstra = async (matrix: Matrix, visited: Position[], start: Position, target: Position): Promise<Position[] | null> => {
    const distances: { [key: string]: number } = {}
    const prevNodes: { [key: string]: Position | null } = {}
    const visitedNodes: { [key: string]: boolean } = {}
    const pq: { distance: number; position: Position }[] = []

    // Initialize distances and previous nodes
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            const key = `${r}:${c}`
            distances[key] = Infinity
            prevNodes[key] = null
        }
    }

    distances[`${start.row}:${start.col}`] = 0
    pq.push({ distance: 0, position: start })

    while (pq.length > 0) {
        if (exe.shouldTerminate()) {
            return null
        }

        // Sort priority queue to get minimum distance (simple implementation)
        pq.sort((a, b) => a.distance - b.distance)
        const { position: current } = pq.shift()!
        const currentKey = `${current.row}:${current.col}`

        // Skip if already visited
        if (visitedNodes[currentKey]) {
            continue
        }

        // Mark as visited
        visitedNodes[currentKey] = true

        // Check if we reached the target
        if (current.row === target.row && current.col === target.col) {
            // Reconstruct path and add to visited array
            const path = reconstructPath(prevNodes, start, target)
            visited.push(...path)
            session.setItem('isCompleted', 'true')
            ui.markEndAsVisited()
            return visited
        }

        // Check for walls (both matrix walls and custom toggled walls)
        if (matrix[current.row][current.col] === 1 || document.querySelector(`#B${current.row}\\:${current.col}`)?.classList.contains('toggled')) {
            continue
        }

        // Add to visited array and mark visually (skip if it's the start position)
        if (!(current.row === start.row && current.col === start.col)) {
            visited.push(current)
            const box = document.querySelector(`#B${current.row}\\:${current.col}`)
            if (box && !box.classList.contains('wall')) {
                box.classList.toggle('visited')
            }
        }

        // Check all neighbors
        const neighbors = [
            { row: current.row, col: current.col + 1 }, // right
            { row: current.row + 1, col: current.col }, // down
            { row: current.row, col: current.col - 1 }, // left
            { row: current.row - 1, col: current.col }, // up
        ]

        for (const neighbor of neighbors) {
            const { row, col } = neighbor

            // Check bounds and walls
            if (
                row >= 0 &&
                row < matrix.length &&
                col >= 0 &&
                col < matrix[0].length &&
                matrix[row][col] !== 1 &&
                !document.querySelector(`#B${row}\\:${col}`)?.classList.contains('toggled')
            ) {
                const neighborKey = `${row}:${col}`
                const newDist = distances[currentKey] + 1 // Assuming uniform cost of 1

                // If we found a shorter path to this neighbor
                if (newDist < distances[neighborKey]) {
                    distances[neighborKey] = newDist
                    prevNodes[neighborKey] = current
                    pq.push({ distance: newDist, position: neighbor })
                }
            }
        }

        // Handle pause/resume/terminate
        if ((await exe.pauseResumeOrTerminate()) === null) {
            return null // terminate the algorithm
        }
        await delay(Number(local.getItem('delay')))
    }

    return null // No path found
}

// Helper function to reconstruct the path from start to target
function reconstructPath(prevNodes: { [key: string]: Position | null }, start: Position, target: Position): Position[] {
    const path: Position[] = []
    let current: Position | null = target

    while (current && !(current.row === start.row && current.col === start.col)) {
        path.unshift(current)
        current = prevNodes[`${current.row}:${current.col}`]
    }

    // Add start position if path exists
    if (current) {
        path.unshift(start)
    }

    return path
}
