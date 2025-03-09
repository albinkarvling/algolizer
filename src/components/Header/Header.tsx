import {History} from "@mui/icons-material";
import {useBoard} from "../../contexts";
import {Button} from "../Button";
import * as styles from "./Header.styles";

export function Header() {
    const {currentGeneration} = useBoard();

    return (
        <div css={styles.header}>
            <div css={styles.currentGeneration}>
                <Button variant="text" size="small">
                    <History />
                    Generation: {currentGeneration}
                </Button>
            </div>
        </div>
    );
}
