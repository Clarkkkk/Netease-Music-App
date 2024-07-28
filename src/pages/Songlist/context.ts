import { createContext } from 'src/utils'

export const [provide, useSonglistContext] = createContext<{
    id: number
    reload: () => Promise<void>
}>('songlist-context')
