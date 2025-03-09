import * as styles from "./AppControls.styles";
import {PlaybackControls} from "./PlaybackControls";

export function AppControls() {
    return (
        <header css={styles.container}>
            <h1 css={styles.header}>The Game of Life</h1>
            <div css={styles.content}>
                <PlaybackControls />
            </div>
        </header>
    );
}
