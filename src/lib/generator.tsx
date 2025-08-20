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

    const { matrix, setMatrix, clearMatrixWalls, setIsRunning, mazeGenerationAlgorithm, setIsCompleted } = algorithmContext

    const generate = useCallback(() => {
        switch (mazeGenerationAlgorithm) {
            case 'CUSTOM':
                break
            case 'LABYRINTH':
                setMatrix(labyrinth())
                break
            case 'FRESH':
                setMatrix(fresh())
                break
            default:
                console.log('run => algorithm not found!')
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (matrix[row][col] === 1) {
                    document.querySelector(`#B${row}\\:${col}`)?.classList.add('toggled')
                }
            }
        }
    }, [mazeGenerationAlgorithm, matrix, setMatrix])

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
