import {History} from "@mui/icons-material";
import {useBoard} from "../../contexts";
import {Button} from "../Button";
import * as styles from "./Header.styles";
import {useSidebarState} from "../../contexts";

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
