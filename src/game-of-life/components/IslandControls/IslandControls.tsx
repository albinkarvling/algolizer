import {IslandControls} from "@common/components";
import {useBoard} from "@game-of-life/contexts";

export function GameOfLifeIslandControls() {
    const {
        goToNextGeneration,
        goToPreviousGeneration,
        setIsPlaying,
        isPlaying,
        playbackSpeed,
        setPlaybackSpeed,
    } = useBoard();

    return (
        <IslandControls
            isPlaying={isPlaying}
            onNextClick={goToNextGeneration}
            onBackClick={goToPreviousGeneration}
            onPlayToggle={setIsPlaying}
            playbackSpeed={playbackSpeed}
            onSpeedChange={setPlaybackSpeed}
            playbackLabel="Playback speed"
            containerProps={{
                "data-tutorial-id": "playback-controls",
            }}
        />
    );
}
