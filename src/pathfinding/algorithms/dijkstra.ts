import {Tile, Step, Grid} from "@pathfinding/types";
import {getNeighbors} from "@pathfinding/utils";

export function dijkstra(grid: Grid, start: Tile, end: Tile): Step[] {
    const steps: Step[] = [];

    // Initialize
    for (const row of grid) {
        for (const tile of row) {
            tile.distance = Infinity;
            tile.previous = undefined;
        }
    }

    start.distance = 0;
    const unvisited = grid.flat();
    const visited = new Set<string>();

    const tileKey = (t: Tile) => `${t.row}-${t.column}`;

    while (unvisited.length > 0) {
        unvisited.sort((a, b) => a.distance - b.distance);
        const current = unvisited.shift()!;
        const key = tileKey(current);

        // 🛑 Stop when remaining tiles are not reachable
        if (current.distance === Infinity) break;

        if (visited.has(key)) continue;
        visited.add(key);

        if (current.isWall && !current.isEnd) continue;

        if (!current.isStart && !current.isEnd) {
            steps.push({row: current.row, column: current.column, type: "visit"});
        }

        if (current.row === end.row && current.column === end.column) break;

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            if (neighbor.isWall && !neighbor.isEnd) continue;

            const neighborKey = tileKey(neighbor);
            if (visited.has(neighborKey)) continue;

            const weight = neighbor.weight ?? 1;
            const newDistance = current.distance + weight;

            if (newDistance < neighbor.distance) {
                neighbor.distance = newDistance;
                neighbor.previous = current;
            }
        }
    }

    // Reconstruct path
    let curr: Tile | undefined = grid[end.row][end.column];
    while (curr && (curr.row !== start.row || curr.column !== start.column)) {
        steps.push({row: curr.row, column: curr.column, type: "path"});
        curr = curr.previous;
    }

    return steps;
}
