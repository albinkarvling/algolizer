import {css} from "@emotion/react";

export const container = (isMobile: boolean, isCollapsed: boolean) => css`
    --main-padding: 1.25rem;
    display: flex;
    flex-direction: column;
    color: var(--text-primary-sidebar);
    background-color: var(--background-primary-sidebar);
    height: 100dvh;
    width: var(--width-main-sidebar);
    min-width: var(--width-main-sidebar);
    transition: right 0.2s ease-in-out;
    ${isMobile
        ? css`
              position: fixed;
              top: 0;
              right: ${isCollapsed ? "100%" : "0"};
              z-index: 100;
              width: 100vw;
          `
        : ""}
`;

export const header = css`
    padding: var(--main-padding);
    border-bottom: 1px solid var(--background-accent-sidebar);
`;

export const menuButton = css`
    --self-padding: 0.5rem;
    align-self: start;
    padding: var(--self-padding);
    margin: calc(var(--main-padding) - var(--self-padding));
    margin-bottom: 0;
`;
