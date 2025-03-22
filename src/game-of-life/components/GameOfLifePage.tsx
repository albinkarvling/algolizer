import {IslandControls} from "@common/components/IslandControls";
import {BoardProvider, SidebarStateProvider} from "../contexts";
import {GameOfLifeSidebar} from "./Sidebar";
import {Board} from "./Board";
import {Header} from "./Header";
import * as styles from "./GameOfLifePage.styles";

export function GameOfLifePage() {
    return (
        <SidebarStateProvider>
            <BoardProvider>
                <div css={styles.wrapper}>
                    <GameOfLifeSidebar />
                    <main style={{flex: 1, display: "flex", flexDirection: "column"}}>
                        <Header />
                        <Board />
                    </main>
                    <IslandControls />
                </div>
            </BoardProvider>
        </SidebarStateProvider>
    );
}
