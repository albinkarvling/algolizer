import React, {useState} from "react";
import {usePlaying} from "@common/hooks";
import {Preset, PRESET_GRIDS} from "@game-of-life/constants";
import {useGenerationHistory} from "@game-of-life/hooks/useGenerationHistory";
import {initializeGrid} from "@game-of-life/utils";
import {Grid} from "@game-of-life/types";

const BoardContext = React.createContext<null | {
    grid: Grid;
    resetGrid: () => void;
    setupGrid: (rowCount: number, cellCount: number) => void;
    generationHistory: Grid[];
    toggleCellState: (rowIndex: number, cellIndex: number) => void;
    goToNextGeneration: () => void;
    goToPreviousGeneration: () => void;
    goToGeneration: (generation: number) => void;
    currentGeneration: number;
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

export function BoardProvider({children}: {children: React.ReactNode}) {
    const [isPlaying, setIsPlaying] = useState(false);

    const {
        setupGrid,
        hasReachedEnd,
        resetGrid,
        currentGrid,
        goToGeneration,
        goToNextGeneration,
        goToPreviousGeneration,
        generationHistory,
        toggleCellState,
        currentGeneration,
        boardDimensions,
    } = useGenerationHistory(setIsPlaying);
    const {playbackSpeed, setPlaybackSpeed} = usePlaying(
        goToNextGeneration,
        hasReachedEnd,
        isPlaying,
    );

    const [activePreset, setActivePreset] = useState<Preset | null>(null);

    const activatePreset = (presetId: Preset) => {
        const preset = PRESET_GRIDS[presetId];

        const {rowCount, cellCount} = boardDimensions.current;
        const grid = initializeGrid(rowCount, cellCount);

        preset.forEach(([row, cell]) => {
            grid[row][cell].isAlive = true;
        });

        resetGrid(grid);
        setActivePreset(presetId);
    };

    const value = {
        grid: currentGrid,
        setupGrid,
        resetGrid,
        generationHistory,
        activatePreset,
        activePreset,
        toggleCellState,
        goToNextGeneration,
        goToPreviousGeneration,
        goToGeneration,
        currentGeneration,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
    };
    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
