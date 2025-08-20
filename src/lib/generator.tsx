import { useCallback, useContext, useEffect } from 'react'
import { cols, rows } from '@/lib/constants'
import { AlgorithmContext } from '@/lib/coreContext'
import fresh from '@/lib/generators/fresh'
import labyrinth from '@/lib/generators/labyrinth'
import { session } from '@/lib/helpers/storage'
import { ui } from '@/lib/helpers/ui'

export function useGenerator() {
    const algorithmContext = useContext(AlgorithmContext)
    if (!algorithmContext) throw new Error('AlgorithmContext is missing')

    const { setMatrix, clearMatrixWalls, setIsRunning, mazeGenerationAlgorithm, setIsCompleted } = algorithmContext

    const generate = useCallback(() => {
        let newMatrix: Matrix
        switch (mazeGenerationAlgorithm) {
            case 'CUSTOM':
                return
            case 'LABYRINTH':
                newMatrix = labyrinth()
                break
            case 'FRESH':
                newMatrix = fresh()
                break
            default:
                console.log('run => algorithm not found!')
                return
        }

        setMatrix(newMatrix)

        // Use requestAnimationFrame to batch DOM updates
        requestAnimationFrame(() => {
            // Build a list of elements to update
            const elementsToToggle: Element[] = []

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (newMatrix[row][col] === 1) {
                        const element = document.querySelector(`#B${row}\\:${col}`)
                        if (element) {
                            elementsToToggle.push(element)
                        }
                    }
                }
            }

            // Apply all class changes at once
            elementsToToggle.forEach((el) => el.classList.add('toggled'))
        })
    }, [mazeGenerationAlgorithm, setMatrix])

    const prepare = useCallback(async () => {
        ui.clearVisitedAndWalls()
        clearMatrixWalls()
        setIsCompleted(true)
        setIsRunning(false)
        session.setItem('mazeGenerationAlgorithm', mazeGenerationAlgorithm)
    }, [clearMatrixWalls, setIsCompleted, setIsRunning, mazeGenerationAlgorithm])

    // biome-ignore lint/correctness/useExhaustiveDependencies: Full dependency list causes a maze generation loop
    useEffect(() => {
        prepare().then()
        generate()
    }, [mazeGenerationAlgorithm])
}
