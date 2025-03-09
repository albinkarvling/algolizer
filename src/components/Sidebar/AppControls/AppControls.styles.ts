import {css} from "@emotion/react";

export const playbackButtons = css`
    display: flex;
    gap: 0.5rem;

    & > button {
        flex: 1;
    }
`;

export const label = css`
    display: block;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    opacity: 0.75;

    &:not(:first-child) {
        margin-top: 1rem;
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
