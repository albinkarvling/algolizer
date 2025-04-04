export function recursiveDivision(
    rows: number,
    cols: number,
    startTile: {row: number; column: number},
    endTile: {row: number; column: number},
): number[][] {
    const walls: number[][] = [];

    // Setup base grid with outer walls (optional)
    for (let r = 0; r < rows; r++) {
        walls.push([r, 0]);
        walls.push([r, cols - 1]);
    }
    for (let c = 0; c < cols; c++) {
        walls.push([0, c]);
        walls.push([rows - 1, c]);
    }

    function divide(
        rStart: number,
        rEnd: number,
        cStart: number,
        cEnd: number,
        orientation: "horizontal" | "vertical",
    ) {
        const width = cEnd - cStart;
        const height = rEnd - rStart;

        if (width < 3 || height < 3) return;

        const horizontal = orientation === "horizontal";

        // Pick wall position (must be even)
        const wallRow = horizontal ? getEvenRandom(rStart + 1, rEnd - 2) : null;
        const wallCol = !horizontal ? getEvenRandom(cStart + 1, cEnd - 2) : null;

        // Pick passage position (must be odd)
        const passage = horizontal
            ? getOddRandom(cStart, cEnd - 1)
            : getOddRandom(rStart, rEnd - 1);

        for (let i = horizontal ? cStart : rStart; i < (horizontal ? cEnd : rEnd); i++) {
            const row = horizontal ? wallRow! : i;
            const col = horizontal ? i : wallCol!;
            const isPassage = horizontal ? col === passage : row === passage;

            const isStart = row === startTile.row && col === startTile.column;
            const isEnd = row === endTile.row && col === endTile.column;

            if (!isPassage && !isStart && !isEnd) {
                walls.push([row, col]);
            }
        }

        // Recurse
        if (horizontal) {
            divide(
                rStart,
                wallRow!,
                cStart,
                cEnd,
                chooseOrientation(wallRow! - rStart, cEnd - cStart),
            );
            divide(
                wallRow! + 1,
                rEnd,
                cStart,
                cEnd,
                chooseOrientation(rEnd - wallRow! - 1, cEnd - cStart),
            );
        } else {
            divide(
                rStart,
                rEnd,
                cStart,
                wallCol!,
                chooseOrientation(rEnd - rStart, wallCol! - cStart),
            );
            divide(
                rStart,
                rEnd,
                wallCol! + 1,
                cEnd,
                chooseOrientation(rEnd - rStart, cEnd - wallCol! - 1),
            );
        }
    }

    function getEvenRandom(min: number, max: number): number {
        const evenMin = Math.ceil(min / 2) * 2;
        const evenMax = Math.floor(max / 2) * 2;
        const range = (evenMax - evenMin) / 2 + 1;
        return evenMin + 2 * Math.floor(Math.random() * range);
    }

    function getOddRandom(min: number, max: number): number {
        const oddMin = Math.ceil(min / 2) * 2 - 1;
        const oddMax = Math.floor(max / 2) * 2 - 1;
        const range = (oddMax - oddMin) / 2 + 1;
        return oddMin + 2 * Math.floor(Math.random() * range);
    }

    function chooseOrientation(height: number, width: number): "horizontal" | "vertical" {
        if (width < height) return "horizontal";
        if (height < width) return "vertical";
        return Math.random() < 0.5 ? "horizontal" : "vertical";
    }

    divide(1, rows - 1, 1, cols - 1, chooseOrientation(rows, cols));

    return walls;
}
