import {IslandControls} from "@common/components";
import {SIDEBAR_STATES} from "@game-of-life/constants";
import {useBoard, useSidebarState} from "@game-of-life/contexts";

export function GameOfLifeIslandControls() {
    const {state} = useSidebarState();
    const {
        goToNextGeneration,
        goToPreviousGeneration,
        setIsPlaying,
        isPlaying,
        playbackSpeed,
        setPlaybackSpeed,
    } = useBoard();

    const shouldShow = state !== SIDEBAR_STATES.IDLE;
    return (
        <IslandControls
            isPlaying={isPlaying}
            onNextClick={goToNextGeneration}
            onBackClick={goToPreviousGeneration}
            onPlayToggle={setIsPlaying}
            playbackSpeed={playbackSpeed}
            onSpeedChange={setPlaybackSpeed}
            shouldShow={shouldShow}
        />
    );
}
