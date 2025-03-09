import {JSX} from "react";
import {RestartAlt, History as HistoryIcon} from "@mui/icons-material";
import {SIDEBAR_STATES} from "../../constants";
import {useSidebarState} from "../../contexts/SidebarStateProvider/SidebarStateProvider";
import {AppControls} from "./AppControls";
import * as styles from "./Sidebar.styles";
import {History} from "./History";
import {Button} from "../Button";
import {useBoard} from "../../contexts";

export function Sidebar() {
    const {updateGrid} = useBoard();
    const {state, toggleHistoryState} = useSidebarState();

    let sidebarContent: JSX.Element | null = null;
    switch (state) {
        case SIDEBAR_STATES.IDLE:
            sidebarContent = <AppControls />;
            break;
        case SIDEBAR_STATES.HISTORY:
            sidebarContent = <History />;
    }
    return (
        <div css={styles.container}>
            <h1 css={styles.header}>The Game of Life</h1>
            <div css={styles.content}>{sidebarContent}</div>
            <div css={styles.footer(state === SIDEBAR_STATES.IDLE)}>
                <Button onClick={updateGrid}>
                    <RestartAlt />
                    Reset board
                </Button>
                <Button onClick={toggleHistoryState}>
                    <HistoryIcon />
                </Button>
            </div>
        </div>
    );
}
