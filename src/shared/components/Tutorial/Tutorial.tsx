import {useEffect, useRef, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import {useTutorial} from "@shared/contexts";
import {useBreakPoints} from "@shared/hooks";
import {useSidebarCollapsed} from "@shared/contexts";
import {TutorialHighlightMask} from "./TutorialHighlightMask";
import {Button} from "../Button";
import * as styles from "./Tutorial.styles";

const SPACE_FROM_ELEMENT = 24;
const HIGHLIGHT_SPACING = 8;
const SIDEBAR_TRANSITION_DURATION = 250;

export function Tutorial() {
    const screenSize = useBreakPoints();
    const {setIsCollapsed} = useSidebarCollapsed();
    const {
        steps,
        currentStepIndex,
        isActive,
        skipTutorial,
        nextTutorialStep,
        previousTutorialStep,
    } = useTutorial();

    const [position, setPosition] = useState<"left" | "right" | "bottom">("left");
    const [offset, setOffset] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<SVGRectElement>(null);

    const currentStep = steps[currentStepIndex];
    const isStepWithoutElement = currentStep.id === undefined;
    const isMobile = ["mobile", "tablet"].includes(screenSize);

    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    const centerTooltip = (container: HTMLElement, isMobile: boolean) => {
        container.style.left = !isMobile ? "50%" : "";
        container.style.top = !isMobile ? "50%" : "";
        container.style.transform = !isMobile ? "translate(-50%, -50%)" : "";
    };

    const clearMask = (mask: SVGRectElement | null) => {
        if (!mask) return;
        mask.setAttribute("width", "0");
        mask.setAttribute("height", "0");
    };

    const updateMask = (mask: SVGRectElement | null, rect: DOMRect) => {
        if (!mask) return;
        mask.setAttribute("x", `${rect.left - 8}`);
        mask.setAttribute("y", `${rect.top - 8}`);
        mask.setAttribute("width", `${rect.width + HIGHLIGHT_SPACING * 2}`);
        mask.setAttribute("height", `${rect.height + HIGHLIGHT_SPACING * 2}`);
    };

    const resetMobileStyles = (container: HTMLElement) => {
        container.style.left = "";
        container.style.right = "";
        container.style.margin = "";
        container.style.bottom = "";
        container.style.top = "";
        container.style.transition = "";
    };

    const calculateDesktopPosition = (el: DOMRect, tooltip: DOMRect) => {
        // set it default to top and left of the element
        let left = el.left - tooltip.width - SPACE_FROM_ELEMENT;
        let top = el.top - HIGHLIGHT_SPACING;
        let position: "left" | "right" = "left";

        // if there isn't enough space on the left, try to position it on the right
        if (left < 0 || left + tooltip.width > window.innerWidth) {
            left = el.left + el.width + SPACE_FROM_ELEMENT;
            position = "right";
        }

        // if there isn't enough space on the right either, try to position it center and below
        if (left + tooltip.width > window.innerWidth) {
            left = el.width / 2 - tooltip.width / 2;
            top = el.top + el.height + SPACE_FROM_ELEMENT;
        }

        // if it exceeds the bottom of the screen, try to position it above the element
        if (top + tooltip.height > window.innerHeight) {
            top = window.innerHeight - tooltip.height - SPACE_FROM_ELEMENT;
        }

        // if the tooltip is too close to the top, position it slightly from the top
        if (top < 0) {
            top = SPACE_FROM_ELEMENT;
        }

        // position the arrow in the middle of the element
        // if the arrow is too close to the top, use the default spacing
        const topDiff = top - el.top;
        const arrowOffset =
            el.height > tooltip.height
                ? SPACE_FROM_ELEMENT
                : Math.max(SPACE_FROM_ELEMENT, el.height / 2 - topDiff);

        return {left, top, arrowOffset, position};
    };

    useEffect(() => {
        // if we skip or reach the end, close the sidebar
        // in case the last step is inside the sidebar
        if (!isActive) {
            setIsCollapsed(true);
            return;
        }

        const container = containerRef.current;

        const element = document.querySelector(
            `[data-tutorial-id="${currentStep.id}"]`,
        ) as HTMLElement | null;

        const updatePosition = () => {
            if (!container) return;

            // if the step doesn't have an element, center the tooltip without a mask
            if (isStepWithoutElement) {
                centerTooltip(container, isMobile);
                clearMask(maskRef.current);
                return;
            }

            if (!element) return;

            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // default options
            setOffset(0);
            setPosition("left");
            setIsCollapsed(!currentStep.showSidebar);
            container.style.transform = "none";

            updateMask(maskRef.current, elementRect);

            if (!isMobile) {
                const {left, top, arrowOffset, position} = calculateDesktopPosition(
                    elementRect,
                    containerRect,
                );

                container.style.left = `${left}px`;
                container.style.top = `${top}px`;
                container.style.transition =
                    "top 0.2s ease-in-out, left 0.2s ease-in-out, transform 0.2s ease-in-out";
                setOffset(arrowOffset);
                setPosition(position);
            } else {
                // we don't want any previous styles to affect the position
                // tutorial should always be bottom center if it's not hiding the element
                resetMobileStyles(container);

                // check if the tutorial is above the highlighted element
                // if so, move it up above the element
                const shouldMoveUp =
                    elementRect.top + elementRect.height >
                    window.innerHeight - containerRect.height;

                if (shouldMoveUp) {
                    const newTop = Math.max(
                        window.innerHeight -
                            containerRect.height -
                            elementRect.height -
                            SPACE_FROM_ELEMENT * 2,
                        0,
                    );
                    container.style.top = `${newTop}px`;
                    container.style.bottom = "auto";
                }
            }
        };

        // if elements are inside sidebar, wait for transition to finish
        // else we will get position of the element before sidebar is in view
        const previousStep = steps[currentStepIndex - 1];
        if (currentStep.showSidebar && !previousStep.showSidebar) {
            setTimeout(updatePosition, SIDEBAR_TRANSITION_DURATION);
        }

        updatePosition();

        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [
        currentStep,
        steps,
        isActive,
        isMobile,
        isStepWithoutElement,
        setIsCollapsed,
        currentStepIndex,
    ]);

    if (!isActive) return null;

    return (
        <>
            <TutorialHighlightMask ref={maskRef} />

            <div
                css={styles.container({position, offset, isStepWithoutElement, isMobile})}
                ref={containerRef}
            >
                <span css={styles.header}>{currentStep.header}</span>
                <span css={styles.description}>{currentStep.description}</span>
                <div css={styles.buttons}>
                    <div css={styles.navigationButtons}>
                        {!isFirstStep && (
                            <Button
                                onClick={previousTutorialStep}
                                cssProp={styles.backButton}
                                buttonProps={{
                                    "aria-label": "Go to previous step",
                                    "data-tooltip": "Go back",
                                }}
                            >
                                <ArrowBack fontSize="inherit" />
                            </Button>
                        )}
                        <Button cssProp={styles.nextButton} onClick={nextTutorialStep}>
                            {isLastStep ? "Got it!" : "Next"}
                        </Button>
                    </div>
                    {!isLastStep && (
                        <Button
                            cssProp={styles.skipButton}
                            onClick={skipTutorial}
                            variant="ghost"
                        >
                            Skip tutorial
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
