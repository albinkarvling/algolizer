import {PaletteBrush} from "@pathfinding/types";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useBoard} from "../BoardProvider";
import {SUPPORTS_WEIGHTS} from "@pathfinding/constants";

const BrushContext = createContext<{
    currentBrush: PaletteBrush;
    setCurrentBrush: (brush: PaletteBrush) => void;
    weightsAreDisabled: boolean;
} | null>(null);

export const useBrush = () => {
    const context = useContext(BrushContext);
    if (!context) {
        throw new Error("useBrush must be used within a BrushProvider");
    }
    return context;
};

export function BrushProvider({children}: {children: React.ReactNode}) {
    const {currentAlgorithmId} = useBoard();
    const [currentBrush, setCurrentBrush] = useState<PaletteBrush>("wall");

    const weightsAreDisabled = useMemo(
        () => !SUPPORTS_WEIGHTS.includes(currentAlgorithmId),
        [currentAlgorithmId],
    );

    useEffect(() => {
        if (weightsAreDisabled) {
            setCurrentBrush("wall");
        }
    }, [weightsAreDisabled]);

    const value = {
        currentBrush,
        setCurrentBrush,
        weightsAreDisabled,
    };
    return <BrushContext.Provider value={value}>{children}</BrushContext.Provider>;
}
