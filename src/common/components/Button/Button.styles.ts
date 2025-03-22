import {css} from "@emotion/react";
import {ButtonProps} from "./Button";

export const button = (variant: ButtonProps["variant"], size: ButtonProps["size"]) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: ${size === "small" ? "0.5rem" : "0.75rem"};
    border-radius: 6px;
    background-color: ${variant !== "text"
        ? "var(--background-accent-controls)"
        : "transparent"};
    transition: background-color 0.2s;
    color: var(--text-controls);
    font-size: 1rem;

    &:hover {
        background-color: ${variant !== "text"
            ? "var(--background-accent-hover-controls)"
            : "var(--background-accent-controls)"};
    }
`;
