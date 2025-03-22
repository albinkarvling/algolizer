import {JSX} from "react";
import {RestartAlt, History as HistoryIcon} from "@mui/icons-material";
import {AppControls} from "./AppControls";
import * as styles from "./Sidebar.styles";
import {History} from "./History";
import {Sidebar, Button} from "@common/components";
import {useBoard, useSidebarState} from "@game-of-life/contexts";
import {SIDEBAR_STATES} from "@game-of-life/constants";

export function GameOfLifeSidebar() {
    const {resetGrid} = useBoard();
    const {state, toggleHistoryState} = useSidebarState();

    let sidebarContent: JSX.Element | null = null;
    switch (state) {
        case SIDEBAR_STATES.IDLE:
            sidebarContent = <AppControls />;
            break;
        case SIDEBAR_STATES.HISTORY:
            sidebarContent = <History />;
            break;
        default:
            sidebarContent = <AppControls />;
    }
    return (
        <Sidebar>
            <div css={styles.content}>{sidebarContent}</div>
            <div css={styles.footer(state === SIDEBAR_STATES.IDLE)}>
                {/* arrow callback to prevent event being passed */}
                <Button onClick={() => resetGrid()}>
                    <RestartAlt />
                    Reset board
                </Button>
                <Button onClick={toggleHistoryState}>
                    <HistoryIcon />
                </Button>
            </div>
        </Sidebar>
    );
}
