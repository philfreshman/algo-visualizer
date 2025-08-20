// config
export const cols = 41
export const rows = 31

export const searchAlgorithms = {
    ASTAR: 'A*',
    DFS: 'Depth first search',
    BFS: 'Breath first search',
    DJIKSTRA: 'Dijkstra',
} as const

export type Algorithm = keyof typeof searchAlgorithms

export const mazeAlgorithms = {
    LABYRINTH: 'Labyrinth',
    FRESH: 'Fresh',
    CUSTOM: 'Custom',
} as const

export type Board = keyof typeof mazeAlgorithms
