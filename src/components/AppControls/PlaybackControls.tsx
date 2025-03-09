import {useEffect, useRef, useState} from "react";
import {useBoard} from "../../contexts";
import {ArrowBack, ArrowForward, Pause, PlayArrow} from "@mui/icons-material";
import * as styles from "./PlaybackControls.styles";
import {Button} from "../Button";

const DEFAULT_PLAYBACK_SPEED = 300;
const MIN_PLAYBACK_SPEED = 50;
const MAX_PLAYBACK_SPEED = 2000;
export function PlaybackControls() {
    const {goToNextGeneration, goToPreviousGeneration} = useBoard();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_PLAYBACK_SPEED);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isPlaying) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            return;
        }

        intervalRef.current = setInterval(goToNextGeneration, playbackSpeed);
        return () => clearInterval(intervalRef.current!);
    }, [isPlaying, playbackSpeed, goToNextGeneration]);

    return (
        <div css={styles.playbackControls}>
            <div>
                <span css={styles.label}>Playback Controls</span>
                <div css={styles.playbackButtons}>
                    <Button size="small" onClick={goToPreviousGeneration}>
                        <ArrowBack fontSize="medium" />
                    </Button>
                    <Button
                        size="small"
                        onClick={() => setIsPlaying((prevPlaying) => !prevPlaying)}
                    >
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
