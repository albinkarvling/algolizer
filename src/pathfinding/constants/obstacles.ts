import {blobMaze, recursiveDivision, staircase, zebraMaze} from "@pathfinding/obstacles";

export const OBSTACLE_SELECTION = [
    {
        groupLabel: "Mazes",
        items: [
            {
                id: "recursiveDivision",
                label: "Recursive Division",
                generate: recursiveDivision,
            },
            {
                id: "blobMaze",
                label: "Blob Maze",
                generate: blobMaze,
            },
            {
                id: "zebraMaze",
                label: "Zebra Maze",
                generate: zebraMaze,
            },
        ],
    },
    {
        groupLabel: "Patterns",
        items: [
            {
                id: "staircase",
                label: "Staircase",
                generate: staircase,
            },
        ],
    },
] as const;

export type ObstacleId = (typeof OBSTACLE_SELECTION)[number]["items"][number]["id"];
