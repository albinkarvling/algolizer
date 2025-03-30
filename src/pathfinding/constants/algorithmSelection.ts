import {DropdownItem} from "@common/components";
import {AlgorithmId} from "@pathfinding/algorithms/types";

export const ALGORITHM_SELECTION: DropdownItem<AlgorithmId>[] = [
    {
        id: "bfs",
        label: "Breadth First Search",
    },
    {
        id: "dijkstra",
        label: "Dijkstra's",
    },
    {
        id: "astar",
        label: "A* Search",
    },
    {
        id: "gbfs",
        label: "Greedy Best First Search",
    },
];
