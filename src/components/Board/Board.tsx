import {useEffect, useRef} from "react";
import {useBoard} from "../../contexts";
import * as styles from "./Board.styles";

const CELL_SIZE = 24;
const BORDER_SIZE = 1;
export function Board() {
    const {grid, setupGrid, toggleCellState} = useBoard();

    const boardRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const cannotBeUpdated = useRef<
        {
            rowIndex: number;
            cellIndex: number;
        }[]
    >([]);

    useEffect(() => {
        const onResize = () => {
            const board = boardRef.current;
            if (!board) return;

            const boardWidth = board.clientWidth;
            const boardHeight = board.clientHeight;

            const rows = Math.floor(boardHeight / (CELL_SIZE + BORDER_SIZE * 2));
            const columns = Math.floor(boardWidth / (CELL_SIZE + BORDER_SIZE * 2));

            setupGrid(rows, columns);
        };
        onResize();

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [setupGrid]);

    const handleToggleCellState = (rowIndex: number, cellIndex: number) => {
        // prevent the same cell from being updated multiple times in the same drag
        const hasAlreadyBeenUpdated = cannotBeUpdated.current.some(
            (cell) => cell.rowIndex === rowIndex && cell.cellIndex === cellIndex,
        );
        if (hasAlreadyBeenUpdated) return;

        toggleCellState(rowIndex, cellIndex);
        cannotBeUpdated.current.push({rowIndex, cellIndex});
    };

    const startDrag = (rowIndex: number, cellIndex: number) => {
        isDragging.current = true;
        document.addEventListener("mouseup", handleMouseUp);
        handleToggleCellState(rowIndex, cellIndex);
    };
    const handleMouseEnter = (rowIndex: number, cellIndex: number) => {
        if (!isDragging.current) return;
        handleToggleCellState(rowIndex, cellIndex);
    };
    const handleMouseUp = () => {
        isDragging.current = false;
        cannotBeUpdated.current = [];
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div css={styles.board} ref={boardRef}>
            {grid.map((row, rowIndex) => (
                <div css={styles.row} key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <div
                            onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                            onMouseDown={() => startDrag(rowIndex, cellIndex)}
                            css={styles.cell(cell.isAlive)}
                            key={cellIndex}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
