import {useEffect, useState} from "react";

const DEFAULT_PLAYBACK_SPEED = 300;
export function usePlaying(
    onTickCallback: () => void,
    hasReachedEnd: boolean,
    isPlaying: boolean,
) {
    const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_PLAYBACK_SPEED);

    useEffect(() => {
        if (!isPlaying || hasReachedEnd) return;

        const interval = setInterval(onTickCallback, playbackSpeed);
        return () => clearInterval(interval);
    }, [isPlaying, playbackSpeed, onTickCallback, hasReachedEnd]);

    return {setPlaybackSpeed, playbackSpeed};
}
