import {css} from "@emotion/react";

export const header = css`
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--height-header);
    background-color: var(--background-primary-header);
    border-left: 1px solid var(--background-accent-header);
    color: var(--text-primary-header);
    padding: 1.25rem;
    overflow: auto;
    white-space: nowrap;
    max-width: 100dvw;

    @media (min-width: 768px) {
        max-width: calc(100dvw - var(--width-main-sidebar));
    }
`;

export const menuButton = css`
    padding: 0.5rem;
    margin: -0.5rem;
    margin-right: 0.5rem;
`;
