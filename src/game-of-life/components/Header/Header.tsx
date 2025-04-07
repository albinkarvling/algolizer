import {History} from "@mui/icons-material";
import {Button, Header} from "@shared/components";
import {useSidebarCollapsed} from "@shared/contexts";
import {useBoard, useSidebarState} from "@game-of-life/contexts";
import * as styles from "./Header.styles";

export function GameOfLifeHeader() {
    const {currentGeneration} = useBoard();
    const {toggleHistoryState} = useSidebarState();
    const {setIsCollapsed} = useSidebarCollapsed();

    return (
        <Header>
            <Button
                variant="text"
                size="small"
                onClick={() => {
                    toggleHistoryState();
                    setIsCollapsed(false);
                }}
                aria-label={`Generation: ${currentGeneration}. Click to view all generations.`}
                cssProp={styles.historyButton}
                buttonProps={{
                    "data-tutorial-id": "history-button",
                }}
            >
                <History />
                Generation: {currentGeneration}
            </Button>
        </Header>
    );
}
