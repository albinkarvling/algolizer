import {css} from "@emotion/react";

export const content = css`
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
