import {useRef} from "react";
import {useBoard} from "../../contexts";
import * as styles from "./Board.styles";

export function Board() {
    const {grid, toggleCellState} = useBoard();

    const isDragging = useRef(false);
    const cannotBeUpdated = useRef<
        {
            rowIndex: number;
            cellIndex: number;
        }[]
    >([]);

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
    const handleMouseMove = (rowIndex: number, cellIndex: number) => {
        if (!isDragging.current) return;
        handleToggleCellState(rowIndex, cellIndex);
    };
    const handleMouseUp = () => {
        isDragging.current = false;
        cannotBeUpdated.current = [];
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div css={styles.board}>
            {grid.map((row, rowIndex) => (
                <div css={styles.row} key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <div
                            onMouseEnter={() => handleMouseMove(rowIndex, cellIndex)}
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
