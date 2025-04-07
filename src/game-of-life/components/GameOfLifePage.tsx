import {BoardProvider, SidebarStateProvider} from "../contexts";
import {TutorialProvider} from "@shared/contexts";
import {TUTORIAL_STEPS} from "@game-of-life/constants";
import {Tutorial} from "@shared/components";
import {GameOfLifeSidebar} from "./Sidebar";
import {GameOfLifeHeader} from "./Header";
import {GameOfLifeIslandControls} from "./IslandControls";
import {Board} from "./Board";
import * as styles from "./GameOfLifePage.styles";

export function GameOfLifePage() {
    return (
        <SidebarStateProvider>
            <TutorialProvider steps={TUTORIAL_STEPS} id="game-of-life">
                <BoardProvider>
                    <main css={styles.container}>
                        <GameOfLifeSidebar />
                        <div css={styles.content}>
                            <GameOfLifeHeader />
                            <Board />
                        </div>
                        <GameOfLifeIslandControls />
                    </main>
                    <Tutorial />
                </BoardProvider>
            </TutorialProvider>
        </SidebarStateProvider>
    );
}
