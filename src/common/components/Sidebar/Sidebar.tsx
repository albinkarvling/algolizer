import {GAME_TYPES, GameId} from "@common/constants";
import {Dropdown, DropdownGroup, DropdownItem} from "../Dropdown";
import * as styles from "./Sidebar.styles";
import {useLocation} from "react-router";

const gameItems: DropdownItem<GameId>[] = GAME_TYPES.map((gameType) => ({
    id: gameType.id,
    label: gameType.name,
    href: gameType.path,
}));
const gameGroups: DropdownGroup<GameId>[] = [
    {
        items: gameItems,
    },
];

export function Sidebar({children}: {children?: React.ReactNode}) {
    const gameId = useLocation().pathname.split("/")[1] as GameId;

    return (
        <aside css={styles.container}>
            <div css={styles.header}>
                <label css={styles.label}>Available Games</label>
                <Dropdown
                    groups={gameGroups}
                    onSelect={console.log}
                    noSelectionLabel="Select a game"
                    selectedId={gameId}
                />
            </div>
            {children}
        </aside>
    );
}
