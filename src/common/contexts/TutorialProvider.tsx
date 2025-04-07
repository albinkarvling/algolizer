import {createContext, useContext, useEffect, useState} from "react";

export type TutorialStep = {
    id?: string;
    header: string;
    description: string;
    showSidebar?: boolean;
};

const TutorialContext = createContext<{
    currentStepIndex: number;
    setCurrentStepIndex: (step: number) => void;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    previousTutorialStep: () => void;
    nextTutorialStep: () => void;
    skipTutorial: () => void;
    resetTutorial: () => void;
    steps: TutorialStep[];
} | null>(null);

export const useTutorial = () => {
    const context = useContext(TutorialContext);
    if (!context) {
        throw new Error("useTutorial must be used within a TutorialProvider");
    }
    return context;
};

export function TutorialProvider({
    children,
    steps,
    id,
}: {
    children: React.ReactNode;
    steps: TutorialStep[];
    id: string;
}) {
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        const showTutorial = localStorage.getItem(`show-tutorial-${id}`);
        setIsActive(showTutorial !== "false");
    }, [id]);

    const completeTutorial = () => {
        localStorage.setItem(`show-tutorial-${id}`, "false");
        setCurrentStepIndex(0);
        setIsActive(false);
    };

    const nextTutorialStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((s) => s + 1);
        } else {
            completeTutorial();
        }
    };

    const previousTutorialStep = () => {
        if (currentStepIndex <= 0) return;
        setCurrentStepIndex((prev) => prev - 1);
    };

    const resetTutorial = () => {
        localStorage.setItem(`show-tutorial-${id}`, "true");
        setCurrentStepIndex(0);
        setIsActive(true);
    };

    const value = {
        steps,
        currentStepIndex,
        setCurrentStepIndex,
        isActive,
        setIsActive,
        nextTutorialStep,
        previousTutorialStep,
        skipTutorial: completeTutorial,
        resetTutorial,
    };
    return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
}
