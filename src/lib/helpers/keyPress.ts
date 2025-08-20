import { useEffect } from 'react'

export const keyPress = (key: string, func: () => void) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (func && key === 'space') {
                func()
                return
            } else if (e.key.toLowerCase() === key) {
                func()
            }
        }

        window.addEventListener('keypress', handleKeyPress)

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
        }
    }, [func, key])
}
