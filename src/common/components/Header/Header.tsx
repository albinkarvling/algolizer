import {Interpolation, Theme} from "@emotion/react";
import * as styles from "./Header.styles";

export function Header({
    children,
    cssProp,
}: {
    children: React.ReactNode;
    cssProp?: Interpolation<Theme>;
}) {
    return <div css={[styles.header, cssProp]}>{children}</div>;
}
