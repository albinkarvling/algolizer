import {History} from "@mui/icons-material";
import {Button} from "@common/components";
import {useBoard, useSidebarState} from "@game-of-life/contexts";
import * as styles from "./Header.styles";

export function Header() {
    const {currentGeneration} = useBoard();
    const {toggleHistoryState} = useSidebarState();

    return (
        <div css={styles.header}>
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
        </div>
    );
}
