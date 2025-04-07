import {useEffect} from "react";

type Props = {
    onForward?: () => void;
    onBackward?: () => void;
    onSpace?: () => void;
};

export function useKeyboardControls({onForward, onBackward, onSpace}: Props) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowRight":
                    onForward?.();
                    break;
                case "ArrowLeft":
                    onBackward?.();
                    break;
                case " ":
                    event.preventDefault();
                    onSpace?.();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onBackward, onForward, onSpace]);
}
