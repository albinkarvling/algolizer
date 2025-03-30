import {Grid, Step, Tile} from "@pathfinding/types";
import {getNeighbors} from "@pathfinding/utils";

export function bfs(grid: Grid, start: Tile, end: Tile) {
    const queue: Tile[] = [start];
    const visited = new Set<string>();
    const steps: Step[] = [];

    visited.add(`${start.row}-${start.column}`);

    while (queue.length) {
        const current = queue.shift()!;
        steps.push({row: current.row, column: current.column, type: "visit"});

        if (current === end) break;

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            const key = `${neighbor.row}-${neighbor.column}`;
            if (!visited.has(key) && !neighbor.isWall) {
                neighbor.previous = current;
                queue.push(neighbor);
                visited.add(key);
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
