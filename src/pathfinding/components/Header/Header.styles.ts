import {css} from "@emotion/react";

export const content = css`
    gap: 1.5rem;

    // this is for the header menu that shows up on mobile
    & > button:first-of-type {
        margin-right: -0.5rem;
    }
`;

export const row = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const tile = css`
    width: 1.5rem;
    aspect-ratio: 1;
    border-radius: 0.25rem;
    border: 2px solid var(--background-accent-header);
    display: grid;
    place-items: center;
    font-size: 0.875rem;
`;

export const unvisitedTile = css`
    ${tile}
    background-color: var(--tile-empty);
`;

export const visitedTile = css`
    ${tile}
    background-color: var(--tile-visited);
`;

export const shortestPath = css`
    ${tile}
    background-color: var(--tile-path);
`;

export const wallTile = css`
    ${tile}
    background-color: var(--tile-wall);
`;

export const grassTile = css`
    ${tile}
    background-color: var(--tile-grass);
    color: var(--text-color);
    font-weight: bold;
`;

export const mudTile = css`
    ${tile}
    background-color: var(--tile-mud);
    color: var(--text-color);
    font-weight: bold;
`;
