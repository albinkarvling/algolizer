import {useCallback, useEffect, useRef} from "react";
import {useBoard} from "@game-of-life/contexts";
import {Grid} from "@game-of-life/types";
import * as styles from "./Board.styles";

const CELL_SIZE = 24;
const BORDER_SIZE = 1;
const CELL_SIZE_WITH_BORDER = CELL_SIZE + BORDER_SIZE;

export function Board() {
    const {grid, setupGrid, toggleCellState} = useBoard();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDragging = useRef(false);
    const lastUpdatedCells = useRef<Set<string>>(new Set());

    useEffect(() => {
        // determine how many rows and columns we can fit on the screen
        const onResize = () => {
            const canvas = canvasRef.current;
            if (!canvas || !canvas.parentElement) return;

            const boardWidth = canvas.parentElement.clientWidth;
            const boardHeight = canvas.parentElement.clientHeight;

            const rows = Math.floor(boardHeight / CELL_SIZE_WITH_BORDER);
            const columns = Math.floor(boardWidth / CELL_SIZE_WITH_BORDER);

            setupGrid(rows, columns);
        };
        onResize();

        const resizeObserver = new ResizeObserver(onResize);

        resizeObserver.observe(containerRef.current!);
        return () => resizeObserver.disconnect();
    }, [setupGrid]);

    const getCSSVariable = useCallback(
        (variable: string, fallback: string) =>
            getComputedStyle(document.documentElement).getPropertyValue(variable) ||
            fallback,
        [],
    );

    const drawGrid = useCallback(
        (ctx: CanvasRenderingContext2D, grid: Grid) => {
            const cellAliveColor = getCSSVariable("--cell-alive", "#000");
            const cellDeadColor = getCSSVariable("--cell-dead", "#f5f5f5");
            const gridColor = getCSSVariable("--background-tertiary", "#ccc");

            grid.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    ctx.fillStyle = cell.isAlive ? cellAliveColor : cellDeadColor;
                    ctx.fillRect(
                        cellIndex * CELL_SIZE_WITH_BORDER,
                        rowIndex * CELL_SIZE_WITH_BORDER,
                        CELL_SIZE,
                        CELL_SIZE,
                    );

                    ctx.strokeStyle = gridColor;
                    ctx.strokeRect(
                        cellIndex * CELL_SIZE_WITH_BORDER,
                        rowIndex * CELL_SIZE_WITH_BORDER,
                        CELL_SIZE,
                        CELL_SIZE,
                    );
                });
            });
        },
        [getCSSVariable],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.parentElement) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const scale = window.devicePixelRatio || 1;

        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;
        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.scale(scale, scale);

        drawGrid(ctx, grid);
    }, [grid, drawGrid]);

    const getCellFromMouseEvent = useCallback(
        (event: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return null;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const cellIndex = Math.floor(x / CELL_SIZE_WITH_BORDER);
            const rowIndex = Math.floor(y / CELL_SIZE_WITH_BORDER);

            // if we are outside the board, return null
            if (
                rowIndex < 0 ||
                rowIndex >= grid.length ||
                cellIndex < 0 ||
                cellIndex >= grid[0].length
            ) {
                return null;
            }

            return {rowIndex, cellIndex};
        },
        [grid],
    );

    const handleMouseDown = useCallback(
        (event: MouseEvent) => {
            isDragging.current = true;
            lastUpdatedCells.current.clear();

            const cell = getCellFromMouseEvent(event);
            if (cell) {
                toggleCellState(cell.rowIndex, cell.cellIndex);
                lastUpdatedCells.current.add(`${cell.rowIndex}-${cell.cellIndex}`);
            }
        },
        [toggleCellState, getCellFromMouseEvent],
    );

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (!isDragging.current) return;

            const cell = getCellFromMouseEvent(event);
            if (!cell) return;

            const cellKey = `${cell.rowIndex}-${cell.cellIndex}`;
            if (lastUpdatedCells.current.has(cellKey)) return;

            toggleCellState(cell.rowIndex, cell.cellIndex);
            lastUpdatedCells.current.add(cellKey);
        },
        [toggleCellState, getCellFromMouseEvent],
    );

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        lastUpdatedCells.current.clear();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp]);

    return (
        <div css={styles.board} ref={containerRef} data-tutorial-id="grid">
            <canvas
                ref={canvasRef}
                style={{display: "block", width: "100%", height: "100%"}}
            />
        </div>
    );
}
