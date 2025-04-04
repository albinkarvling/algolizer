import {ArrowBack, Pause, PlayArrow, ArrowForward} from "@mui/icons-material";
import {Button, Dropdown} from "@common/components";
import {DROPDOWN_PRESETS} from "@game-of-life/constants";
import {useBoard} from "@game-of-life/contexts";
import * as styles from "./AppControls.styles";

const MIN_PLAYBACK_SPEED = 50;
const MAX_PLAYBACK_SPEED = 2000;
export function AppControls() {
    const {
        goToNextGeneration,
        goToPreviousGeneration,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
        activatePreset,
        activePreset,
    } = useBoard();

    return (
        <>
            <div css={styles.content}>
                <span css={styles.label}>Playback Controls</span>
                <div css={styles.playbackButtons}>
                    <Button size="small" onClick={goToPreviousGeneration}>
                        <ArrowBack fontSize="medium" />
                    </Button>
                    <Button size="small" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? (
                            <Pause fontSize="medium" />
                        ) : (
                            <PlayArrow fontSize="medium" />
                        )}
                    </Button>
                    <Button size="small" onClick={goToNextGeneration}>
                        <ArrowForward fontSize="medium" />
                    </Button>
                </div>
                <label htmlFor="playback-speed" css={styles.label}>
                    Playback Speed
                </label>
                <div css={styles.playbackSpeed}>
                    <input
                        id="playback-speed"
                        type="range"
                        min={MIN_PLAYBACK_SPEED}
                        max={MAX_PLAYBACK_SPEED}
                        value={playbackSpeed}
                        step={50}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        css={styles.playbackSpeedSlider}
                    />
                    <span css={styles.playbackHelper}>{playbackSpeed}ms</span>
                </div>
            </div>
            <div css={styles.content}>
                <Dropdown
                    label="Presets"
                    selectedId={activePreset}
                    groups={DROPDOWN_PRESETS}
                    onSelect={(preset) => activatePreset(preset.id)}
                />
            </div>
        </>
    );
}
