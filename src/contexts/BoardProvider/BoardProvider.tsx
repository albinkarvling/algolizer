import React, {useState} from "react";
import {Grid} from "../../types";
import {getNextGeneration, initializeGrid} from "../../utils/grid";

const BoardContext = React.createContext<null | {
    grid: Grid;
    updateGrid: () => void;
    toggleCellState: (rowIndex: number, cellIndex: number) => void;
    goToNextGeneration: () => void;
    goToPreviousGeneration: () => void;
    columnCount: number;
    currentGeneration: number;
    generationCount: number;
}>(null);

export const useBoard = () => {
    const context = React.useContext(BoardContext);
    if (!context) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
};

export function BoardProvider({children}: {children: React.ReactNode}) {
    const [generationHistory, setGenerationHistory] = useState<Grid[]>([
        initializeGrid(),
    ]);
    const [currentGeneration, setCurrentGeneration] = useState(0);

    const updateGrid = () => {
        setGenerationHistory([initializeGrid()]);
        setCurrentGeneration(0);
    };

    const toggleCellState = (rowIndex: number, cellIndex: number) => {
        setGenerationHistory((prevHistory) => {
            const currentGrid = prevHistory[currentGeneration];
            const updatedGrid = currentGrid.map((row, i) =>
                row.map((cell, j) => {
                    if (i === rowIndex && j === cellIndex) {
                        return {...cell, isAlive: !cell.isAlive};
                    }
                    return cell;
                }),
            );
            return [updatedGrid];
        });
        setCurrentGeneration(0);
    };

    const goToNextGeneration = () => {
        const currentGrid = generationHistory[generationHistory.length - 1];
        const nextGeneration = getNextGeneration(currentGrid);

        if (JSON.stringify(currentGrid) === JSON.stringify(nextGeneration)) {
            return;
        }

        setGenerationHistory((prevHistory) => [...prevHistory, nextGeneration]);
        setCurrentGeneration((prevGeneration) => prevGeneration + 1);
    };

    const goToPreviousGeneration = () => {
        if (currentGeneration === 0) return;
        setCurrentGeneration((prevGeneration) => prevGeneration - 1);
    };

    const currentGrid = generationHistory[currentGeneration];
    const value = {
        grid: currentGrid,
        updateGrid,
        columnCount: currentGrid[0].length,
        toggleCellState,
        goToNextGeneration,
        goToPreviousGeneration,
        currentGeneration,
        generationCount: generationHistory.length,
    };
    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
