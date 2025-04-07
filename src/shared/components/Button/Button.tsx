import {HTMLAttributes} from "react";
import {Interpolation, Theme} from "@emotion/react";
import * as styles from "./Button.styles";
import {Link} from "react-router";

export type ButtonProps = {
    children: React.ReactNode;
    cssProp?: Interpolation<Theme>;
    onClick?: () => void;
    variant?: "primary" | "text" | "ghost";
    size?: "small" | "large";
    href?: string;
    buttonProps?: HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & {
        [key: `data-${string}`]: string;
    };
};

export function Button({
    children,
    cssProp,
    onClick,
    size,
    variant = "primary",
    href,
    buttonProps,
}: ButtonProps) {
    const commonProps = {
        css: [styles.button(variant, size), cssProp],
        onClick,
        ...buttonProps,
    };

    if (href) {
        return (
            <Link {...commonProps} to={href}>
                {children}
            </Link>
        );
    }

    return <button {...commonProps}>{children}</button>;
}
