import {memo, useRef} from "react";
import * as styles from "./Board.styles";
import {useBoard} from "@pathfinding/contexts";
import {Tile} from "@pathfinding/types";
import {AlgorithmId} from "@pathfinding/algorithms/types";
import {useMouseControls, useResponsiveGrid} from "@pathfinding/hooks";
import {Flag, Navigation} from "@mui/icons-material";

const TILE_SIZE = 24;

type TileProps = {
    tile: Tile;
    onMouseUp: () => void;
    onMouseDown: () => void;
    onMouseEnter: () => void;
    shouldAnimate: boolean;
    algorithmId: AlgorithmId;
};

const BoardTile = memo(
    ({tile, onMouseUp, onMouseDown, onMouseEnter, shouldAnimate}: TileProps) => {
        return (
            <div
                css={styles.tile(tile, shouldAnimate)}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                data-row={tile.row}
                data-column={tile.column}
                data-is-wall={tile.isWall}
                data-is-start={tile.isStart}
                data-is-end={tile.isEnd}
                style={{minWidth: TILE_SIZE, minHeight: TILE_SIZE}}
            >
                {tile.isStart && <Navigation sx={{rotate: "90deg"}} />}
                {tile.isEnd && <Flag />}
            </div>
        );
    },
    areTilePropsEqual,
);
function areTilePropsEqual(prevProps: TileProps, nextProps: TileProps) {
    const prevTile = prevProps.tile;
    const nextTile = nextProps.tile;

    const tileChanged =
        prevTile.row !== nextTile.row ||
        prevTile.column !== nextTile.column ||
        prevTile.isWall !== nextTile.isWall ||
        prevTile.isStart !== nextTile.isStart ||
        prevTile.isEnd !== nextTile.isEnd ||
        prevTile.isVisited !== nextTile.isVisited ||
        prevTile.isPath !== nextTile.isPath;

    const algorithmChanged = prevProps.algorithmId !== nextProps.algorithmId;

    return !tileChanged && !algorithmChanged;
}

export function Board() {
    const {currentGrid, initializeGrid, shouldAnimate, currentAlgorithmId} = useBoard();

    const containerRef = useRef<HTMLDivElement>(null);

    useResponsiveGrid({containerRef, onResizeGrid: initializeGrid});
    const {onMouseUp, onMouseEnter, onMouseDown, onTouchStart, onTouchEnd} =
        useMouseControls(containerRef);

    return (
        <div
            css={styles.board}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            ref={containerRef}
        >
            {currentGrid.map((row, rowIndex) => (
                <div css={styles.row} key={rowIndex}>
                    {row.map((tile, tileIndex) => (
                        <BoardTile
                            tile={tile}
                            onMouseUp={onMouseUp}
                            onMouseDown={() => onMouseDown(tile)}
                            onMouseEnter={() => onMouseEnter(tile)}
                            shouldAnimate={shouldAnimate}
                            algorithmId={currentAlgorithmId}
                            key={`${rowIndex}-${tileIndex}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
