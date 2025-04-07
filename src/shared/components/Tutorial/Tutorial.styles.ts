import {css} from "@emotion/react";

export const overlay = css`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9998;
    pointer-events: none;
`;

type Props = {
    position: "left" | "right" | "bottom";
    offset: number;
    isStepWithoutElement: boolean;
    isMobile: boolean;
};

export const container = ({position, offset, isStepWithoutElement, isMobile}: Props) => {
    const width = isStepWithoutElement ? "400px" : "280px";
    const arrowSize = "0.75rem";
    const showArrow = !isStepWithoutElement && !isMobile;

    const arrowBase = css`
        content: "";
        position: absolute;
        --size: ${arrowSize};
        border-left: var(--size) solid transparent;
        border-right: var(--size) solid transparent;
        border-top: var(--size) solid transparent;
        border-bottom: var(--size) solid transparent;
        margin-left: -1px;
    `;

    const arrowStyles = showArrow
        ? position === "left"
            ? css`
                  &::after {
                      ${arrowBase};
                      top: calc(${offset}px - var(--size));
                      left: 100%;
                      border-left: var(--size) solid var(--background-primary-sidebar);
                  }
              `
            : position === "right"
            ? css`
                  &::after {
                      ${arrowBase};
                      top: calc(${offset}px - var(--size));
                      left: calc(-2 * var(--size) + 1px);
                      border-right: var(--size) solid var(--background-primary-sidebar);
                  }
              `
            : css`
                  &::after {
                      ${arrowBase};
                      top: calc(-2 * var(--size));
                      left: 50%;
                      transform: translateX(calc(${offset}px - 50%));
                      border-bottom: var(--size) solid var(--background-primary-sidebar);
                  }
              `
        : null;

    return css`
        display: flex;
        flex-direction: column;
        position: fixed;
        border-radius: 0.5rem;
        color: var(--text-primary-sidebar);
        background-color: var(--background-primary-sidebar);
        width: ${width};
        height: fit-content;
        z-index: 1000;
        padding: 1rem;

        ${isMobile
            ? css`
                  width: 100%;
                  left: 0;
                  bottom: 0;
              `
            : css`
                  // prevents the tutorial from flashing in the top left corner
                  // on the initial render
                  left: -100vw;
                  top: -100vh;
              `}

        ${arrowStyles}
    `;
};

export const header = css`
    font-weight: bold;
`;
export const description = css`
    display: grid;
    gap: 0.5rem;
    color: var(--text-secondary-sidebar);
    font-size: 0.875rem;
    margin-top: 0.5rem;
    line-height: 1.25;
`;
export const buttons = css`
    display: grid;
    gap: 0.25rem;
    text-align: center;
    margin-top: 1rem;
`;
export const navigationButtons = css`
    display: flex;
    gap: 0.5rem;
`;

export const backButton = css`
    align-items: center;
    justify-content: center;
`;

export const nextButton = css`
    font-size: 0.875rem;
    justify-content: center;
    flex: 1;
`;

export const skipButton = css`
    padding: 0;
    font-size: 0.75rem;
    justify-content: center;
    color: var(--text-secondary-sidebar);
    margin-top: 0.5rem;
`;
