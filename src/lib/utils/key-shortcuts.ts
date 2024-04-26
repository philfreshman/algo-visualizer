import { useEffect } from "react"

export const keyShortcuts = (key: string, func?: () => void) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (func && key === "space") {
        func()
        return
      } else if (func && e.key.toLowerCase() === key) {
        func()
      }
    }

    window.addEventListener("keypress", handleKeyPress)

    return () => {
      window.removeEventListener("keypress", handleKeyPress)
    }
  }, [])
}
