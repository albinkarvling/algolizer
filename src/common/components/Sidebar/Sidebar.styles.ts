import {css} from "@emotion/react";

export const container = css`
    --main-padding: 1.25rem;
    display: flex;
    flex-direction: column;
    color: var(--text-primary-sidebar);
    background-color: var(--background-primary-sidebar);
    height: 100dvh;
    width: var(--width-main-sidebar);
    min-width: var(--width-main-sidebar);
`;

export const header = css`
    padding: var(--main-padding);
    border-bottom: 1px solid var(--background-accent-sidebar);
`;

export const label = css`
    display: block;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    opacity: 0.75;
`;
