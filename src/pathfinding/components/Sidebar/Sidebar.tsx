import {Button, Dropdown, Sidebar} from "@common/components";
import {ALGORITHM_SELECTION} from "@pathfinding/constants/algorithmSelection";
import {useBoard} from "@pathfinding/contexts";
import * as styles from "./Sidebar.styles";
import {OBSTACLE_SELECTION} from "@pathfinding/constants/obstacles";
import {Palette} from "./Palette";
import {Lightbulb, RestartAlt} from "@mui/icons-material";
import {useTutorial} from "@common/contexts/TutorialProvider";

export function PathfindingSidebar() {
    const {resetTutorial} = useTutorial();
    const {
        currentAlgorithmId,
        switchAlgorithm,
        addObstaclePreset,
        stepIndex,
        stepCount,
        goToStep,
        resetGrid,
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
                <Palette />
                <Dropdown
                    label="Algorithm"
                    groups={ALGORITHM_SELECTION}
                    selectedId={currentAlgorithmId}
                    onSelect={(algorithm) => switchAlgorithm(algorithm.id)}
                    dropdownProps={{
                        "data-tutorial-id": "algorithm-selector",
                    }}
                />
                <Dropdown
                    label="Obstacles"
                    noSelectionLabel="Select an obstacle"
                    groups={OBSTACLE_SELECTION}
                    onSelect={(obstacle) => addObstaclePreset(obstacle.generate)}
                    dropdownProps={{
                        "data-tutorial-id": "obstacle-selector",
                    }}
                />
            </div>
            <div css={styles.footer}>
                <Button
                    cssProp={styles.footerButton}
                    onClick={resetGrid}
                    buttonProps={{
                        "data-tutorial-id": "reset-board-button",
                    }}
                >
                    <RestartAlt />
                    Reset board
                </Button>
                <Button
                    buttonProps={{
                        "data-tutorial-id": "tutorial-button",
                        "data-tooltip": "Show tutorial",
                    }}
                    onClick={resetTutorial}
                    aria-label="Show tutorial"
                >
                    <Lightbulb />
                </Button>
            </div>
        </Sidebar>
    );
}
