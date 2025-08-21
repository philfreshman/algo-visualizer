import { PauseIcon, PlayIcon } from '@radix-ui/react-icons'
import { useContext, useEffect } from 'react'
import { Button } from '@/components/atoms/button'
import { AlgorithmContext } from '@/lib/coreContext'
import { keyPress } from '@/lib/helpers/keyPress'
import { session } from '@/lib/helpers/storage'
import { ui } from '@/lib/helpers/ui'

export default function RunMenu() {
    const algorithmContext = useContext(AlgorithmContext)

    if (!algorithmContext) throw new Error('AlgorithmContext is missing')
    const { startAlgorithm, stopAlgorithm, isCompleted, isRunning, setIsRunning, setIsCompleted } = algorithmContext

    const setRun = () => {
        setIsRunning(true)
        session.setItem('isRunning', 'true') // continue execution inside algorithm
        if (isCompleted) startAlgorithm()
    }

    const setPause = () => {
        setIsRunning(false)
        session.setItem('isRunning', 'false') // pause execution inside algorithm
        stopAlgorithm()
    }
    const resetAll = () => {
        if (!isCompleted) session.setItem('shouldTerminate', 'true')
        setIsRunning(false)
        setIsCompleted(true)
        ui.clearVisited()
    }

    useEffect(() => {
        if (isCompleted) setIsRunning(false)
    }, [isCompleted, setIsRunning])

    keyPress('x', resetAll)

    return (
        <>
            <Button variant={'ghost'} onClick={resetAll}>
                Reset
            </Button>
            {!isRunning ? (
                <Button variant={'ghost'} onClick={setRun}>
                    <PlayIcon className="h-[1.2rem] w-[1.2rem] transition duration-200 ease-in-out" />
                </Button>
            ) : (
                <Button variant={'ghost'} onClick={setPause}>
                    <PauseIcon className="h-[1.2rem] w-[1.2rem] transition duration-200 ease-in-out" />
                </Button>
            )}
            <span></span>
        </>
    )
}
