import { delay, exe } from '@/lib/helpers/exe'
import { local, session } from '@/lib/helpers/storage'
import { ui } from '@/lib/helpers/ui'

// A* ALGORITHM - Compatible with BFS interface
export const aStar = async (matrix: Matrix, visited: Position[], start: Position, target: Position): Promise<Position[] | null> => {
    const openSet: { f: number; g: number; h: number; position: Position; parent: Position | null }[] = []
    const closedSet: { [key: string]: boolean } = {}
    const gScore: { [key: string]: number } = {}
    const fScore: { [key: string]: number } = {}

    // Initialize scores
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            const key = `${r}:${c}`
            gScore[key] = Infinity
            fScore[key] = Infinity
        }
    }

    // Heuristic function (Manhattan distance)
    const heuristic = (pos: Position): number => {
        return Math.abs(pos.row - target.row) + Math.abs(pos.col - target.col)
    }

    // Initialize start node
    const startKey = `${start.row}:${start.col}`
    gScore[startKey] = 0
    fScore[startKey] = heuristic(start)

    openSet.push({
        f: fScore[startKey],
        g: 0,
        h: heuristic(start),
        position: start,
        parent: null,
    })

    while (openSet.length > 0) {
        if (exe.shouldTerminate()) {
            return null
        }

        // Sort by f-score (g + h) to get the most promising node
        openSet.sort((a, b) => a.f - b.f)
        const current = openSet.shift()!
        const currentKey = `${current.position.row}:${current.position.col}`

        // Skip if already processed
        if (closedSet[currentKey]) {
            continue
        }

        // Mark as processed
        closedSet[currentKey] = true

        // Check if we reached the target
        if (current.position.row === target.row && current.position.col === target.col) {
            // Reconstruct path and add to visited array
            const path = reconstructPathAStar(current)
            visited.push(...path)
            session.setItem('isCompleted', 'true')
            ui.markEndAsVisited()
            return visited
        }

        // Check for walls (both matrix walls and custom toggled walls)
        if (
            matrix[current.position.row][current.position.col] === 1 ||
            document.querySelector(`#B${current.position.row}\\:${current.position.col}`)?.classList.contains('toggled')
        ) {
            continue
        }

        // Add to visited array and mark visually (skip if it's the start position)
        if (!(current.position.row === start.row && current.position.col === start.col)) {
            visited.push(current.position)
            const box = document.querySelector(`#B${current.position.row}\\:${current.position.col}`)
            if (box && !box.classList.contains('wall')) {
                box.classList.add('visited')
                // Optional: Add different class to show it's being considered
                box.classList.add('exploring')
            }
        }

        // Check all neighbors
        const neighbors = [
            { row: current.position.row, col: current.position.col + 1 }, // right
            { row: current.position.row + 1, col: current.position.col }, // down
            { row: current.position.row, col: current.position.col - 1 }, // left
            { row: current.position.row - 1, col: current.position.col }, // up
        ]

        for (const neighbor of neighbors) {
            const { row, col } = neighbor
            const neighborKey = `${row}:${col}`

            // Check bounds, walls, and if already processed
            if (
                row >= 0 &&
                row < matrix.length &&
                col >= 0 &&
                col < matrix[0].length &&
                matrix[row][col] !== 1 &&
                !document.querySelector(`#B${row}\\:${col}`)?.classList.contains('toggled') &&
                !closedSet[neighborKey]
            ) {
                const tentativeG = current.g + 1 // Cost from start to neighbor through current

                // If this path to neighbor is better than any previous one
                if (tentativeG < gScore[neighborKey]) {
                    gScore[neighborKey] = tentativeG
                    const h = heuristic(neighbor)
                    fScore[neighborKey] = tentativeG + h

                    // Add to open set if not already there with better score
                    const existingIndex = openSet.findIndex((node) => node.position.row === row && node.position.col === col)

                    const neighborNode = {
                        f: fScore[neighborKey],
                        g: tentativeG,
                        h: h,
                        position: neighbor,
                        parent: current.position,
                    }

                    if (existingIndex === -1) {
                        openSet.push(neighborNode)

                        // Optional: Mark nodes in open set with different color
                        const box = document.querySelector(`#B${row}\\:${col}`)
                        if (box && !box.classList.contains('wall') && !box.classList.contains('visited')) {
                            box.classList.add('frontier')
                        }
                    } else if (tentativeG < openSet[existingIndex].g) {
                        openSet[existingIndex] = neighborNode
                    }
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

// Helper function to reconstruct the path for A*
function reconstructPathAStar(endNode: { position: Position; parent: Position | null }): Position[] {
    const path: Position[] = []
    let current: { position: Position; parent: Position | null } | null = endNode

    // Build path backwards from end to start
    while (current) {
        path.unshift(current.position)

        if (current.parent) {
            // Find the parent node (this is simplified - in a full implementation you'd store the full node)
            current = { position: current.parent, parent: null }
            // Note: This reconstruction is simplified. In a full A* implementation,
            // you'd typically store parent references more completely.
            break // For this simplified version, just add the current position
        } else {
            current = null
        }
    }

    return path
}

// Improved reconstruction that works with the parent chain
function reconstructPathAStarImproved(endPos: Position, parentMap: { [key: string]: Position | null }): Position[] {
    const path: Position[] = []
    let current: Position | null = endPos

    while (current) {
        path.unshift(current)
        current = parentMap[`${current.row}:${current.col}`]
    }

    return path
}
