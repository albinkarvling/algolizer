import {Grid, Step, Tile} from "@pathfinding/types";
import {getNeighbors} from "@pathfinding/utils";

function heuristic(a: Tile, b: Tile): number {
    // Manhattan distance (works well for 4-directional grid)
    return Math.abs(a.row - b.row) + Math.abs(a.column - b.column);
}

export function astar(grid: Grid, start: Tile, end: Tile) {
    const steps: Step[] = [];
    const openSet: Tile[] = [start];
    const visited = new Set<string>();

    for (const row of grid) {
        for (const tile of row) {
            tile.g = Infinity; // Cost from start
            tile.f = Infinity; // Estimated cost (g + h)
            tile.previous = undefined;
        }
    }

    start.g = 0;
    start.f = heuristic(start, end);

    while (openSet.length > 0) {
        // Sort openSet by lowest f-score
        openSet.sort((a, b) => a.f! - b.f!);
        const current = openSet.shift()!;

        steps.push({row: current.row, column: current.column, type: "visit"});

        if (current === end) break;

        visited.add(`${current.row}-${current.column}`);

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            const key = `${neighbor.row}-${neighbor.column}`;
            if (neighbor.isWall || visited.has(key)) continue;

            const tentativeG = current.g! + 1; // Uniform cost

            if (tentativeG < neighbor.g!) {
                neighbor.previous = current;
                neighbor.g = tentativeG;
                neighbor.f = neighbor.g + heuristic(neighbor, end);

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    // Reconstruct shortest path
    let curr: Tile | undefined = end;
    while (curr?.previous) {
        steps.push({row: curr.row, column: curr.column, type: "path"});
        curr = curr.previous;
    }

    return steps;
}
