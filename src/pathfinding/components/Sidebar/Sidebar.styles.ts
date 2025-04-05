import {css} from "@emotion/react";
import {PaletteBrush} from "@pathfinding/types";

export const content = css`
    display: grid;
    gap: 1rem;
    padding: var(--main-padding);

    &:not(:first-child) {
        border-top: 1px solid var(--background-accent-sidebar);
    }
`;

export const playbackTimeline = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const label = css`
    display: block;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 0.75;
`;

export const paletteContainer = css`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;
export const paletteItem = (
    brushType: PaletteBrush,
    active: boolean,
    disabled: boolean,
) => css`
    background-color: var(--tile-${brushType});
    border: ${active
        ? "1px solid var(--background-accent-sidebar)"
        : "1px solid transparent"};
    width: 2rem;
    aspect-ratio: 1;
    border-radius: 0.25rem;
    cursor: pointer;
    display: grid;
    place-items: center;
    ${disabled &&
    css`
        cursor: not-allowed;
        opacity: 0.4;
    `}

    input[type="radio"] {
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;
        pointer-events: none;
    }
`;
export const paletteIcon = css`
    font-size: 1.25rem;
`;
