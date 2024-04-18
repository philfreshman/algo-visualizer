"use client"

import { session } from "@/lib/utils/session"
import React, { createContext, useEffect, useState } from "react"

interface AlgorithmTypes {
  [key: string]: string
}

interface AlgorithmState {
  pathfindingAlgorithm: string
  setPathfindingAlgorithm: React.Dispatch<React.SetStateAction<string>>
  mazeGenerationAlgorithm: string
  setMazeGenerationAlgorithm: React.Dispatch<React.SetStateAction<string>>
  isRunning: boolean
  startAlgorithm: () => void
  stopAlgorithm: () => void
  searchAlgorithms: AlgorithmTypes
  mazeAlgorithms: AlgorithmTypes
  run: (() => void) | null
  setRun: React.Dispatch<React.SetStateAction<(() => void) | null>>
}

export const AlgorithmContext = createContext<AlgorithmState | null>(null)

export const AlgorithmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState(session.getItem("pathfindingAlgorithm") || "DFS")
  const [mazeGenerationAlgorithm, setMazeGenerationAlgorithm] = useState(session.getItem("mazeGenerationAlgorithm") || "CUSTOM")
  const [isRunning, setIsRunning] = useState(false)
  const [run, setRun] = useState<(() => void) | null>(null)

  const searchAlgorithms: AlgorithmTypes = { DFS: "Depth first search", BFS: "Breath first search" }
  const mazeAlgorithms: AlgorithmTypes = { CUSTOM: "Custom", RANDOM: "Random" }

  const startAlgorithm = () => setIsRunning(true)
  const stopAlgorithm = () => setIsRunning(false)

  useEffect(() => {
    session.setItem("pathfindingAlgorithm", pathfindingAlgorithm)
  }, [pathfindingAlgorithm])

  useEffect(() => {
    session.setItem("mazeGenerationAlgorithm", mazeGenerationAlgorithm)
  }, [mazeGenerationAlgorithm])

  return (
    <AlgorithmContext.Provider
      value={{
        pathfindingAlgorithm,
        setPathfindingAlgorithm,
        mazeGenerationAlgorithm,
        setMazeGenerationAlgorithm,
        isRunning,
        startAlgorithm,
        stopAlgorithm,
        searchAlgorithms,
        mazeAlgorithms,
        run,
        setRun,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  )
}
