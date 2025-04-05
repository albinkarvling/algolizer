import {Tile, Step} from "@pathfinding/types";

// Manhattan distance heuristic
function heuristic(a: Tile, b: Tile): number {
    return Math.abs(a.row - b.row) + Math.abs(a.column - b.column);
}

// Reconstructs the path from end -> start using previous pointers
function reconstructPath(end: Tile): Step[] {
    const path: Step[] = [];
    let current: Tile | undefined = end;
    while (current?.previous) {
        path.unshift({row: current.row, column: current.column, type: "path"});
        current = current.previous;
    }
    return path;
}

// Get valid neighbors (non-wall, in bounds)
function getNeighbors(grid: Tile[][], tile: Tile): Tile[] {
    const {row, column} = tile;
    const neighbors: Tile[] = [];
    const directions = [
        [-1, 0], // up
        [1, 0], // down
        [0, -1], // left
        [0, 1], // right
    ];

    for (const [dRow, dCol] of directions) {
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

    // Initialize tile states
    for (const row of grid) {
        for (const tile of row) {
            tile.g = Infinity;
            tile.f = Infinity;
            tile.previous = undefined;
        }
    }

    start.g = 0;
    start.f = heuristic(start, end);
    openSet.push(start);

    while (openSet.length > 0) {
        // Sort by f value (lowest f = best candidate)
        openSet.sort((a, b) => (a.f ?? Infinity) - (b.f ?? Infinity));
        const current = openSet.shift()!;
        const key = `${current.row}-${current.column}`;

        if (visitedSet.has(key)) continue;
        visitedSet.add(key);

        if (!current.isStart && !current.isEnd) {
            visitedSteps.push({row: current.row, column: current.column, type: "visit"});
        }

        if (current === end) {
            const path = reconstructPath(current);
            return [...visitedSteps, ...path];
        }

        const neighbors = getNeighbors(grid, current);
        for (const neighbor of neighbors) {
            if (neighbor.isWall) continue;

            const weight = neighbor.weight ?? 1;
            const tentativeG = (current.g ?? Infinity) + weight;

            if (tentativeG < (neighbor.g ?? Infinity)) {
                neighbor.previous = current;
                neighbor.g = tentativeG;
                neighbor.f = tentativeG + heuristic(neighbor, end) * 1.1; // Slightly greedy A*
                openSet.push(neighbor);
            }
        }
    }

    // No path found
    return visitedSteps;
}
