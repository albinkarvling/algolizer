import {BoardProvider} from "../contexts";
import {AppControls} from "./AppControls";
import {Board} from "./Board";
import {Header} from "./Header";
import * as styles from "./MainPage.styles";

export function MainPage() {
    return (
        <BoardProvider>
            <div css={styles.wrapper}>
                <AppControls />
                <main style={{width: "100%", height: "100%"}}>
                    <Header />
                    <Board />
                </main>
            </div>
        </BoardProvider>
    );
}
