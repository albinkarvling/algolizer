import {IslandControls} from "@common/components/IslandControls";
import {BoardProvider, SidebarStateProvider} from "../contexts";
import {GameOfLifeSidebar} from "./Sidebar";
import {Board} from "./Board";
import {GameOfLifeHeader} from "./Header";

export function GameOfLifePage() {
    return (
        <SidebarStateProvider>
            <BoardProvider>
                <GameOfLifeSidebar />
                <main style={{flex: 1, display: "flex", flexDirection: "column"}}>
                    <GameOfLifeHeader />
                    <Board />
                </main>
                <IslandControls />
            </BoardProvider>
        </SidebarStateProvider>
    );
}
