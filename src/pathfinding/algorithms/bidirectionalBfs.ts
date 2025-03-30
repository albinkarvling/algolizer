import {Tile, Step} from "@pathfinding/types";

function getNeighbors(grid: Tile[][], tile: Tile): Tile[] {
    const {row, column} = tile;
    const deltas = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1], // up, down, left, right
    ];

    return deltas
        .map(([dRow, dCol]) => {
            const newRow = row + dRow;
            const newCol = column + dCol;
            if (
                newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid[0].length
            ) {
                return grid[newRow][newCol];
            }
            return null;
        })
        .filter((tile): tile is Tile => tile !== null);
}

export function bidirectionalBfs(grid: Tile[][], start: Tile, end: Tile): Step[] {
    const startQueue: Tile[] = [start];
    const endQueue: Tile[] = [end];
    const startVisited = new Map<string, Tile>();
    const endVisited = new Map<string, Tile>();
    const visitedSteps: Step[] = [];

    const key = (tile: Tile) => `${tile.row}-${tile.column}`;

    startVisited.set(key(start), start);
    endVisited.set(key(end), end);

    while (startQueue.length > 0 && endQueue.length > 0) {
        const process = (
            queue: Tile[],
            visited: Map<string, Tile>,
            otherVisited: Map<string, Tile>,
            from: "start" | "end",
        ): Tile | null => {
            const current = queue.shift()!;
            const currentKey = key(current);

            if (!current.isStart && !current.isEnd) {
                visitedSteps.push({
                    row: current.row,
                    column: current.column,
                    type: "visit",
                    from,
                });
            }

            if (otherVisited.has(currentKey)) {
                return current; // 🎯 Meeting point
            }

            for (const neighbor of getNeighbors(grid, current)) {
                if (neighbor.isWall) continue;

                const neighborKey = key(neighbor);
                if (!visited.has(neighborKey)) {
                    if (from === "start") {
                        neighbor.previousFromStart = current;
                    } else {
                        neighbor.previousFromEnd = current;
                    }

                    visited.set(neighborKey, neighbor);
                    queue.push(neighbor);
                }
            }

            return null;
        };

        const meetFromStart = process(startQueue, startVisited, endVisited, "start");
        const meetFromEnd = process(endQueue, endVisited, startVisited, "end");

        const meetingPoint = meetFromStart || meetFromEnd;
        if (meetingPoint) {
            const meetingKey = key(meetingPoint);

            // 🔁 Reconstruct path from start to meeting
            const path: Step[] = [];
            let node: Tile | undefined = meetingPoint;
            while (node?.previousFromStart) {
                path.unshift({row: node.row, column: node.column, type: "path"});
                node = node.previousFromStart;
            }

            // 🔁 Reconstruct path from meeting to end
            node = endVisited.get(meetingKey);
            while (node && node !== end) {
                path.push({row: node.row, column: node.column, type: "path"});
                node = node.previousFromEnd;
            }

            return [...visitedSteps, ...path];
        }
    }

    return visitedSteps; // no path found
}
