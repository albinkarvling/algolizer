import {PathfindingHeader} from "./Header";
import {Board} from "./Board";
import "./Pathfinding.css";
import {BoardProvider, BrushProvider} from "@pathfinding/contexts";
import {PathfindingIslandControls} from "./IslandControls";
import {PathfindingSidebar} from "./Sidebar";
import {Tutorial} from "@common/components";
import {PATH_FINDING_TUTORIAL_STEPS} from "@pathfinding/constants";
import {TutorialProvider} from "@common/contexts/TutorialProvider";

export function PathfindingPage() {
    return (
        <TutorialProvider steps={PATH_FINDING_TUTORIAL_STEPS} id="pathfinding">
            <BoardProvider>
                <BrushProvider>
                    <PathfindingSidebar />
                    <main>
                        <PathfindingHeader />
                        <Board />
                        <PathfindingIslandControls />
                    </main>
                    <Tutorial />
                </BrushProvider>
            </BoardProvider>
        </TutorialProvider>
    );
}
