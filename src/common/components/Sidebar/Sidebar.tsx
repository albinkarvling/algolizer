import * as styles from "./Sidebar.styles";

export function Sidebar({children}: {children: React.ReactNode}) {
    return <aside css={styles.container}>{children}</aside>;
}
