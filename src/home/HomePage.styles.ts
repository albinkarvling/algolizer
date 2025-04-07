import {css} from "@emotion/react";

export const container = css`
    background-color: var(--background-accent-sidebar);
    color: var(--text-primary-sidebar);
    display: flex;
    height: 100%;
`;

export const content = css`
    flex: 1;
`;

export const gameList = css`
    display: flex;
    gap: 0.75rem;
    padding: 1.25rem;
`;

export const gameItem = css`
    display: grid;
    place-items: center;
    width: 160px;
    padding: 2rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
    background-color: var(--background-accent-hover-sidebar);

    &:hover {
        background-color: var(--background-tertiary-sidebar);
    }
`;
