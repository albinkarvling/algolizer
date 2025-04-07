import {Dropdown} from "@shared/components";
import {DROPDOWN_PRESETS} from "@game-of-life/constants";
import {useBoard} from "@game-of-life/contexts";
import * as styles from "./AppControls.styles";

export function AppControls() {
    const {activatePreset, activePreset} = useBoard();

    return (
        <div css={styles.content}>
            <Dropdown
                label="Presets"
                selectedId={activePreset}
                groups={DROPDOWN_PRESETS}
                onSelect={(preset) => activatePreset(preset.id)}
                dropdownProps={{
                    "data-tutorial-id": "preset-selector",
                }}
            />
        </div>
    );
}
