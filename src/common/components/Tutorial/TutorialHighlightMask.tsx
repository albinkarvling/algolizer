import {forwardRef} from "react";

export const TutorialHighlightMask = forwardRef<SVGRectElement>((_, ref) => {
    return (
        <svg
            style={{
                position: "fixed",
                inset: 0,
                width: "100dvw",
                height: "100dvh",
                zIndex: 999,
                pointerEvents: "none",
            }}
        >
            <defs>
                <mask id="tutorial-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <rect
                        ref={ref}
                        x="0"
                        y="0"
                        width="0"
                        height="0"
                        rx="8"
                        fill="black"
                    />
                </mask>
            </defs>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="rgba(0, 0, 0, 0.6)"
                mask="url(#tutorial-mask)"
            />
        </svg>
    );
});
