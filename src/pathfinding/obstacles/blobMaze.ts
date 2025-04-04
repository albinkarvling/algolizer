export function blobMaze(
    rows: number,
    cols: number,
    startTile: {row: number; column: number},
    endTile: {row: number; column: number},
    blobCount = 60,
    blobSize = 2,
): number[][] {
    const walls: number[][] = [];
    const margin = 2;

    function overlapsStartOrEnd(r: number, c: number) {
        const area = blobSize;
        return (
            (r <= startTile.row &&
                startTile.row < r + area &&
                c <= startTile.column &&
                startTile.column < c + area) ||
            (r <= endTile.row &&
                endTile.row < r + area &&
                c <= endTile.column &&
                endTile.column < c + area)
        );
    }

    for (let i = 0; i < blobCount; i++) {
        const r = randomInRange(margin, rows - blobSize - margin);
        const c = randomInRange(margin, cols - blobSize - margin);

        if (overlapsStartOrEnd(r, c)) continue;

        for (let dr = 0; dr < blobSize; dr++) {
            for (let dc = 0; dc < blobSize; dc++) {
                walls.push([r + dr, c + dc]);
            }
        }
    }

    return walls;
}

function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
