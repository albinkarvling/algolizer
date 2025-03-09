import {css} from "@emotion/react";

export const header = css`
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--header-height);
    background-color: var(--background-controls);
    border-left: 1px solid var(--background-accent-controls);
    color: var(--text-controls);
    padding: 1.25rem;
`;

export const currentGeneration = css`
    margin-left: -0.5rem;
`;
