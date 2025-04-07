import {Header} from "@common/components";
import {Flag, Navigation} from "@mui/icons-material";
import * as styles from "./Header.styles";
import {GRASS_WEIGHT, MUD_WEIGHT} from "@pathfinding/constants";

export function PathfindingHeader() {
    return (
        <Header
            cssProp={styles.content}
            containerProps={{
                "data-tutorial-id": "pathfinding-header",
            }}
        >
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
            <div css={styles.row}>
                <div css={styles.grassTile}>{GRASS_WEIGHT}</div>
                <span>Grass Tile</span>
            </div>
            <div css={styles.row}>
                <div css={styles.mudTile}>{MUD_WEIGHT}</div>
                <span>Mud Tile</span>
            </div>
        </Header>
    );
}
