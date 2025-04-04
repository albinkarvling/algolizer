import {DropdownGroup, DropdownItem} from "@common/components";
import {blobMaze, recursiveDivision, staircase, zebraMaze} from "@pathfinding/obstacles";
import {Tile} from "@pathfinding/types";

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
] as const satisfies DropdownGroup<
    DropdownItem & {
        generate: (
            rowCount: number,
            colCount: number,
            startTile: Tile,
            endTile: Tile,
        ) => number[][];
    }
>[];

export type ObstacleId = (typeof OBSTACLE_SELECTION)[number]["items"][number]["id"];
