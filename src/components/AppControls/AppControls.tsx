import {History, RestartAlt} from "@mui/icons-material";
import {Button} from "../Button";
import * as styles from "./AppControls.styles";
import {PlaybackControls} from "./PlaybackControls";
import {useBoard} from "../../contexts";

export function AppControls() {
    const {updateGrid} = useBoard();

    return (
        <header css={styles.container}>
            <h1 css={styles.header}>The Game of Life</h1>
            <div css={styles.content}>
                <PlaybackControls />
            </div>
            <div css={styles.footer}>
                <Button onClick={updateGrid}>
                    <RestartAlt />
                    Reset board
                </Button>
                <Button>
                    <History />
                </Button>
            </div>
        </header>
    );
}
