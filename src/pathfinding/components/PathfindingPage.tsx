import "./Pathfinding.css";
import {Tutorial} from "@shared/components";
import {TutorialProvider} from "@shared/contexts";
import {BoardProvider, BrushProvider} from "@pathfinding/contexts";
import {PATH_FINDING_TUTORIAL_STEPS} from "@pathfinding/constants";
import {PathfindingIslandControls} from "./IslandControls";
import {PathfindingSidebar} from "./Sidebar";
import {PathfindingHeader} from "./Header";
import {Board} from "./Board";
import * as styles from "./PathfindingPage.styles";

export function PathfindingPage() {
    return (
        <TutorialProvider steps={PATH_FINDING_TUTORIAL_STEPS} id="pathfinding">
            <BoardProvider>
                <BrushProvider>
                    <main css={styles.container}>
                        <PathfindingSidebar />
                        <div>
                            <PathfindingHeader />
                            <Board />
                        </div>
                        <PathfindingIslandControls />
                    </main>
                    <Tutorial />
                </BrushProvider>
            </BoardProvider>
        </TutorialProvider>
    );
}
