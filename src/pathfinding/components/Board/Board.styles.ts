import {css, keyframes} from "@emotion/react";
import {Tile} from "@pathfinding/types";

export const board = css`
    flex: 1;
    overflow: hidden;
    max-width: calc(100dvw - var(--width-main-sidebar));
    height: calc(100% - var(--height-header));
    touch-action: none;
`;

export const row = css`
    display: flex;
`;

const visitedKeyframes = keyframes`
    0% {
        border-radius: 100%;
        background-color: var(--tile-empty);
        transform: scale(0.7);
    }
    70% {
        transform: scale(1.2);
        background-color: var(--tile-visited-transition);
    }
    100% {
        background-color: var(--tile-visited);
        transform: scale(1);
    }
`;

const pathKeyframes = keyframes`
    0% {
        transform: scale(0.7);
    }
    70% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`;

const getBackgroundColor = (tile: Tile) => {
    if (tile.isStart) return "var(--tile-start)";
    if (tile.isEnd) return "var(--tile-end)";
    if (tile.isWall) return "var(--tile-wall)";
    if (tile.isVisited) return "var(--tile-visited)";
    if (tile.isPath) return "var(--tile-path)";
};
const getAnimation = (tile: Tile) => {
    if (tile.isStart || tile.isEnd) return;
    if (tile.isVisited) return visitedKeyframes;
    if (tile.isPath) return pathKeyframes;
    return "none";
};

export const tile = (tile: Tile, shouldAnimate: boolean) => css`
    flex: 1;
    aspect-ratio: 1;
    border: 1px solid var(--grid-color);
    background-color: ${getBackgroundColor(tile)};
    animation: ${shouldAnimate
        ? css`
              ${getAnimation(tile)} 1.5s
          `
        : undefined};
`;
