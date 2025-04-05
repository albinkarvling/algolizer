import {useSyncedRef} from "@common/hooks";
import {Step} from "@pathfinding/types";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";

export function useVisualizerController(
    steps: Step[],
    isPlaying: boolean,
    setIsPlaying: (isPlaying: boolean) => void,
    playbackSpeed: number,
) {
    const [stepIndex, setStepIndex] = useState(0);
    const currentStepIndex = useSyncedRef(stepIndex);
    const currentStepCount = useSyncedRef(steps.length);
    const intervalRef = useRef<number | undefined>(undefined);

    const goToNextStep = useCallback(
        (isAutoPlay?: boolean) => {
            setStepIndex((prevIndex) => {
                if (prevIndex >= steps.length) return prevIndex;
                return prevIndex + 1;
            });
            if (!isAutoPlay) setIsPlaying(false);
        },
        [setIsPlaying, setStepIndex, steps.length],
    );

    const goToPrevStep = useCallback(() => {
        setStepIndex((prevIndex) => {
            if (prevIndex <= 0) return prevIndex;
            return prevIndex - 1;
        });
        setIsPlaying(false);
    }, [setStepIndex, setIsPlaying]);

    const hasReachedEnd = useMemo(
        () => stepIndex === steps.length,
        [stepIndex, steps.length],
    );

    useEffect(() => {
        if (!isPlaying) return;
        if (hasReachedEnd) {
            setIsPlaying(false);
            return;
        }

        intervalRef.current = setInterval(() => goToNextStep(true), playbackSpeed);

        return () => clearInterval(intervalRef.current);
    }, [goToNextStep, isPlaying, playbackSpeed, hasReachedEnd, setIsPlaying]);

    const reset = useCallback(() => setStepIndex(0), []);
    const goToEndStep = useCallback(
        () => setStepIndex(currentStepCount.current),
        [currentStepCount],
    );
    const goToStep = useCallback((index: number) => setStepIndex(index), []);

    return {
        currentStepIndex,
        stepIndex,
        goToNextStep,
        goToPrevStep,
        goToStep,
        reset,
        goToEndStep,
        canStepForward: stepIndex < steps.length,
        canStepBack: stepIndex > 0,
        hasReachedEnd,
    };
}
