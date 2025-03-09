import React, {useCallback, useEffect, useRef, useState} from "react";
import {Grid} from "../../types";
import {getNextGeneration, initializeGrid} from "../../utils/grid";
import {Preset, PRESET_GRIDS} from "../../constants/presets";

const BoardContext = React.createContext<null | {
    grid: Grid;
    resetGrid: () => void;
    updateGrid: (rowCount: number, cellCount: number) => void;
    generationHistory: Grid[];
    toggleCellState: (rowIndex: number, cellIndex: number) => void;
    goToNextGeneration: () => void;
    goToPreviousGeneration: () => void;
    goToGeneration: (generation: number) => void;
    columnCount: number;
    currentGeneration: number;
    generationCount: number;
    isPlaying: boolean;
    setIsPlaying: (state: boolean) => void;
    playbackSpeed: number;
    setPlaybackSpeed: React.Dispatch<React.SetStateAction<number>>;
    activatePreset: (presetId: Preset) => void;
    activePreset: Preset | null;
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
    const [activePreset, setActivePreset] = useState<Preset | null>(null);
    const gridDimensions = useRef({rowCount: 0, cellCount: 0});
    const intervalRef = useRef<number>(undefined);

    const resetGrid = () => {
        const {rowCount, cellCount} = gridDimensions.current;
        updateGrid(rowCount, cellCount);
        setActivePreset(null);
    };

    const updateGrid = useCallback((rowCount: number, cellCount: number) => {
        gridDimensions.current = {rowCount, cellCount};
        setGenerationHistory([initializeGrid(rowCount, cellCount)]);
        setCurrentGeneration(0);
        setReachedEnd(false);
        setActivePreset(null);
    }, []);

    const activatePreset = (presetId: Preset) => {
        const preset = PRESET_GRIDS[presetId];

        const {rowCount, cellCount} = gridDimensions.current;
        const grid = initializeGrid(rowCount, cellCount);

        preset.forEach(([row, cell]) => {
            grid[row][cell].isAlive = true;
        });

        setActivePreset(presetId);
        setGenerationHistory([grid]);
        setCurrentGeneration(0);
        setReachedEnd(false);
        setIsPlaying(false);
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
        setActivePreset(null);
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

    const goToGeneration = (generation: number) => {
        setCurrentGeneration(generation);
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
        resetGrid,
        generationHistory,
        activatePreset,
        activePreset,
        columnCount: currentGrid[0].length,
        toggleCellState,
        goToNextGeneration,
        goToPreviousGeneration,
        goToGeneration,
        currentGeneration,
        generationCount: generationHistory.length,
        isPlaying,
        setIsPlaying: handlePlayToggle,
        playbackSpeed,
        setPlaybackSpeed,
    };
    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
