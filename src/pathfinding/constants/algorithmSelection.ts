import {DropdownItem} from "@common/components";

export const ALGORITHM_SELECTION = [
    {
        id: "dijkstra",
        label: "Dijkstra's",
    },
    {
        id: "bfs",
        label: "Breadth First Search",
    },
    {
        id: "astar",
        label: "A* Search",
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
] as const satisfies DropdownItem[];
