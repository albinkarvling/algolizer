import {LabelHTMLAttributes} from "react";
import * as styles from "./Label.styles";
import {Interpolation, Theme} from "@emotion/react";

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
    cssProp?: Interpolation<Theme>;
};

export function Label({children, cssProp, ...rest}: Props) {
    return (
        <label css={[styles.label, cssProp]} {...rest}>
            {children}
        </label>
    );
}
