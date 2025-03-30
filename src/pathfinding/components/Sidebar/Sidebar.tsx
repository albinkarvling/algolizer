import {Dropdown, Sidebar} from "@common/components";
import {ALGORITHM_SELECTION} from "@pathfinding/constants/algorithmSelection";
import {useBoard} from "@pathfinding/contexts";
import * as styles from "./Sidebar.styles";

export function PathfindingSidebar() {
    const {currentAlgorithmId, switchAlgorithm} = useBoard();

    return (
        <Sidebar>
            <Dropdown
                label="Algorithm"
                groups={[{items: ALGORITHM_SELECTION}]}
                selectedId={currentAlgorithmId}
                onSelect={switchAlgorithm}
                cssProp={styles.content}
            />
        </Sidebar>
    );
}
