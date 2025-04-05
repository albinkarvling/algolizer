import * as Algorithms from "@pathfinding/algorithms";
import {AlgorithmFn, AlgorithmId} from "@pathfinding/algorithms/types";
import {useState} from "react";

const DEFAULT_ALGORITHM_ID = "dijkstra";
const DEFAULT_ALGORITHM_FN = Algorithms.dijkstra;
export function useAlgorithmSelection() {
    const [currentAlgorithm, setCurrentAlgorithm] = useState<{
        id: AlgorithmId;
        algorithmFn: AlgorithmFn;
    }>({
        id: DEFAULT_ALGORITHM_ID,
        algorithmFn: DEFAULT_ALGORITHM_FN,
    });

    const switchAlgorithm = (algorithmId: AlgorithmId) => {
        setCurrentAlgorithm({
            id: algorithmId,
            algorithmFn: Algorithms[algorithmId],
        });
    };

    return {
        currentAlgorithm,
        switchAlgorithm,
    };
}
