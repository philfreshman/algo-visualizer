import { useEffect } from "react"

export const keyShortcuts = {
  c(handler: any) {
    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "c") handler()
      }

      window.addEventListener("keypress", handleKeyPress)

      // Cleanup function
      return () => {
        window.removeEventListener("keypress", handleKeyPress)
      }
    }, [])
  },
}
