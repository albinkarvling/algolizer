import {css} from "@emotion/react";

export const container = css`
    position: relative;
`;

export const selectButton = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.875rem;
    border-radius: 0.5rem;
    width: 100%;
    background-color: var(--background-accent-controls);
    transition: background-color 0.2s;

    &:hover {
        background-color: var(--background-accent-hover-controls);
    }
`;

export const dropdownGroups = css`
    display: grid;
    gap: 0.75rem;
    position: absolute;
    top: calc(100% + 0.5rem);
    width: 100%;
    background-color: var(--background-accent-controls);
    padding: 0.875rem;
    border-radius: 0.5rem;
`;

export const groupLabel = css`
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-accent-controls);
    margin-bottom: 0.5rem;
    display: block;
`;

export const dropdownItem = (isActive: boolean) => css`
    width: 100%;
    color: var(--text-controls);
    transition: background-color 0.2s;

    ${isActive ? "background-color: var(--background-accent-hover-controls);" : ""}

    &:hover {
        background-color: var(--background-accent-hover-controls);
    }
`;
