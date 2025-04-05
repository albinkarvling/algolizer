import {RefObject, useEffect} from "react";

type Props = {
    containerRef: RefObject<HTMLDivElement | null>;
    onResizeGrid: (options: {
        rowCount: number;
        columnCount: number;
        start: {row: number; column: number};
        end: {row: number; column: number};
    }) => void;
};

const TILE_SIZE = 24 + 0.5; // 24px + 0.5px border
const MAX_ROWS = 31;
const MAX_COLUMNS = 52;
const SCREEN_SIZE_BREAKPOINT = 768;

export function useResponsiveGrid({containerRef, onResizeGrid}: Props) {
    useEffect(() => {
        if (!containerRef.current) return;

        // determine how many rows and columns we can fit on the screen
        const calculateGridSize = () => {
            const container = containerRef.current;
            if (!container) return;

            const {width, height} = container.getBoundingClientRect();

            let rows = Math.floor(height / TILE_SIZE);
            let columns = Math.floor(width / TILE_SIZE);

            const isMobile = window.innerWidth <= SCREEN_SIZE_BREAKPOINT;
            if (columns > MAX_COLUMNS && !isMobile) columns = MAX_COLUMNS;
            if (rows > MAX_ROWS && !isMobile) rows = MAX_ROWS;

            const middleRow = Math.floor(rows / 2);
            const startColumn = Math.floor(columns / 4);
            const endColumn = Math.floor((3 * columns) / 4);

            const startTile = {row: middleRow, column: startColumn};
            const endTile = {row: middleRow, column: endColumn};

            onResizeGrid({
                rowCount: rows,
                columnCount: columns,
                start: startTile,
                end: endTile,
            });
        };
        calculateGridSize();

        const resizeObserver = new ResizeObserver(calculateGridSize);
        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, [containerRef, onResizeGrid]);
}
