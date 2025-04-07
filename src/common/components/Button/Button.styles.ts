import {css} from "@emotion/react";
import {ButtonProps} from "./Button";

const getBackgroundColor = (variant: ButtonProps["variant"]) => {
    switch (variant) {
        case "primary":
            return "var(--background-accent-controls)";
        case "text":
            return "transparent";
        default:
            return "transparent";
    }
};
const getHoverBackgroundColor = (variant: ButtonProps["variant"]) => {
    switch (variant) {
        case "primary":
            return "var(--background-accent-hover-controls)";
        case "text":
            return "var(--background-accent-controls)";
        default:
            return "transparent";
    }
};

export const button = (variant: ButtonProps["variant"], size: ButtonProps["size"]) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: ${size === "small" ? "0.5rem" : "0.75rem"};
    border-radius: 6px;
    background-color: ${getBackgroundColor(variant)};
    transition: background-color 0.2s;
    color: var(--text-controls);
    font-size: 1rem;

    &:hover {
        background-color: ${getHoverBackgroundColor(variant)};
        text-decoration: ${variant === "ghost" ? "underline" : "none"};
    }
`;
