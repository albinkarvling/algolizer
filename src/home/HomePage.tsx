import {Link} from "react-router";
import {GAME_TYPES} from "@shared/constants";
import {Header, Sidebar} from "@shared/components";
import * as styles from "./HomePage.styles";

export function HomePage() {
    return (
        <main css={styles.container}>
            <Sidebar />
            <div css={styles.content}>
                <Header>
                    <span>Select a game to start playing</span>
                </Header>
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
    );
}
