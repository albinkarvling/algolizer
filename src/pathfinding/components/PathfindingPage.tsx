import {PathfindingHeader} from "./Header";
import {Board} from "./Board";
import "./Pathfinding.css";
import {BoardProvider, BrushProvider} from "@pathfinding/contexts";
import {PathfindingIslandControls} from "./IslandControls";
import {PathfindingSidebar} from "./Sidebar";

export function PathfindingPage() {
    return (
        <BoardProvider>
            <BrushProvider>
                <PathfindingSidebar />
                <main>
                    <PathfindingHeader />
                    <Board />
                    <PathfindingIslandControls />
                </main>
            </BrushProvider>
        </BoardProvider>
    );
}
