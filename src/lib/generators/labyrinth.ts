export default function labyrinth(width: number = 41, height: number = 31): Matrix {
    // Ensure odd dimensions for proper maze structure
    const actualWidth = width % 2 === 0 ? width + 1 : width
    const actualHeight = height % 2 === 0 ? height + 1 : height

    // Initialize matrix with all walls (1s)
    const matrix: Matrix = Array.from({ length: actualHeight }, () => Array.from({ length: actualWidth }, () => 1))

    function isValid(y: number, x: number): boolean {
        return y >= 0 && y < actualHeight && x >= 0 && x < actualWidth
    }

    function isInBounds(y: number, x: number): boolean {
        return y > 0 && y < actualHeight - 1 && x > 0 && x < actualWidth - 1
    }

    function carve(y: number, x: number): void {
        matrix[y][x] = 0 // Mark current cell as path

        // Define directions: right, down, left, up (moving by 2 to skip walls)
        const directions: [number, number][] = [
            [0, 2],
            [2, 0],
            [0, -2],
            [-2, 0],
        ]

        // Shuffle directions for randomness
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[directions[i], directions[j]] = [directions[j], directions[i]]
        }

        for (const [dy, dx] of directions) {
            const newY = y + dy
            const newX = x + dx

            // Check if new position is valid and unvisited
            if (isValid(newY, newX) && isInBounds(newY, newX) && matrix[newY][newX] === 1) {
                // Carve the wall between current and new cell
                matrix[y + dy / 2][x + dx / 2] = 0
                // Recursively carve from new cell
                carve(newY, newX)
            }
        }
    }

    // Start carving from position (1, 1) - ensures we start on an odd coordinate
    carve(1, 1)

    // Ensure all borders are walls (this should already be the case, but double-check)
    for (let i = 0; i < actualHeight; i++) {
        matrix[i][0] = 1
        matrix[i][actualWidth - 1] = 1
    }
    for (let i = 0; i < actualWidth; i++) {
        matrix[0][i] = 1
        matrix[actualHeight - 1][i] = 1
    }

    // Add entrance and exit
    matrix[1][0] = 0 // Entrance at top-left area
    matrix[actualHeight - 2][actualWidth - 1] = 0 // Exit at bottom-right area

    return matrix
}

// Helper function to visualize the maze
export function visualizeMaze(matrix: Matrix): string {
    return matrix.map((row) => row.map((cell) => (cell === 1 ? '█' : ' ')).join('')).join('\n')
}

// Helper function to validate maze connectivity
export function validateMaze(matrix: Matrix): boolean {
    const height = matrix.length
    const width = matrix[0].length
    const visited = Array.from({ length: height }, () => Array(width).fill(false))

    // Find entrance (should be at [1][0])
    let startY = 1,
        startX = 0
    if (matrix[startY][startX] === 1) {
        // If standard entrance is blocked, find first open cell
        outer: for (let y = 1; y < height - 1; y += 2) {
            for (let x = 1; x < width - 1; x += 2) {
                if (matrix[y][x] === 0) {
                    startY = y
                    startX = x
                    break outer
                }
            }
        }
    }

    // BFS to check connectivity
    const queue: [number, number][] = [[startY, startX]]
    visited[startY][startX] = true
    let reachableCells = 1

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ]

    while (queue.length > 0) {
        const [y, x] = queue.shift()!

        for (const [dy, dx] of directions) {
            const newY = y + dy
            const newX = x + dx

            if (newY >= 0 && newY < height && newX >= 0 && newX < width && !visited[newY][newX] && matrix[newY][newX] === 0) {
                visited[newY][newX] = true
                queue.push([newY, newX])
                reachableCells++
            }
        }
    }

    // Count total open cells
    const totalOpenCells = matrix.flat().filter((cell) => cell === 0).length

    // Maze is valid if all open cells are reachable
    return reachableCells === totalOpenCells
}
