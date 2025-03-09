import {useCallback, useRef, useState} from "react";
import {Grid} from "../../types";
import {getNextGeneration, initializeGrid} from "../../utils/grid";

export function useGenerationHistory(setIsPlaying: (state: boolean) => void) {
    const [generationHistory, setGenerationHistory] = useState<Grid[]>([
        initializeGrid(),
    ]);
    const [currentGeneration, setCurrentGeneration] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const boardDimensions = useRef({rowCount: 0, cellCount: 0});

    const resetGrid = useCallback(
        (grid?: Grid) => {
            // create a new grid if no grid is provided
            const newGrid =
                grid ??
                initializeGrid(
                    boardDimensions.current.rowCount,
                    boardDimensions.current.cellCount,
                );

            setGenerationHistory([newGrid]);
            setCurrentGeneration(0);
            setHasReachedEnd(false);
            setIsPlaying(false);
        },
        [setIsPlaying],
    );

    const setupGrid = useCallback(
        (rowCount: number, cellCount: number) => {
            boardDimensions.current = {rowCount, cellCount};
            resetGrid(initializeGrid(rowCount, cellCount));
        },
        [resetGrid],
    );

    const toggleCellState = useCallback(
        (rowIndex: number, cellIndex: number) => {
            setGenerationHistory((prev) => {
                const newGrid = Array.from(prev[currentGeneration]);

                newGrid[rowIndex] = [...newGrid[rowIndex]];

                const cellToUpdate = newGrid[rowIndex][cellIndex];
                newGrid[rowIndex][cellIndex] = {
                    ...cellToUpdate,
                    isAlive: !cellToUpdate.isAlive,
                };

                return [newGrid];
            });
            setIsPlaying(false);
            setCurrentGeneration(0);
            setHasReachedEnd(false);
        },
        [currentGeneration, setIsPlaying],
    );

    const goToNextGeneration = useCallback(() => {
        // check if the next generation is already in history
        const nextGenerationInHistory = generationHistory[currentGeneration + 1];
        if (nextGenerationInHistory) {
            setCurrentGeneration(currentGeneration + 1);
            return;
        }

        // if not, calculate the next generation
        const currentGrid = generationHistory[currentGeneration];
        const nextGrid = getNextGeneration(currentGrid);

        // check if the next generation is the same as the current generation
        if (JSON.stringify(currentGrid) === JSON.stringify(nextGrid)) {
            setHasReachedEnd(true);
            setIsPlaying(false);
            return;
        }

        setGenerationHistory([...generationHistory, nextGrid]);
        setCurrentGeneration(currentGeneration + 1);
        setHasReachedEnd(false);
    }, [generationHistory, currentGeneration, setIsPlaying]);

    const goToPreviousGeneration = useCallback(() => {
        setCurrentGeneration((prev) => Math.max(0, prev - 1));
        setIsPlaying(false);
        setHasReachedEnd(false);
    }, [setIsPlaying]);

    const goToGeneration = useCallback(
        (generationIndex: number) => {
            setCurrentGeneration(generationIndex);
            setIsPlaying(false);
        },
        [setIsPlaying],
    );

    const currentGrid = generationHistory[currentGeneration];

    return {
        boardDimensions,
        currentGeneration,
        hasReachedEnd,
        resetGrid,
        setupGrid,
        currentGrid,
        generationHistory,
        goToNextGeneration,
        goToPreviousGeneration,
        toggleCellState,
        goToGeneration,
    };
}
