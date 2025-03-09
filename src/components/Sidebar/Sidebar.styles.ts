import {css} from "@emotion/react";

export const container = css`
    --main-padding: 1.25rem;
    color: var(--text-controls);
    background-color: var(--background-controls);
    width: var(--width-controls);
    min-width: var(--min-width-controls);
    display: flex;
    flex-direction: column;
`;

export const header = css`
    font-size: 1.25rem;
    font-weight: 500;
    padding: var(--main-padding);
    border-bottom: 1px solid var(--background-accent-controls);
`;

export const content = css`
    overflow: auto;
    height: 100%;
`;

export const footer = (isIdleState: boolean) => css`
    padding: var(--main-padding);
    display: flex;
    gap: 0.75rem;

    border-top: ${!isIdleState ? "1px solid var(--background-accent-controls)" : "none"};

    & > button:first-of-type {
        flex: 1;
        justify-content: start;
    }
`;
