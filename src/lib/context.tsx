"use client"

import { session } from "@/lib/utils/session"
import React, { createContext, useEffect, useState } from "react"

interface AlgorithmTypes {
  [key: string]: string
}

type MazeTypes = "CUSTOM" | "MAZE"

interface AlgorithmState {
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
}

export const AlgorithmContext = createContext<AlgorithmState | null>(null)

export const AlgorithmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState(session.getItem("pathfindingAlgorithm") || "DFS")
  const [mazeGenerationAlgorithm, setMazeGenerationAlgorithm] = useState(session.getItem("mazeGenerationAlgorithm") || "CUSTOM")
  const [startTrigger, setStartTrigger] = useState(false)
  const [createMazeTrigger, setCreateMazeTrigger] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(true)
  const [shouldStop, setShouldStop] = useState(false)

  const searchAlgorithms: AlgorithmTypes = { DFS: "Depth first search", BFS: "Breath first search" }
  const mazeAlgorithms: AlgorithmTypes = { CUSTOM: "Custom", RANDOM: "Random" }

  const startAlgorithm = () => {
    if (isCompleted) {
      console.log("run")
      setStartTrigger((prevState) => !prevState)
      setIsRunning(true)
      setIsCompleted(false)
      setShouldStop(false)
    }
  }
  const stopAlgorithm = () => {
    setIsRunning(false)
  }

  // const onCreateMaze = () => {
  //   setCreateMazeTrigger(true)
  // }

  const setCompleted = () => {
    setIsCompleted(true)
    setIsRunning(false)
    session.setItem("isRunning", "false")
    session.setItem("shouldTerminate", "false")
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
