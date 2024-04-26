"use client"

import generateMaze from "@/lib/algorithms/maze"
import { session } from "@/lib/helpers/storage"
import React, { createContext, useEffect, useState } from "react"

interface AlgorithmTypes {
  [key: string]: string
}

interface AlgorithmState {
  matrix: Matrix
  setMatrix: React.Dispatch<React.SetStateAction<Matrix>>
  isRunning: boolean
  isCompleted: boolean
  mazeAlgorithms: AlgorithmTypes
  mazeGenerationAlgorithm: string
  pathfindingAlgorithm: string
  searchAlgorithms: AlgorithmTypes
  setMazeGenerationAlgorithm: React.Dispatch<React.SetStateAction<string>>
  setPathfindingAlgorithm: React.Dispatch<React.SetStateAction<string>>
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
  // config
  const cols = 40
  const rows = 30
  const searchAlgorithms: AlgorithmTypes = { DFS: "Depth first search", BFS: "Breath first search" }
  const mazeAlgorithms: AlgorithmTypes = { CUSTOM: "Custom", LABIRYNT: "Labirynt" }

  // prettier-ignore
  const init = () => Array(rows).fill(0).map(() => Array(cols).fill(0))

  const [matrix, setMatrix] = useState<Matrix>(init())
  const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState(session.getItem("pathfindingAlgorithm") || "DFS")
  const [mazeGenerationAlgorithm, setMazeGenerationAlgorithm] = useState(session.getItem("mazeGenerationAlgorithm") || "CUSTOM")
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

  const createMaze = () => {
    generateMaze(matrix, 0, 0, cols, rows)
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

  useEffect(() => {
    session.setItem("pathfindingAlgorithm", pathfindingAlgorithm)
  }, [pathfindingAlgorithm])

  useEffect(() => {
    session.setItem("mazeGenerationAlgorithm", mazeGenerationAlgorithm)
  }, [mazeGenerationAlgorithm])

  return (
    <AlgorithmContext.Provider
      value={{
        matrix,
        setMatrix,
        clearMatrixWalls,
        isCompleted,
        isRunning,
        mazeAlgorithms,
        mazeGenerationAlgorithm,
        pathfindingAlgorithm,
        searchAlgorithms,
        setIsRunning,
        setIsCompleted,
        setMazeGenerationAlgorithm,
        setPathfindingAlgorithm,
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
