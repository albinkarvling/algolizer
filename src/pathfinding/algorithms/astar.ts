import {Tile, Step} from "@pathfinding/types";

function heuristic(a: Tile, b: Tile): number {
    return Math.abs(a.row - b.row) + Math.abs(a.column - b.column);
}

function reconstructPath(end: Tile): Step[] {
    const path: Step[] = [];
    let current: Tile | undefined = end;
    while (current?.previous) {
        path.unshift({row: current.row, column: current.column, type: "path"});
        current = current.previous;
    }
    return path;
}

function getNeighbors(grid: Tile[][], tile: Tile): Tile[] {
    const {row, column} = tile;
    const neighbors: Tile[] = [];
    const deltas = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1], // up, down, left, right
    ];

    for (const [dRow, dCol] of deltas) {
        const newRow = row + dRow;
        const newCol = column + dCol;
        if (
            newRow >= 0 &&
            newRow < grid.length &&
            newCol >= 0 &&
            newCol < grid[0].length
        ) {
            neighbors.push(grid[newRow][newCol]);
        }
    }

    return neighbors;
}

export function astar(grid: Tile[][], start: Tile, end: Tile): Step[] {
    const openSet: Tile[] = [];
    const visitedSet = new Set<string>();
    const visitedSteps: Step[] = [];

    start.g = 0;
    start.f = heuristic(start, end);
    openSet.push(start);

    while (openSet.length > 0) {
        // Sort by f-score, tie-breaking with heuristic to favor directionality
        openSet.sort((a, b) => {
            const fA = a.f ?? Infinity;
            const fB = b.f ?? Infinity;
            if (fA !== fB) return fA - fB;

            // Tie-break: prefer closer to goal
            return heuristic(a, end) - heuristic(b, end);
        });

        const current = openSet.shift()!;
        const currentKey = `${current.row}-${current.column}`;

        if (visitedSet.has(currentKey)) continue;
        visitedSet.add(currentKey);

        if (!current.isStart && !current.isEnd) {
            visitedSteps.push({row: current.row, column: current.column, type: "visit"});
        }

        if (current === end) {
            const pathSteps = reconstructPath(current);
            return [...visitedSteps, ...pathSteps];
        }

        const neighbors = getNeighbors(grid, current);
        for (const neighbor of neighbors) {
            if (neighbor.isWall) continue;

            const tentativeG = (current.g ?? Infinity) + 1;

            if (tentativeG < (neighbor.g ?? Infinity)) {
                neighbor.previous = current;
                neighbor.g = tentativeG;
                neighbor.f = neighbor.g + heuristic(neighbor, end) * 1.1; // weighted heuristic
                openSet.push(neighbor);
            }
        }
    }

    return visitedSteps;
}
