import {css} from "@emotion/react";

export const content = css`
    padding: var(--main-padding);

    &:not(:first-child) {
        border-top: 1px solid var(--background-accent-controls);
    }
`;

export const playbackButtons = css`
    display: flex;
    gap: 0.5rem;

    & > button {
        flex: 1;
        justify-content: center;
    }
`;

export const playbackSpeed = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const playbackSpeedSlider = css`
    width: 100%;
`;

export const playbackHelper = css`
    font-size: 0.75rem;
    width: 65px;
    text-align: right;
`;
