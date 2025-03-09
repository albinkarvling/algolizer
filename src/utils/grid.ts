import {Grid} from "../types";

const DEFAULT_COLUMN_COUNT = 50;
const DEFAULT_ROW_COUNT = 20;
export const initializeGrid = (columnCount = DEFAULT_COLUMN_COUNT) => {
    const grid: Grid = [];
    for (let i = 0; i < DEFAULT_ROW_COUNT; i++) {
        grid.push([]);
        for (let j = 0; j < columnCount; j++) {
            grid[i].push({rowIndex: i, columnIndex: j, isAlive: false});
        }
    }
    return grid;
};

export const getNextGeneration = (grid: Grid): Grid => {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;

    const getNeighborCount = (row: number, col: number): number => {
        const directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];
        return directions.reduce((count, [dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                grid[newRow][newCol].isAlive
            ) {
                count++;
            }
            return count;
        }, 0);
    };

    return grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
            const neighbors = getNeighborCount(rowIndex, columnIndex);
            const isAlive = cell.isAlive
                ? neighbors === 2 || neighbors === 3
                : neighbors === 3;
            return {...cell, isAlive};
        }),
    );
};
