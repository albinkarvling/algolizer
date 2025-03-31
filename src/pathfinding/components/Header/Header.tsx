import {Header} from "@common/components";
import {Flag, Navigation} from "@mui/icons-material";
import * as styles from "./Header.styles";

export function PathfindingHeader() {
    return (
        <Header cssProp={styles.content}>
            <div css={styles.row}>
                <Navigation sx={{rotate: "90deg"}} />
                <span>Start Tile</span>
            </div>
            <div css={styles.row}>
                <Flag />
                <span>End Tile</span>
            </div>
            <div css={styles.row}>
                <div css={styles.unvisitedTile} />
                <span>Unvisited Tile</span>
            </div>
            <div css={styles.row}>
                <div css={styles.visitedTile} />
                <span>Visited Tile</span>
            </div>
            <div css={styles.row}>
                <div css={styles.shortestPath}></div>
                <span>Shortest Path Tile</span>
            </div>
            <div css={styles.row}>
                <div css={styles.wallTile}></div>
                <span>Wall Tile</span>
            </div>
        </Header>
    );
}
