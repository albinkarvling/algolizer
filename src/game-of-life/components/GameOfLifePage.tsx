import {BoardProvider, SidebarStateProvider} from "../contexts";
import {GameOfLifeSidebar} from "./Sidebar";
import {Board} from "./Board";
import {GameOfLifeHeader} from "./Header";
import {GameOfLifeIslandControls} from "./IslandControls";

export function GameOfLifePage() {
    return (
        <SidebarStateProvider>
            <BoardProvider>
                <GameOfLifeSidebar />
                <main style={{flex: 1, display: "flex", flexDirection: "column"}}>
                    <GameOfLifeHeader />
                    <Board />
                </main>
                <GameOfLifeIslandControls />
            </BoardProvider>
        </SidebarStateProvider>
    );
}
