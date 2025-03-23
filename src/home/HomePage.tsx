import {Header, Sidebar} from "@common/components";
import * as styles from "./HomePage.styles";
import {GAME_TYPES} from "@common/constants";
import {Link} from "react-router";

export function HomePage() {
    return (
        <>
            <Sidebar />
            <main css={styles.mainContainer}>
                <Header>
                    <span>Select a game to start playing</span>
                </Header>
                <div css={styles.content}>
                    <ul css={styles.gameList}>
                        {GAME_TYPES.map((gameType) => (
                            <li key={gameType.id}>
                                <Link to={gameType.path} css={styles.gameItem}>
                                    {gameType.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
}
