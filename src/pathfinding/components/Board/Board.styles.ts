import {css, keyframes} from "@emotion/react";
import {GRASS_WEIGHT, MUD_WEIGHT} from "@pathfinding/constants";
import {Tile} from "@pathfinding/types";

export const board = css`
    flex: 1;
    overflow: hidden;
    height: calc(100dvh - var(--height-header));
    touch-action: none;
    width: 100%;
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
    if (tile.isWall && !(tile.isStart || tile.isEnd)) return "var(--tile-wall)";
    if (tile.isVisited) return "var(--tile-visited)";
    if (tile.isPath) return "var(--tile-path)";
    if (tile.weight === GRASS_WEIGHT) return "var(--tile-grass)";
    if (tile.weight === MUD_WEIGHT) return "var(--tile-mud)";
};
const getAnimation = (tile: Tile) => {
    if (tile.isEnd) return;
    if (tile.isVisited) return visitedKeyframes;
    if (tile.isPath) return pathKeyframes;
    return "none";
};

export const tile = (tile: Tile, shouldAnimate: boolean) => css`
    flex: 1;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border: ${!tile.isWall ? "1px solid var(--grid-color)" : "1px solid transparent"};
    background-color: ${getBackgroundColor(tile)};
    animation: ${shouldAnimate
        ? css`
              ${getAnimation(tile)} 1.5s
          `
        : undefined};
`;

export const weight = css`
    position: relative;
    pointer-events: none;
    user-select: none;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-size: 0.875rem;
    font-weight: bold;
`;
