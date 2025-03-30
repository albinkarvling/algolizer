import {Grid, Tile} from "@pathfinding/types";

export function createGrid({
    rowCount,
    columnCount,
    start,
    end,
}: {
    rowCount: number;
    columnCount: number;
    start: Pick<Tile, "row" | "column">;
    end: Pick<Tile, "row" | "column">;
}) {
    const grid: Grid = [];

    for (let row = 0; row < rowCount; row++) {
        const currentRow = [];
        for (let column = 0; column < columnCount; column++) {
            const tile: Tile = {
                row,
                column,
                isEnd: row === end.row && column === end.column,
                isStart: row === start.row && column === start.column,
                isWall: false,
                isVisited: false,
                distance: Infinity,
                isPath: false,
            };

            currentRow.push(tile);
        }
        grid.push(currentRow);
    }

    return grid;
}
