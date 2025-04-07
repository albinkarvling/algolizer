import {IslandControls} from "@common/components";
import {useBoard} from "@pathfinding/contexts";

export function PathfindingIslandControls() {
    const {
        isPlaying,
        setIsPlaying,
        goToPrevStep,
        goToNextStep,
        goToStep,
        stepIndex,
        stepCount,
    } = useBoard();

    return (
        <IslandControls
            minPlaybackSpeed={0}
            maxPlaybackSpeed={stepCount}
            playbackSpeed={stepIndex}
            onSpeedChange={goToStep}
            onBackClick={goToPrevStep}
            onNextClick={goToNextStep}
            onPlayToggle={setIsPlaying}
            isPlaying={isPlaying}
            playbackLabel="Playback"
            containerProps={{
                "data-tutorial-id": "island-controls",
            }}
        />
    );
}
