"use client"

import { useState } from "react"

export function useBoxes() {
  // config
  const width = 40
  const height = 30

  // Initialize matrix as a two-dimensional array filled with zeros
  const [matrix, setMatrix] = useState(() => {
    return Array(height)
      .fill(0)
      .map(() => Array(width).fill(0))
  })

  // handlers
  const toggleBox = (i: number, j: number) => {
    let box = document.querySelector(`#B${i}\\:${j}`)
    if (box && !box.classList.contains("wall")) {
      box!.classList.toggle("checked")
    }
    setMatrix((prevMatrix) => {
      const newMatrix = prevMatrix.map((row) => [...row])
      newMatrix[i][j] = newMatrix[i][j] === 0 ? 1 : 0
      return newMatrix
    })
  }

  return { width, height, matrix, toggleBox }
}
