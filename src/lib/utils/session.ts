export const session = {
  getItem(key: string): string | null {
    if (typeof window !== "undefined" && window.sessionStorage) {
      return window.sessionStorage.getItem(key)
    }
    return null
  },

  setItem(key: string, value: string) {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(key, value)
    }
  },
}
