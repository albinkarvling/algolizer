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
};

const BoardContext = createContext<null | BoardContextType>(null);

export const useBoard = () => {
    const context = useContext(BoardContext);
    if (context === null) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
};

const PLAYBACK_SPEED = 0;

export function BoardProvider({children}: {children: React.ReactNode}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [preventGoToEnd, setPreventGoToEnd] = useState(true);
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
        goToStep,
    } = useVisualizerController(steps, isPlaying, setIsPlaying, PLAYBACK_SPEED);

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

    const resetGrid = useCallback(() => {
        const middleRow = Math.floor(initialGrid.current.length / 2);
        const rowCount = initialGrid.current.length;
        const columnCount = initialGrid.current[0].length;
        const startTile = initialGrid.current[middleRow][Math.floor(columnCount / 4)];
        const endTile = initialGrid.current[middleRow][Math.floor((3 * columnCount) / 4)];
        initialGrid.current = createGrid({
            rowCount,
            columnCount,
            start: startTile,
            end: endTile,
        });

        return {rowCount, columnCount, startTile, endTile};
    }, []);

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

    const toggleWeight = useCallback(
        (row: number, column: number, weight: number) => {
            updateSingleTile(row, column, (tile) => ({
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

    const addObstaclePreset: BoardContextType["addObstaclePreset"] = useCallback(
        (obstacleGenerator) => {
            const {rowCount, columnCount, startTile, endTile} = resetGrid();

            const walls = new Set(
                obstacleGenerator(rowCount, columnCount, startTile, endTile).map(
                    (wall) => `${wall[0]}-${wall[1]}`,
                ),
            );

            initialGrid.current = initialGrid.current.map((gridRow, rowIndex) =>
                gridRow.map((tile, columnIndex) => {
                    return walls.has(`${rowIndex}-${columnIndex}`)
                        ? {...tile, isWall: true}
                        : tile;
                }),
            );
            setCurrentGrid(initialGrid.current);
            reset();
            computeSteps();
        },
        [resetGrid, computeSteps, reset],
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
        currentAlgorithm,
        switchAlgorithm,
        stepIndex,
        goToStep,
        stepCount: steps.length,
        addObstaclePreset,
    };

    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
