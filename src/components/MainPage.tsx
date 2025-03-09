import {BoardProvider} from "../contexts";
import {SidebarStateProvider} from "../contexts/SidebarStateProvider/SidebarStateProvider";
import {Sidebar} from "./Sidebar";
import {Board} from "./Board";
import {Header} from "./Header";
import * as styles from "./MainPage.styles";

export function MainPage() {
    return (
        <SidebarStateProvider>
            <BoardProvider>
                <div css={styles.wrapper}>
                    <Sidebar />
                    <main style={{flex: 1}}>
                        <Header />
                        <Board />
                    </main>
                </div>
            </BoardProvider>
        </SidebarStateProvider>
    );
}
