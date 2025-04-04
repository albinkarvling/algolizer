export function staircase(
    rows: number,
    cols: number,
    startTile: {row: number; column: number},
    endTile: {row: number; column: number},
): number[][] {
    const walls: number[][] = [];

    const midCol = Math.floor(cols / 2);
    const gapRow = Math.floor(rows / 2); // middle row, where the gap will be

    // Left leg (top-left to center)
    let r1 = 0;
    let c1 = 0;
    while (r1 < rows && c1 < midCol) {
        if (
            !(r1 === gapRow && c1 === midCol) && // leave the gap
            !(r1 === startTile.row && c1 === startTile.column) &&
            !(r1 === endTile.row && c1 === endTile.column)
        ) {
            walls.push([r1, c1]);
        }

        // stair step
        walls.push([r1 + 1, c1]); // vertical step
        r1 += 1;
        c1 += 1;
    }

    // Right leg (bottom to center)
    let r2 = rows - 2;
    let c2 = midCol + 1;
    while (r2 >= 0 && c2 < cols) {
        if (
            !(r2 === gapRow && c2 === midCol + 1) && // leave the gap
            !(r2 === startTile.row && c2 === startTile.column) &&
            !(r2 === endTile.row && c2 === endTile.column)
        ) {
            walls.push([r2, c2]);
        }

        // stair step
        walls.push([r2 - 1, c2]); // vertical step
        r2 -= 1;
        c2 += 1;
    }

    return walls;
}
