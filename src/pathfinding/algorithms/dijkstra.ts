import {Grid, Step, Tile} from "@pathfinding/types";
import {getNeighbors} from "@pathfinding/utils";

export function dijkstra(grid: Grid, start: Tile, end: Tile) {
    const steps: Step[] = [];
    const visited = new Set<string>();

    // Initialize distances
    for (const row of grid) {
        for (const tile of row) {
            tile.distance = Infinity;
            tile.previous = undefined;
        }
    }

    start.distance = 0;

    // Use a simple array as priority queue (can be optimized with a heap)
    const unvisited: Tile[] = grid.flat();

    while (unvisited.length) {
        // Sort unvisited by distance and pick the tile with the smallest one
        unvisited.sort((a, b) => a.distance - b.distance);
        const current = unvisited.shift()!;

        // Skip walls
        if (current.isWall) continue;

        const key = `${current.row}-${current.column}`;
        if (visited.has(key)) continue;
        visited.add(key);

        steps.push({row: current.row, column: current.column, type: "visit"});

        if (current === end) break;

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            if (visited.has(`${neighbor.row}-${neighbor.column}`)) continue;
            if (neighbor.isWall) continue;

            const alt = current.distance + 1;
            if (alt < neighbor.distance) {
                neighbor.distance = alt;
                neighbor.previous = current;
            }
        }
    }

    // Reconstruct shortest path into steps
    let curr: Tile | undefined = end;
    while (curr?.previous) {
        steps.push({row: curr.row, column: curr.column, type: "path"});
        curr = curr.previous;
    }

    return steps;
}
