import {ArrowBack, ArrowForward, Pause, PlayArrow} from "@mui/icons-material";
import {Button} from "../Button";
import * as styles from "./IslandControls.styles";
import {HTMLAttributes} from "react";
import {useKeyboardControls} from "@common/hooks";

type Props = {
    isPlaying: boolean;
    onPlayToggle: (isPlaying: boolean) => void;
    onBackClick: () => void;
    onNextClick: () => void;
    playbackSpeed: number;
    onSpeedChange: (speed: number) => void;
    playbackLabel: string;
    maxPlaybackSpeed?: number;
    minPlaybackSpeed?: number;
    containerProps?: HTMLAttributes<HTMLDivElement> & {
        [key: `data-${string}`]: string;
    };
};

const MIN_PLAYBACK_SPEED = 50;
const MAX_PLAYBACK_SPEED = 2000;
export function IslandControls({
    onBackClick,
    onNextClick,
    onPlayToggle,
    playbackSpeed,
    onSpeedChange,
    isPlaying,
    maxPlaybackSpeed = MAX_PLAYBACK_SPEED,
    minPlaybackSpeed = MIN_PLAYBACK_SPEED,
    playbackLabel,
    containerProps,
}: Props) {
    useKeyboardControls({
        onForward: onNextClick,
        onBackward: onBackClick,
        onSpace: () => onPlayToggle(!isPlaying),
    });

    return (
        <div css={styles.container} {...containerProps}>
            <div css={styles.playbackButtons}>
                <Button
                    variant="text"
                    size="small"
                    onClick={onBackClick}
                    buttonProps={{
                        "aria-label": "Go back",
                        "data-tooltip": "Go back",
                    }}
                >
                    <ArrowBack />
                </Button>
                <Button
                    variant="text"
                    size="small"
                    onClick={() => onPlayToggle(!isPlaying)}
                    buttonProps={{
                        "aria-label": isPlaying ? "Pause" : "Play",
                        "data-tooltip": isPlaying ? "Pause" : "Play",
                    }}
                >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </Button>
                <Button
                    variant="text"
                    size="small"
                    onClick={onNextClick}
                    buttonProps={{
                        "aria-label": "Go forward",
                        "data-tooltip": "Go forward",
                    }}
                >
                    <ArrowForward />
                </Button>
            </div>
            <input
                type="range"
                min={minPlaybackSpeed}
                max={maxPlaybackSpeed}
                value={playbackSpeed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                aria-label={playbackLabel}
                data-tooltip={playbackLabel}
            />
        </div>
    );
}
