import {Interpolation, Theme} from "@emotion/react";
import * as styles from "./Button.styles";
import {Link} from "react-router";

export type ButtonProps = {
    children: React.ReactNode;
    cssProp?: Interpolation<Theme>;
    onClick?: () => void;
    variant?: "primary" | "text";
    size?: "small" | "large";
    href?: string;
};

export function Button({children, cssProp, onClick, size, variant, href}: ButtonProps) {
    const commonProps = {
        css: [styles.button(variant, size), cssProp],
        onClick,
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
