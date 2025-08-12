'use client'

import { useContext, useEffect, useState } from 'react'
import { aStar } from '@/lib/algorithms/a-star'
import { bfs } from '@/lib/algorithms/bfs'
import { dfs } from '@/lib/algorithms/dfs'
import { local, session } from '@/lib/helpers/storage'
import { ui } from '@/lib/helpers/ui'
import { AlgorithmContext } from './coreContext'

export function useRunner() {
    const startPos: Position = { col: 0, row: 1 } // Alien
    const endPos: Position = { col: 40, row: 29 } // Diamond

    const algorithmContext = useContext(AlgorithmContext)
    if (!algorithmContext) throw new Error('AlgorithmContext is missing')

    const { pathfindingAlgorithm, isRunning, startTrigger, setCompleted, matrix, setMatrix } = algorithmContext
    const [start, setStart] = useState<Position>(startPos)
    const [end, setEnd] = useState<Position>(endPos)

    // handlers
    const run = async () => {
        const visited: Position[] = []
        ui.clearVisited()

        switch (pathfindingAlgorithm) {
            case 'DFS':
                ui.markStartAsVisited()
                await dfs(matrix, visited, start, end)
                break
            case 'BFS':
                ui.markStartAsVisited()
                await bfs(matrix, visited, start, end)
                break
            case 'ASTAR':
                ui.markStartAsVisited()
                await aStar(matrix, visited, start, end)
                break

            default:
                console.log('run => algorithm not found!')
        }
        setCompleted()
    }

    const toggleBox = (i: number, j: number) => {
        const box = document.querySelector(`#B${i}\\:${j}`)
        if (box && !box.classList.contains('wall')) {
            box!.classList.toggle('toggled')
        }
        setMatrix((prevMatrix: Matrix) => {
            const newMatrix = prevMatrix.map((row) => [...row])
            newMatrix[i][j] = newMatrix[i][j] === 0 ? 1 : 0

            console.log(newMatrix)
            local.setItem('matrix', JSON.stringify(newMatrix))
            return newMatrix
        })
    }

    const resetBoard = async () => {
        session.setItem('shouldTerminate', 'true')
        session.setItem('isRunning', 'false')
        ui.clearVisited()
    }

    useEffect(() => {
        if (isRunning) run().then()
    }, [startTrigger])

    return { matrix, start, end, toggleBox, resetBoard, setStart, setEnd }
}
