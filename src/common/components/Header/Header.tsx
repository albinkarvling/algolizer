import * as styles from "./Header.styles";

export function Header({children}: {children: React.ReactNode}) {
    return <div css={styles.header}>{children}</div>;
}
