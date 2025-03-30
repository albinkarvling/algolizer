import {IslandControls} from "@common/components";
import {useBoard} from "@pathfinding/contexts";

export function PathfindingIslandControls() {
    const {
        isPlaying,
        setIsPlaying,
        goToPrevStep,
        goToNextStep,
        playbackSpeed,
        setPlaybackSpeed,
    } = useBoard();

    return (
        <IslandControls
            minPlaybackSpeed={0}
            maxPlaybackSpeed={500}
            onBackClick={goToPrevStep}
            onNextClick={goToNextStep}
            onSpeedChange={setPlaybackSpeed}
            onPlayToggle={setIsPlaying}
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
            shouldShow
        />
    );
}
