import {DropdownGroup} from "@shared/components";

export const ALGORITHM_SELECTION = [
    {
        groupLabel: "Supports Weights",
        items: [
            {
                id: "dijkstra",
                label: "Dijkstra's",
            },
            {
                id: "astar",
                label: "A* Search",
            },
        ],
    },
    {
        groupLabel: "Non-weight Algorithms",
        items: [
            {
                id: "bfs",
                label: "Breadth First Search",
            },
            {
                id: "gbfs",
                label: "Greedy Best First Search",
            },
            {
                id: "bidirectionalBfs",
                label: "Bidirectional BFS",
            },
            {
                id: "dfs",
                label: "Depth First Search",
            },
        ],
    },
] as const satisfies DropdownGroup[];
