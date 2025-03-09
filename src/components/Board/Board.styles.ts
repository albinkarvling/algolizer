import {css} from "@emotion/react";

export const board = css`
    flex: 1;
    overflow: hidden;
`;

export const row = css`
    display: flex;
`;

export const cell = (isAlive: boolean) => css`
    flex: 1;
    aspect-ratio: 1;
    border: 1px solid var(--background-tertiary);
    background-color: ${isAlive ? "var(--cell-alive)" : "var(--cell-dead)"};
`;
