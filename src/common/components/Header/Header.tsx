import {HTMLAttributes} from "react";
import {Interpolation, Theme} from "@emotion/react";
import * as styles from "./Header.styles";
import {useSidebarCollapsed} from "@common/contexts/SidebarCollapsedProvider";
import {useBreakPoints} from "@common/hooks/useBreakPoints";
import {Menu} from "@mui/icons-material";
import {Button} from "../Button";

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
