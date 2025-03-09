import {History} from "@mui/icons-material";
import {useBoard} from "../../contexts";
import {Button} from "../Button";
import * as styles from "./Header.styles";
import {useSidebarState} from "../../contexts/SidebarStateProvider/SidebarStateProvider";

export function Header() {
    const {currentGeneration} = useBoard();
    const {toggleHistoryState} = useSidebarState();

    return (
        <div css={styles.header}>
            <div css={styles.currentGeneration}>
                <Button variant="text" size="small" onClick={toggleHistoryState}>
                    <History />
                    Generation: {currentGeneration}
                </Button>
            </div>
        </div>
    );
}
