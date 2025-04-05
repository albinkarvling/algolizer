import {GAME_TYPES, GameId} from "@common/constants";
import {Dropdown, DropdownGroup, DropdownItem} from "../Dropdown";
import * as styles from "./Sidebar.styles";
import {useLocation} from "react-router";
import {useBreakPoints} from "@common/hooks/useBreakPoints";
import {useSidebarCollapsed} from "@common/contexts/SidebarCollapsedProvider";
import {Button} from "../Button";
import {Menu} from "@mui/icons-material";

const gameItems = GAME_TYPES.map((gameType) => ({
    id: gameType.id,
    label: gameType.name,
    href: gameType.path,
})) satisfies DropdownItem[];
const gameGroups = [
    {
        items: gameItems,
    },
] as const satisfies DropdownGroup[];

export function Sidebar({children}: {children?: React.ReactNode}) {
    const breakpoint = useBreakPoints();
    const {isCollapsed, setIsCollapsed} = useSidebarCollapsed();
    const gameId = useLocation().pathname.split("/")[1] as GameId;

    const isMobile = breakpoint === "tablet" || breakpoint === "mobile";
    return (
        <aside css={styles.container(isMobile, isCollapsed)}>
            {isMobile && (
                <Button
                    variant="text"
                    onClick={() => setIsCollapsed(true)}
                    cssProp={styles.menuButton}
                >
                    <Menu />
                </Button>
            )}
            <div css={styles.header}>
                <Dropdown
                    label="Available Games"
                    groups={gameGroups}
                    onSelect={() => setIsCollapsed(true)}
                    noSelectionLabel="Select a game"
                    selectedId={gameId}
                />
            </div>
            {children}
        </aside>
    );
}
