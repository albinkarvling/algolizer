import {css} from "@emotion/react";

export const backButton = css`
    margin: calc(var(--main-padding) / 2);
`;

export const generationList = css`
    padding: calc(var(--main-padding) / 1.7);
    border-top: 1px solid var(--background-accent-controls);
`;

export const generationItem = (active: boolean) => css`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    opacity: ${active ? 1 : 0.35};
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

export const generationStatus = css`
    display: flex;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-accent-controls);
`;
