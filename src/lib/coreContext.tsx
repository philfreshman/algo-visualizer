"use client"

import { cols, MazeKey, rows, SearchKey } from "@/lib/constants"
import { session } from "@/lib/helpers/storage"
import React, { createContext, useState } from "react"

interface AlgorithmState {
  isRunning: boolean
  isCompleted: boolean

  matrix: Matrix
  setMatrix: React.Dispatch<React.SetStateAction<Matrix>>

  pathfindingAlgorithm: SearchKey
  setPathfindingAlgorithm: React.Dispatch<React.SetStateAction<SearchKey>>

  mazeGenerationAlgorithm: MazeKey
  setMazeGenerationAlgorithm: React.Dispatch<React.SetStateAction<MazeKey>>

  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>
  setCompleted: () => void
  startAlgorithm: () => void
  startTrigger: boolean
  stopAlgorithm: () => void
  setCreateMazeTrigger: (value: boolean) => void
  createMazeTrigger: boolean
  clearMatrixWalls: () => void
}

export const AlgorithmContext = createContext<AlgorithmState | null>(null)

export const AlgorithmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // prettier-ignore
  const init = () => Array(rows).fill(0).map(() => Array(cols).fill(0))

  const [matrix, setMatrix] = useState<Matrix>(init())
  const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState<SearchKey>((session.getItem("pathfindingAlgorithm") as SearchKey) || "DFS")
  const [mazeGenerationAlgorithm, setMazeGenerationAlgorithm] = useState<MazeKey>((session.getItem("mazeGenerationAlgorithm") as MazeKey) || "CUSTOM")
  const [startTrigger, setStartTrigger] = useState(false)
  const [createMazeTrigger, setCreateMazeTrigger] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(true)

  const startAlgorithm = () => {
    if (isCompleted) {
      setStartTrigger((prevState) => !prevState)
      setIsRunning(true)
      setIsCompleted(false)
    }
  }

  const stopAlgorithm = () => {
    setIsRunning(false)
  }

  const setCompleted = () => {
    setIsCompleted(true)
    setIsRunning(false)
    session.setItem("isRunning", "false")
    session.setItem("shouldTerminate", "false")
  }

  const clearMatrixWalls = () => {
    setMatrix((prevMatrix: Matrix) => {
      return prevMatrix.map((row) => row.map(() => 0))
    })
  }

  return (
    <AlgorithmContext.Provider
      value={{
        setPathfindingAlgorithm,
        matrix,
        setMatrix,
        clearMatrixWalls,
        isCompleted,
        isRunning,
        mazeGenerationAlgorithm,
        pathfindingAlgorithm,
        setIsRunning,
        setIsCompleted,
        setMazeGenerationAlgorithm,
        startAlgorithm,
        startTrigger,
        stopAlgorithm,
        setCompleted,
        createMazeTrigger,
        setCreateMazeTrigger,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  )
}
