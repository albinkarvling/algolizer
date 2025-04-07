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

    const getCellFromCoords = useCallback(
        (x: number, y: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return null;

            const rect = canvas.getBoundingClientRect();
            const relativeX = x - rect.left;
            const relativeY = y - rect.top;

            const cellIndex = Math.floor(relativeX / CELL_SIZE_WITH_BORDER);
            const rowIndex = Math.floor(relativeY / CELL_SIZE_WITH_BORDER);

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

    const handleInteractionStart = useCallback(
        (x: number, y: number) => {
            isDragging.current = true;
            lastUpdatedCells.current.clear();

            const cell = getCellFromCoords(x, y);
            if (cell) {
                toggleCellState(cell.rowIndex, cell.cellIndex);
                lastUpdatedCells.current.add(`${cell.rowIndex}-${cell.cellIndex}`);
            }
        },
        [getCellFromCoords, toggleCellState],
    );

    const handleInteractionMove = useCallback(
        (x: number, y: number) => {
            if (!isDragging.current) return;

            const cell = getCellFromCoords(x, y);
            if (!cell) return;

            const key = `${cell.rowIndex}-${cell.cellIndex}`;
            if (lastUpdatedCells.current.has(key)) return;

            toggleCellState(cell.rowIndex, cell.cellIndex);
            lastUpdatedCells.current.add(key);
        },
        [getCellFromCoords, toggleCellState],
    );

    const handleInteractionEnd = useCallback(() => {
        isDragging.current = false;
        lastUpdatedCells.current.clear();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseDown = (e: MouseEvent) => {
            handleInteractionStart(e.clientX, e.clientY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            handleInteractionMove(e.clientX, e.clientY);
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY);
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("touchstart", handleTouchStart, {passive: false});
        canvas.addEventListener("touchmove", handleTouchMove, {passive: false});
        window.addEventListener("mouseup", handleInteractionEnd);
        window.addEventListener("touchend", handleInteractionEnd);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("mouseup", handleInteractionEnd);
            window.removeEventListener("touchend", handleInteractionEnd);
        };
    }, [handleInteractionStart, handleInteractionMove, handleInteractionEnd]);

    return (
        <div css={styles.board} ref={containerRef} data-tutorial-id="grid">
            <canvas
                ref={canvasRef}
                style={{display: "block", width: "100%", height: "100%"}}
            />
        </div>
    );
}
