import {Grid, Step, Tile} from "@pathfinding/types";
import {getNeighbors} from "@pathfinding/utils";

export function dijkstra(grid: Grid, start: Tile, end: Tile): Step[] {
    const steps: Step[] = [];
    const visited = new Set<string>();

    // 1. Initialize all distances and previous tiles
    for (const row of grid) {
        for (const tile of row) {
            tile.distance = Infinity;
            tile.previous = undefined;
        }
    }

    start.distance = 0;
    const unvisited: Tile[] = grid.flat();

    // 2. Dijkstra core loop
    while (unvisited.length > 0) {
        // Sort tiles by shortest distance and pick the nearest
        unvisited.sort((a, b) => a.distance - b.distance);
        const current = unvisited.shift()!;

        if (current.isWall) continue;

        const key = `${current.row}-${current.column}`;
        if (visited.has(key)) continue;
        visited.add(key);

        // Record step
        if (!current.isStart && !current.isEnd) {
            steps.push({row: current.row, column: current.column, type: "visit"});
        }

        if (current === end) break;

        for (const neighbor of getNeighbors(current, grid)) {
            if (neighbor.isWall) continue;
            if (visited.has(`${neighbor.row}-${neighbor.column}`)) continue;

            // Use weighted cost
            const weight = neighbor.weight ?? 1;
            const newDist = current.distance + weight;

            if (newDist < neighbor.distance) {
                neighbor.distance = newDist;
                neighbor.previous = current;
            }
        }
    }

    // 3. Backtrack to build path
    let curr: Tile | undefined = end;
    const pathSteps: Step[] = [];
    while (curr?.previous) {
        pathSteps.unshift({row: curr.row, column: curr.column, type: "path"});
        curr = curr.previous;
    }

    return [...steps, ...pathSteps];
}
