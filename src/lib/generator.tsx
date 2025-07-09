import { useContext, useEffect } from 'react'
import { cols, rows } from '@/lib/constants'
import { AlgorithmContext } from '@/lib/coreContext'
import labyrinth from '@/lib/generators/labyrinth'
import spiced from '@/lib/generators/spiced'
import { session } from '@/lib/helpers/storage'
import { ui } from '@/lib/helpers/ui'

export function useGenerator() {
    const algorithmContext = useContext(AlgorithmContext)
    if (!algorithmContext) throw new Error('AlgorithmContext is missing')

    const { matrix, setMatrix, clearMatrixWalls, setIsRunning, mazeGenerationAlgorithm, setIsCompleted } = algorithmContext

    const generate = () => {
        switch (mazeGenerationAlgorithm) {
            case 'CUSTOM':
                break
            case 'LABYRINTH':
                setMatrix(labyrinth())
                break
            case 'SPICED':
                setMatrix(spiced())
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
    }

    const prepare = async () => {
        ui.clearVisitedAndWalls()
        clearMatrixWalls()
        setIsCompleted(true)
        setIsRunning(false)
        session.setItem('mazeGenerationAlgorithm', mazeGenerationAlgorithm)
    }

    useEffect(() => {
        prepare().then()
        generate()
    }, [mazeGenerationAlgorithm])
}
