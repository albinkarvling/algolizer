import {HTMLAttributes} from "react";
import {Menu} from "@mui/icons-material";
import {Interpolation, Theme} from "@emotion/react";
import {useSidebarCollapsed} from "@shared/contexts";
import {useBreakPoints} from "@shared/hooks";
import {Button} from "../Button";
import * as styles from "./Header.styles";

export function Header({
    children,
    cssProp,
    containerProps,
}: {
    children: React.ReactNode;
    cssProp?: Interpolation<Theme>;
    containerProps?: HTMLAttributes<HTMLDivElement> & {
        [key: `data-${string}`]: string;
    };
}) {
    const screenSize = useBreakPoints();
    const {setIsCollapsed} = useSidebarCollapsed();

    const isMobile = screenSize === "tablet" || screenSize === "mobile";

    return (
        <div css={[styles.header, cssProp]} {...containerProps}>
            {isMobile && (
                <Button
                    cssProp={styles.menuButton}
                    onClick={() => setIsCollapsed(false)}
                    variant="text"
                >
                    <Menu />
                </Button>
            )}
            {children}
        </div>
    );
}
