import {BoardProvider, SidebarStateProvider} from "../contexts";
import {GameOfLifeSidebar} from "./Sidebar";
import {Board} from "./Board";
import {GameOfLifeHeader} from "./Header";
import {GameOfLifeIslandControls} from "./IslandControls";
import {TutorialProvider} from "@common/contexts/TutorialProvider";
import {TUTORIAL_STEPS} from "@game-of-life/constants";
import {Tutorial} from "@common/components";

export function GameOfLifePage() {
    return (
        <SidebarStateProvider>
            <TutorialProvider steps={TUTORIAL_STEPS} id="game-of-life">
                <BoardProvider>
                    <GameOfLifeSidebar />
                    <main style={{flex: 1, display: "flex", flexDirection: "column"}}>
                        <GameOfLifeHeader />
                        <Board />
                    </main>
                    <GameOfLifeIslandControls />
                    <Tutorial />
                </BoardProvider>
            </TutorialProvider>
        </SidebarStateProvider>
    );
}
