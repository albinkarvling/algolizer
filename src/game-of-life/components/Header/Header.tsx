import {History} from "@mui/icons-material";
import {Button, Header} from "@common/components";
import {useBoard, useSidebarState} from "@game-of-life/contexts";
import * as styles from "./Header.styles";

export function GameOfLifeHeader() {
    const {currentGeneration} = useBoard();
    const {toggleHistoryState} = useSidebarState();

    return (
        <Header>
            <div css={styles.currentGeneration}>
                <Button
                    variant="text"
                    size="small"
                    onClick={toggleHistoryState}
                    aria-label={`Generation: ${currentGeneration}. Click to view all generations.`}
                >
                    <History />
                    Generation: {currentGeneration}
                </Button>
            </div>
        </Header>
    );
}
