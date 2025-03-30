import {Grid, Tile} from "@pathfinding/types";

export const getNeighbors = (tile: Tile, grid: Grid) => {
    const {row, column} = tile;
    const neighbors: Tile[] = [];

    if (row > 0) neighbors.push(grid[row - 1][column]); // up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][column]); // down
    if (column > 0) neighbors.push(grid[row][column - 1]); // left
    if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]); // right

    return neighbors;
};
