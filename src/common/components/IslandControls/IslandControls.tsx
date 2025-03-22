// TODO: make this component a generic component
// remove the dependency on the contexts and use props instead

import {ArrowBack, ArrowForward, Pause, PlayArrow} from "@mui/icons-material";
import {Button} from "../Button";
import * as styles from "./IslandControls.styles";
import {AnimatePresence, motion} from "framer-motion";
import {useBoard, useSidebarState} from "@game-of-life/contexts";
import {SIDEBAR_STATES} from "@game-of-life/constants";

const MIN_PLAYBACK_SPEED = 50;
const MAX_PLAYBACK_SPEED = 2000;
export function IslandControls() {
    const {state} = useSidebarState();
    const {
        setIsPlaying,
        isPlaying,
        playbackSpeed,
        setPlaybackSpeed,
        goToPreviousGeneration,
        goToNextGeneration,
    } = useBoard();

    const shouldShowIsland = state !== SIDEBAR_STATES.IDLE;
    return (
        <AnimatePresence>
            {shouldShowIsland && (
                <motion.div
                    initial={{transform: "translate(-50%, 150px)"}}
                    animate={{transform: "translate(-50%, 0)"}}
                    exit={{transform: "translate(-50%, 150px)"}}
                    css={styles.container}
                >
                    <div css={styles.playbackButtons}>
                        <Button
                            variant="text"
                            size="small"
                            onClick={goToPreviousGeneration}
                        >
                            <ArrowBack />
                        </Button>
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying ? <Pause /> : <PlayArrow />}
                        </Button>
                        <Button variant="text" size="small" onClick={goToNextGeneration}>
                            <ArrowForward />
                        </Button>
                    </div>
                    <input
                        type="range"
                        min={MIN_PLAYBACK_SPEED}
                        max={MAX_PLAYBACK_SPEED}
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
