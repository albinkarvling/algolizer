import {AlgorithmId} from "@pathfinding/algorithms/types";
import {useVisualizerController} from "@pathfinding/hooks";
import {useAlgorithmSelection} from "@pathfinding/hooks/useAlgorithmSelection";
import {Grid, Step, Tile} from "@pathfinding/types";
import {createGrid} from "@pathfinding/utils";
import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";

type MoveTileType = "start" | "end";
type BoardContextType = {
    currentGrid: Grid;
    toggleWall: (row: number, column: number) => void;
    initializeGrid: (options: {
        rowCount: number;
        columnCount: number;
        start: {row: number; column: number};
        end: {row: number; column: number};
    }) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    goToPrevStep: () => void;
    goToNextStep: () => void;
    setPlaybackSpeed: (speed: number) => void;
    playbackSpeed: number;
    canStepBack: boolean;
    canStepForward: boolean;
    moveTile: (type: MoveTileType, row: number, column: number) => void;
    shouldAnimate: boolean;
    switchAlgorithm: (algorithmId: AlgorithmId) => void;
    currentAlgorithmId: AlgorithmId;
};

const BoardContext = createContext<null | BoardContextType>(null);

export const useBoard = () => {
    const context = useContext(BoardContext);
    if (context === null) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
};

export function BoardProvider({children}: {children: React.ReactNode}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [preventGoToEnd, setPreventGoToEnd] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(10);
    const initialGrid = useRef<Grid>([]);
    const [currentGrid, setCurrentGrid] = useState<Grid>(initialGrid.current);
    const [steps, setSteps] = useState<Step[]>([]);

    const {currentAlgorithm, switchAlgorithm} = useAlgorithmSelection();

    const {
        canStepBack,
        canStepForward,
        goToNextStep,
        goToPrevStep,
        reset,
        stepIndex,
        goToEndStep,
        hasReachedEnd,
    } = useVisualizerController(steps, isPlaying, setIsPlaying, playbackSpeed);

    useEffect(() => {
        if (!isPlaying && !preventGoToEnd) {
            goToEndStep();
        }
    }, [goToEndStep, steps.length, preventGoToEnd, isPlaying]);

    useEffect(() => {
        const stepMap = new Map(
            steps.slice(0, stepIndex).map((step) => [`${step.row}-${step.column}`, step]),
        );
        setCurrentGrid(
            initialGrid.current.map((gridRow) =>
                gridRow.map((tile) => {
                    const step = stepMap.get(`${tile.row}-${tile.column}`);
                    if (!step) return tile;

                    return {
                        ...tile,
                        isVisited: step.type === "visit",
                        isPath: step.type === "path",
                    };
                }),
            ),
        );
    }, [steps, stepIndex]);

    const getStartTile = useCallback((grid?: Grid) => {
        return (grid ?? initialGrid.current).flat().find((tile) => tile.isStart);
    }, []);
    const getEndTile = useCallback((grid?: Grid) => {
        return (grid ?? initialGrid.current).flat().find((tile) => tile.isEnd);
    }, []);

    const computeSteps = useCallback(() => {
        const algorithmGrid = structuredClone(initialGrid.current);
        const startTile = getStartTile(algorithmGrid);
        const endTile = getEndTile(algorithmGrid);
        if (!startTile || !endTile) return;

        const path = currentAlgorithm.algorithmFn(algorithmGrid, startTile, endTile);
        setSteps(path);
    }, [currentAlgorithm, getStartTile, getEndTile]);

    const initializeGrid: BoardContextType["initializeGrid"] = useCallback(
        ({rowCount, columnCount, start, end}) => {
            const grid = createGrid({rowCount, columnCount, start, end});
            initialGrid.current = grid;
            computeSteps();
        },
        [computeSteps],
    );

    const updateSingleTile = useCallback(
        (row: number, column: number, updater: (tile: Tile) => Tile) => {
            initialGrid.current = initialGrid.current.map((gridRow, rowIndex) =>
                rowIndex === row
                    ? gridRow.map((tile, columnIndex) =>
                          columnIndex === column ? updater(tile) : tile,
                      )
                    : gridRow,
            );
            computeSteps();
            setIsPlaying(false);
            if (stepIndex !== 0) {
                setPreventGoToEnd(false);
                goToEndStep();
            }
        },
        [computeSteps, stepIndex, goToEndStep],
    );

    const toggleWall = useCallback(
        (row: number, column: number) => {
            updateSingleTile(row, column, (tile) => ({...tile, isWall: !tile.isWall}));
        },
        [updateSingleTile],
    );

    const moveTile: BoardContextType["moveTile"] = useCallback(
        (type, row, column) => {
            const currentStartTile = getStartTile();
            const currentEndTile = getEndTile();
            if (!currentStartTile || !currentEndTile) return;

            switch (type) {
                case "start":
                    updateSingleTile(
                        currentStartTile.row,
                        currentStartTile.column,
                        (tile) => ({
                            ...tile,
                            isStart: false,
                        }),
                    );
                    updateSingleTile(row, column, (tile) => ({...tile, isStart: true}));
                    break;
                case "end":
                    updateSingleTile(
                        currentEndTile.row,
                        currentEndTile.column,
                        (tile) => ({
                            ...tile,
                            isEnd: false,
                        }),
                    );
                    updateSingleTile(row, column, (tile) => ({...tile, isEnd: true}));
                    break;
            }
        },
        [getEndTile, getStartTile, updateSingleTile],
    );

    const toggleIsPlaying = useCallback(
        (playing: boolean) => {
            if (hasReachedEnd) reset();
            setIsPlaying(playing);
            setPreventGoToEnd(true);
        },
        [hasReachedEnd, reset],
    );

    const value = {
        currentGrid,
        initializeGrid,
        toggleWall,
        isPlaying,
        setIsPlaying: toggleIsPlaying,
        shouldAnimate: preventGoToEnd,
        setPlaybackSpeed,
        playbackSpeed,
        goToPrevStep,
        goToNextStep,
        canStepBack,
        canStepForward,
        moveTile,
        currentAlgorithmId: currentAlgorithm.id,
        currentAlgorithm,
        switchAlgorithm,
    };

    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
