import React from "react"

interface MousePositionContextProps {
  x: number
  y: number
}

export const MousePositionContext = React.createContext<MousePositionContextProps>({ x: 0, y: 0 })
