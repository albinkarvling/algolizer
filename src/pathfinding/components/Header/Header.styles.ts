import {css} from "@emotion/react";

export const content = css`
    gap: 1.5rem;
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
