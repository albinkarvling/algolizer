import {ArrowBack, ArrowForward, Pause, PlayArrow} from "@mui/icons-material";
import {Button} from "../Button";
import * as styles from "./IslandControls.styles";
import {AnimatePresence, motion} from "framer-motion";
import {HTMLAttributes} from "react";

const MIN_PLAYBACK_SPEED = 50;
const MAX_PLAYBACK_SPEED = 2000;
export function IslandControls({
    onBackClick,
    onNextClick,
    onPlayToggle,
    playbackSpeed,
    onSpeedChange,
    isPlaying,
    shouldShow,
    maxPlaybackSpeed = MAX_PLAYBACK_SPEED,
    minPlaybackSpeed = MIN_PLAYBACK_SPEED,
    containerProps,
}: {
    isPlaying: boolean;
    onPlayToggle: (isPlaying: boolean) => void;
    onBackClick: () => void;
    onNextClick: () => void;
    playbackSpeed: number;
    onSpeedChange: (speed: number) => void;
    shouldShow: boolean;
    maxPlaybackSpeed?: number;
    minPlaybackSpeed?: number;
    containerProps?: Omit<
        HTMLAttributes<HTMLDivElement> & {
            [key: `data-${string}`]: string;
        },
        "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
    >;
}) {
    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    initial={{transform: "translate(-50%, 150px)"}}
                    animate={{transform: "translate(-50%, 0)"}}
                    exit={{transform: "translate(-50%, 150px)"}}
                    css={styles.container}
                    {...containerProps}
                >
                    <div css={styles.playbackButtons}>
                        <Button variant="text" size="small" onClick={onBackClick}>
                            <ArrowBack />
                        </Button>
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => onPlayToggle(!isPlaying)}
                        >
                            {isPlaying ? <Pause /> : <PlayArrow />}
                        </Button>
                        <Button variant="text" size="small" onClick={onNextClick}>
                            <ArrowForward />
                        </Button>
                    </div>
                    <input
                        type="range"
                        min={minPlaybackSpeed}
                        max={maxPlaybackSpeed}
                        value={playbackSpeed}
                        onChange={(e) => onSpeedChange(Number(e.target.value))}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
