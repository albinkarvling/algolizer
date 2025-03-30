import {Grid, Step, Tile} from "@pathfinding/types";
import {getNeighbors} from "@pathfinding/utils";

// Heuristic (Manhattan for 4-directional movement)
function heuristic(a: Tile, b: Tile): number {
    return Math.abs(a.row - b.row) + Math.abs(a.column - b.column);
}

export function gbfs(grid: Grid, start: Tile, end: Tile) {
    const steps: Step[] = [];
    const openSet: Tile[] = [start];
    const visited = new Set<string>();

    for (const row of grid) {
        for (const tile of row) {
            tile.f = Infinity;
            tile.previous = undefined;
        }
    }

    start.f = heuristic(start, end);

    while (openSet.length > 0) {
        // Sort by lowest heuristic (h(n))
        openSet.sort((a, b) => a.f! - b.f!);
        const current = openSet.shift()!;
        steps.push({row: current.row, column: current.column, type: "visit"});

        if (current === end) break;
        visited.add(`${current.row}-${current.column}`);

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            const key = `${neighbor.row}-${neighbor.column}`;
            if (neighbor.isWall || visited.has(key)) continue;

            if (!openSet.includes(neighbor)) {
                neighbor.previous = current;
                neighbor.f = heuristic(neighbor, end);
                openSet.push(neighbor);
            }
        }
    }

    // Reconstruct path
    let curr: Tile | undefined = end;
    while (curr?.previous) {
        steps.push({row: curr.row, column: curr.column, type: "path"});
        curr = curr.previous;
    }

    return steps;
}
