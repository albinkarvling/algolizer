import {Interpolation, Theme} from "@emotion/react";
import * as styles from "./Button.styles";

export type ButtonProps = {
    children: React.ReactNode;
    css?: Interpolation<Theme>;
    onClick?: () => void;
    variant?: "primary" | "text";
    size?: "small" | "large";
};

export function Button({children, css, onClick, size, variant}: ButtonProps) {
    return (
        <button css={[styles.button(variant, size), css]} onClick={onClick}>
            {children}
        </button>
    );
}
