import {useBoard} from "../../contexts";
import {ArrowBack, ArrowForward, Pause, PlayArrow} from "@mui/icons-material";
import * as styles from "./PlaybackControls.styles";
import {Button} from "../Button";

const MIN_PLAYBACK_SPEED = 50;
const MAX_PLAYBACK_SPEED = 2000;
export function PlaybackControls() {
    const {
        goToNextGeneration,
        goToPreviousGeneration,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
    } = useBoard();

    return (
        <div css={styles.playbackControls}>
            <div>
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
            </div>
            <div>
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
        </div>
    );
}
