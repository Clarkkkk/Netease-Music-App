import type { Eruda } from 'eruda'

let instance: Eruda | null = null

export function useEruda() {
    async function startEruda() {
        if (!instance) {
            instance = (await import('eruda')).default
        }
        instance.init()
    }

    async function stopEruda() {
        instance?.destroy()
    }

    return {
        startEruda,
        stopEruda,
        eruda: instance
    }
}
