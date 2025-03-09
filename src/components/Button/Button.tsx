import {Interpolation, Theme} from "@emotion/react";
import * as styles from "./Button.styles";

export type ButtonProps = {
    children: React.ReactNode;
    cssProp?: Interpolation<Theme>;
    onClick?: () => void;
    variant?: "primary" | "text";
    size?: "small" | "large";
};

export function Button({children, cssProp, onClick, size, variant}: ButtonProps) {
    return (
        <button
            className=""
            css={[styles.button(variant, size), cssProp]}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
