import { storage } from "@/lib/utils/storage"

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Check if the algorithm should terminate
export const shouldTerminate = (): boolean => {
  return storage.getItem("shouldTerminate") === "true"
}

export const pauseResumeOrTerminate = async (): Promise<null | void> => {
  let isRunning = storage.getItem("isRunning") === "false"
  let terminate = shouldTerminate()
  if (isRunning || terminate) {
    while (isRunning && !terminate) {
      await delay(100)
      isRunning = storage.getItem("isRunning") === "false"
      terminate = shouldTerminate()
    }
    if (terminate) {
      return null // terminate the algorithm
    }
  }
}
