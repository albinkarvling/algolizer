import {Dropdown, Sidebar} from "@common/components";
import {ALGORITHM_SELECTION} from "@pathfinding/constants/algorithmSelection";
import {useBoard} from "@pathfinding/contexts";
import * as styles from "./Sidebar.styles";
import {OBSTACLE_SELECTION} from "@pathfinding/constants/obstacles";

export function PathfindingSidebar() {
    const {
        currentAlgorithmId,
        switchAlgorithm,
        addObstaclePreset,
        stepIndex,
        stepCount,
        goToStep,
    } = useBoard();

    return (
        <Sidebar>
            <div css={[styles.content, styles.playbackTimeline]}>
                <label htmlFor="playback-timeline" css={styles.label}>
                    Playback Timeline
                </label>
                <input
                    id="playback-timeline"
                    type="range"
                    min={0}
                    max={stepCount}
                    value={stepIndex}
                    onChange={(e) => goToStep(Number(e.target.value))}
                />
            </div>
            <div css={styles.content}>
                <Dropdown
                    label="Algorithm"
                    groups={[{items: ALGORITHM_SELECTION}]}
                    selectedId={currentAlgorithmId}
                    onSelect={(algorithm) => switchAlgorithm(algorithm.id)}
                />
                <Dropdown
                    label="Obstacles"
                    noSelectionLabel="Select an obstacle"
                    groups={OBSTACLE_SELECTION}
                    onSelect={(obstacle) => addObstaclePreset(obstacle.generate)}
                />
            </div>
        </Sidebar>
    );
}
