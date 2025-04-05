import {AlgorithmId} from "@pathfinding/algorithms/types";
import {useVisualizerController} from "@pathfinding/hooks";
import {useAlgorithmSelection} from "@pathfinding/hooks/useAlgorithmSelection";
import {Grid, Step, Tile} from "@pathfinding/types";
import {createGrid} from "@pathfinding/utils";
import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";

const PLAYBACK_SPEED = 0;

type MoveTileType = "start" | "end";
type BoardContextType = {
    currentGrid: Grid;
    toggleWall: (row: number, column: number) => void;
    toggleWeight: (row: number, column: number, weight: number) => void;
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
    canStepBack: boolean;
    canStepForward: boolean;
    moveTile: (type: MoveTileType, row: number, column: number) => void;
    shouldAnimate: boolean;
    switchAlgorithm: (algorithmId: AlgorithmId) => void;
    currentAlgorithmId: AlgorithmId;
    addObstaclePreset: (
        obstacleGenerator: (
            rows: number,
            cols: number,
            startTile: Tile,
            endTile: Tile,
        ) => number[][],
    ) => void;
    stepCount: number;
    stepIndex: number;
    goToStep: (stepIndex: number) => void;
    removeWeights: () => void;
    resetGrid: () => void;
};

const BoardContext = createContext<null | BoardContextType>(null);

export function useBoard() {
    const context = useContext(BoardContext);
    if (!context) throw new Error("useBoard must be used within a BoardProvider");
    return context;
}

export function BoardProvider({children}: {children: React.ReactNode}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [preventGoToEnd, setPreventGoToEnd] = useState(true);
    const [steps, setSteps] = useState<Step[]>([]);
    const initialGrid = useRef<Grid>([]);
    const [currentGrid, setCurrentGrid] = useState<Grid>(initialGrid.current);

    const {currentAlgorithm, switchAlgorithm} = useAlgorithmSelection();

    const {
        canStepBack,
        canStepForward,
        goToNextStep,
        goToPrevStep,
        stepIndex,
        goToEndStep,
        hasReachedEnd,
        reset,
        goToStep,
        currentStepIndex,
    } = useVisualizerController(steps, isPlaying, setIsPlaying, PLAYBACK_SPEED);

    const getStartTile = useCallback(
        (grid: Grid = initialGrid.current) => grid.flat().find((t) => t.isStart),
        [],
    );

    const getEndTile = useCallback(
        (grid: Grid = initialGrid.current) => grid.flat().find((t) => t.isEnd),
        [],
    );

    const computeSteps = useCallback(() => {
        const gridCopy = structuredClone(initialGrid.current);
        const start = getStartTile(gridCopy);
        const end = getEndTile(gridCopy);
        if (start && end) {
            setSteps(currentAlgorithm.algorithmFn(gridCopy, start, end));
        }
    }, [currentAlgorithm, getStartTile, getEndTile]);

    const updateSingleTile = useCallback(
        (row: number, col: number, updater: (tile: Tile) => Tile) => {
            initialGrid.current[row][col] = updater(initialGrid.current[row][col]);
            computeSteps();
            setIsPlaying(false);
            if (currentStepIndex.current !== 0) {
                setPreventGoToEnd(false);
                goToEndStep();
            }
        },
        [computeSteps, currentStepIndex, goToEndStep],
    );

    const updateGridWithSteps = useCallback(() => {
        const stepMap = new Map(
            steps.slice(0, stepIndex).map((s) => [`${s.row}-${s.column}`, s]),
        );
        setCurrentGrid(
            initialGrid.current.map((row) =>
                row.map((tile) => {
                    const step = stepMap.get(`${tile.row}-${tile.column}`);
                    return step
                        ? {
                              ...tile,
                              isVisited: step.type === "visit",
                              isPath: step.type === "path",
                          }
                        : tile;
                }),
            ),
        );
    }, [steps, stepIndex]);

    useEffect(() => {
        if (!isPlaying && !preventGoToEnd) goToEndStep();
    }, [goToEndStep, steps.length, preventGoToEnd, isPlaying]);

    useEffect(updateGridWithSteps, [updateGridWithSteps]);

    const toggleWall = useCallback(
        (row: number, col: number) => {
            const currentTile = initialGrid.current[row][col];
            if (currentTile.isStart || currentTile.isEnd) return;
            updateSingleTile(row, col, (tile) => ({...tile, isWall: !tile.isWall}));
        },
        [updateSingleTile],
    );

    const toggleWeight = useCallback(
        (row: number, col: number, weight: number) => {
            const currentTile = initialGrid.current[row][col];
            if (currentTile.isStart || currentTile.isEnd) return;
            updateSingleTile(row, col, (tile) => ({
                ...tile,
                weight: tile.weight !== weight ? weight : undefined,
            }));
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
                    updateSingleTile(row, column, (tile) => ({
                        ...tile,
                        isStart: true,
                        isWall: false,
                    }));
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
                    updateSingleTile(row, column, (tile) => ({
                        ...tile,
                        isEnd: true,
                        isWall: false,
                    }));
                    break;
            }
        },
        [getEndTile, getStartTile, updateSingleTile],
    );

    const initializeGrid: BoardContextType["initializeGrid"] = useCallback(
        ({rowCount, columnCount, start, end}) => {
            if (!initialGrid.current.length) {
                initialGrid.current = createGrid({rowCount, columnCount, start, end});
            }
            reset();
            setIsPlaying(false);
            computeSteps();
        },
        [computeSteps, reset],
    );

    const createCleanGrid = useCallback(() => {
        const rowCount = initialGrid.current.length;
        const colCount = initialGrid.current[0].length;
        const midRow = Math.floor(rowCount / 2);
        const start = initialGrid.current[midRow][Math.floor(colCount / 4)];
        const end = initialGrid.current[midRow][Math.floor((3 * colCount) / 4)];
        initialGrid.current = createGrid({rowCount, columnCount: colCount, start, end});
        return {rowCount, columnCount: colCount, startTile: start, endTile: end};
    }, []);

    const resetGrid = useCallback(() => {
        createCleanGrid();
        setCurrentGrid(initialGrid.current);
        computeSteps();
        reset();
        setIsPlaying(false);
    }, [createCleanGrid, reset, computeSteps]);

    const addObstaclePreset: BoardContextType["addObstaclePreset"] = useCallback(
        (generator) => {
            const {rowCount, columnCount, startTile, endTile} = createCleanGrid();
            const wallSet = new Set(
                generator(rowCount, columnCount, startTile, endTile).map(
                    ([r, c]) => `${r}-${c}`,
                ),
            );
            initialGrid.current = initialGrid.current.map((row, rIdx) =>
                row.map((tile, cIdx) =>
                    wallSet.has(`${rIdx}-${cIdx}`) ? {...tile, isWall: true} : tile,
                ),
            );
            setCurrentGrid(initialGrid.current);
            reset();
            setIsPlaying(false);
            computeSteps();
        },
        [createCleanGrid, computeSteps, reset],
    );

    const removeWeights = useCallback(() => {
        initialGrid.current = initialGrid.current.map((row) =>
            row.map((tile) => ({...tile, weight: undefined})),
        );
        setCurrentGrid(initialGrid.current);
    }, []);

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
        toggleWeight,
        isPlaying,
        setIsPlaying: toggleIsPlaying,
        shouldAnimate: preventGoToEnd,
        goToPrevStep,
        goToNextStep,
        canStepBack,
        canStepForward,
        moveTile,
        currentAlgorithmId: currentAlgorithm.id,
        switchAlgorithm,
        stepIndex,
        goToStep,
        removeWeights,
        stepCount: steps.length,
        addObstaclePreset,
        resetGrid,
    };

    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
