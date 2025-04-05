import {useBrush} from "@pathfinding/contexts";
import {PaletteBrush} from "@pathfinding/types";
import * as styles from "./Sidebar.styles";
import {Check} from "@mui/icons-material";

const PALETTE_OPTIONS = ["wall", "grass", "mud"] as const;

export function Palette() {
    const {currentBrush, setCurrentBrush, weightsAreDisabled} = useBrush();

    const handleChange = (option: PaletteBrush) => setCurrentBrush(option);

    return (
        <div>
            <label htmlFor="palette" css={styles.label}>
                Palette
            </label>
            <div id="palette" role="radiogroup" css={styles.paletteContainer}>
                {PALETTE_OPTIONS.map((option) => {
                    const isActive = currentBrush === option;
                    const disabled = weightsAreDisabled && option !== "wall";
                    return (
                        <div
                            onClick={() => {
                                if (disabled) return;
                                handleChange(option);
                            }}
                            css={styles.paletteItem(option, isActive, disabled)}
                            key={option}
                        >
                            {isActive && <Check css={styles.paletteIcon} />}
                            <input
                                type="radio"
                                id={option}
                                name="palette"
                                value={option}
                                checked={isActive}
                                onChange={() => handleChange(option)}
                                disabled={disabled}
                                key={option}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
