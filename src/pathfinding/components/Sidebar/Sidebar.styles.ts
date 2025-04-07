import {css} from "@emotion/react";

export const content = css`
    display: grid;
    gap: 1rem;
    padding: var(--main-padding);

    &:not(:first-child) {
        border-top: 1px solid var(--background-accent-sidebar);
    }
`;

export const footer = css`
    flex: 1;
    display: flex;
    align-items: end;
    gap: 0.75rem;
    padding: var(--main-padding);
`;

export const footerButton = css`
    width: 100%;
`;
