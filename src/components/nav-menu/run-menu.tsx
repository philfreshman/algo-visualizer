import { Button } from "@/components/ui/button"
import { AlgorithmContext } from "@/lib/coreContext"
import { clearVisitedAndWalls } from "@/lib/utils/reset"
import { storage } from "@/lib/utils/storage"
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons"
import { useContext, useEffect } from "react"

export default function RunMenu() {
  const algorithmContext = useContext(AlgorithmContext)

  if (!algorithmContext) throw new Error("AlgorithmContext is missing")
  const { startAlgorithm, stopAlgorithm, isCompleted, isRunning, setIsRunning, clearMatrixWalls, setIsCompleted } =
    algorithmContext

  const setRun = () => {
    setIsRunning(true)
    storage.setItem("isRunning", "true") // continue execution inside algorithm
    if (isCompleted) startAlgorithm()
  }

  const setPause = () => {
    setIsRunning(false)
    storage.setItem("isRunning", "false") // pause execution inside algorithm
    stopAlgorithm()
  }

  const resetAll = () => {
    if (!isCompleted) storage.setItem("shouldTerminate", "true")
    setIsRunning(false)
    setIsCompleted(true)
    clearVisitedAndWalls()
    clearMatrixWalls()
  }

  useEffect(() => {
    if (isCompleted) setIsRunning(false)
  }, [isCompleted])

  return (
    <>
      <Button variant={"ghost"} onClick={() => resetAll()}>
        Reset
      </Button>
      {!isRunning ? (
        <Button variant={"ghost"} onClick={() => setRun()}>
          <PlayIcon className="h-[1.2rem] w-[1.2rem] transition duration-200 ease-in-out" />
        </Button>
      ) : (
        <Button variant={"ghost"} onClick={() => setPause()}>
          <PauseIcon className="h-[1.2rem] w-[1.2rem] transition duration-200 ease-in-out" />
        </Button>
      )}
      <span></span>
    </>
  )
}
