import React, {useCallback, useEffect, useRef, useState} from "react";
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
    isPlaying: boolean;
    setIsPlaying: (state: boolean) => void;
    playbackSpeed: number;
    setPlaybackSpeed: React.Dispatch<React.SetStateAction<number>>;
}>(null);

export const useBoard = () => {
    const context = React.useContext(BoardContext);
    if (!context) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
};

const DEFAULT_PLAYBACK_SPEED = 300;

export function BoardProvider({children}: {children: React.ReactNode}) {
    const [generationHistory, setGenerationHistory] = useState<Grid[]>([
        initializeGrid(),
    ]);
    const [currentGeneration, setCurrentGeneration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_PLAYBACK_SPEED);
    const [reachedEnd, setReachedEnd] = useState(false);
    const intervalRef = useRef<number>(undefined);

    const updateGrid = () => {
        setGenerationHistory([initializeGrid()]);
        setCurrentGeneration(0);
        setReachedEnd(false);
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
        setReachedEnd(false);
        setIsPlaying(false);
    };

    const goToNextGeneration = useCallback(() => {
        const currentGrid = generationHistory[currentGeneration];
        const nextGeneration = getNextGeneration(currentGrid);

        if (JSON.stringify(currentGrid) === JSON.stringify(nextGeneration)) {
            setIsPlaying(false);
            setReachedEnd(true);
            return;
        }

        setGenerationHistory((prevHistory) => [...prevHistory, nextGeneration]);
        setCurrentGeneration((prevGeneration) => prevGeneration + 1);
    }, [generationHistory, currentGeneration]);

    const goToPreviousGeneration = () => {
        if (currentGeneration === 0) return;
        setCurrentGeneration((prevGeneration) => prevGeneration - 1);
        setReachedEnd(false);
    };

    useEffect(() => {
        if (!isPlaying) {
            clearInterval(intervalRef.current);
            return;
        }

        const interval = setInterval(() => goToNextGeneration(), playbackSpeed);

        return () => clearInterval(interval);
    }, [isPlaying, playbackSpeed, goToNextGeneration, reachedEnd]);

    const handlePlayToggle = (state: boolean) => {
        if (reachedEnd) return;
        setIsPlaying(state);
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
        isPlaying,
        setIsPlaying: handlePlayToggle,
        playbackSpeed,
        setPlaybackSpeed,
    };
    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
