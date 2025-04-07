import {useLayoutEffect, useState} from "react";

const TABLET_BREAKPOINT = 768;
const MOBILE_BREAKPOINT = 480;

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakPoints() {
    const [breakPoint, setBreakPoint] = useState<Breakpoint>("desktop");

    useLayoutEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < MOBILE_BREAKPOINT) {
                setBreakPoint("mobile");
            } else if (width < TABLET_BREAKPOINT) {
                setBreakPoint("tablet");
            } else {
                setBreakPoint("desktop");
            }
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return breakPoint;
}
