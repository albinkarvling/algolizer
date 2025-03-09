import {css} from "@emotion/react";

export const container = css`
    display: flex;
    gap: 2rem;
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.75rem;
    background-color: var(--background-controls);
    color: var(--text-controls);
    padding: 0.5rem;
`;

export const playbackButtons = css`
    display: flex;
    gap: 0.25rem;
`;
