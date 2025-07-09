import { session } from '@/lib/helpers/storage'

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const exe = {
    shouldTerminate(): boolean {
        return session.getItem('shouldTerminate') === 'true'
    },

    async pauseResumeOrTerminate(): Promise<null | void> {
        let isRunning = session.getItem('isRunning') === 'false'
        let terminate = this.shouldTerminate()
        if (isRunning || terminate) {
            while (isRunning && !terminate) {
                await delay(100)
                isRunning = session.getItem('isRunning') === 'false'
                terminate = this.shouldTerminate()
            }
            if (terminate) {
                return null // terminate the algorithm
            }
        }
    },
}
