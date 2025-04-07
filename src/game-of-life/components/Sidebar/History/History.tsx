import {ArrowBack} from "@mui/icons-material";
import {useBoard, useSidebarState} from "@game-of-life/contexts";
import {getAliveCellCount, getDeadCellCount} from "@game-of-life/utils";
import {Button} from "@shared/components";
import * as styles from "./History.styles";

export function History() {
    const {currentGeneration, generationHistory, goToGeneration} = useBoard();
    const {toggleHistoryState} = useSidebarState();

    return (
        <>
            <Button
                size="small"
                cssProp={styles.backButton}
                variant="text"
                onClick={toggleHistoryState}
            >
                <ArrowBack />
                History
            </Button>
            <ul css={styles.generationList}>
                {generationHistory.map((generation, index) => {
                    const isActiveGeneration = index === currentGeneration;
                    const aliveCells = getAliveCellCount(generation);
                    const deadCells = getDeadCellCount(generation);
                    return (
                        <li style={{width: "100%"}} key={index}>
                            <Button
                                size="small"
                                variant="text"
                                cssProp={styles.generationItem(isActiveGeneration)}
                                onClick={() => goToGeneration(index)}
                            >
                                <span>Generation {index}</span>
                                <div css={styles.generationStatus}>
                                    <span>Alive: {aliveCells}</span>
                                    <span>Dead: {deadCells}</span>
                                </div>
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
