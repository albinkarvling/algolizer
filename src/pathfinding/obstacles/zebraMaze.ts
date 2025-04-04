export function zebraMaze(
    rows: number,
    cols: number,
    startTile: {row: number; column: number},
    endTile: {row: number; column: number},
): number[][] {
    const walls: number[][] = [];

    for (let r = 2; r < rows - 2; r += 2) {
        for (let c = 1; c < cols - 1; c++) {
            // Leave random gaps
            const isGap = Math.random() < 0.2;

            // Avoid blocking start or end
            const isStart = r === startTile.row && c === startTile.column;
            const isEnd = r === endTile.row && c === endTile.column;

            if (!isGap && !isStart && !isEnd) {
                walls.push([r, c]);
            }
        }
    }

    return walls;
}
