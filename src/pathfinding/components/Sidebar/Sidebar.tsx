import {Dropdown, Sidebar} from "@common/components";
import {ALGORITHM_SELECTION} from "@pathfinding/constants/algorithmSelection";
import {useBoard} from "@pathfinding/contexts";

export function PathfindingSidebar() {
    const {currentAlgorithmId, switchAlgorithm} = useBoard();

    return (
        <Sidebar>
            <Dropdown
                label="Algorithm"
                groups={[{items: ALGORITHM_SELECTION}]}
                selectedId={currentAlgorithmId}
                onSelect={switchAlgorithm}
            />
        </Sidebar>
    );
}
