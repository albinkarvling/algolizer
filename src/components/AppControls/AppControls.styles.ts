import {css} from "@emotion/react";

export const container = css`
    --main-padding: 1.25rem;
    color: var(--text-controls);
    background-color: var(--background-controls);
    width: var(--width-controls);
`;

export const header = css`
    font-size: 1.25rem;
    font-weight: 500;
    padding: var(--main-padding);
    border-bottom: 1px solid var(--background-accent-controls);
`;

export const content = css`
    padding: var(--main-padding);
`;
