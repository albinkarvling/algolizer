import {Tile, Step} from "@pathfinding/types";

function getNeighbors(grid: Tile[][], tile: Tile): Tile[] {
    const {row, column} = tile;
    const deltas = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    return deltas
        .map(([dr, dc]) => {
            const r = row + dr;
            const c = column + dc;
            if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
                return grid[r][c];
            }
            return null;
        })
        .filter((t): t is Tile => t !== null && !t.isWall);
}

export function dfs(grid: Tile[][], start: Tile, end: Tile): Step[] {
    const stack: Tile[] = [start];
    const visited = new Set<string>();
    const steps: Step[] = [];

    const key = (t: Tile) => `${t.row}-${t.column}`;

    while (stack.length > 0) {
        const current = stack.pop()!;
        const currentKey = key(current);
        if (visited.has(currentKey)) continue;
        visited.add(currentKey);

        if (!current.isStart && !current.isEnd) {
            steps.push({row: current.row, column: current.column, type: "visit"});
        }

        if (current === end) {
            const path: Step[] = [];
            let node: Tile | undefined = current;
            while (node?.previous) {
                path.unshift({row: node.row, column: node.column, type: "path"});
                node = node.previous;
            }
            return [...steps, ...path];
        }

        const neighbors = getNeighbors(grid, current);
        for (const neighbor of neighbors.reverse()) {
            const neighborKey = key(neighbor);
            if (!visited.has(neighborKey)) {
                neighbor.previous = current;
                stack.push(neighbor);
            }
        }
    }

    return steps;
}
