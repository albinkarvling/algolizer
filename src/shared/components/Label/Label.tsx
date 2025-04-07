import {ElementType, ComponentPropsWithoutRef} from "react";
import * as styles from "./Label.styles";
import {Interpolation, Theme} from "@emotion/react";

type Props<T extends ElementType> = {
    as?: T;
    cssProp?: Interpolation<Theme>;
} & ComponentPropsWithoutRef<T>;

export function Label<T extends ElementType = "span">({as, cssProp, ...rest}: Props<T>) {
    const Component = as || "span";

    return <Component css={[styles.label, cssProp]} {...rest} />;
}
