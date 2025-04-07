import {Check} from "@mui/icons-material";
import {Label} from "@shared/components";
import {useBrush} from "@pathfinding/contexts";
import {PaletteBrush} from "@pathfinding/types";
import * as styles from "./Palette.styles";

const PALETTE_OPTIONS = [
    {
        type: "wall",
        label: "Wall",
    },
    {
        type: "grass",
        label: "Grass",
    },
    {
        type: "mud",
        label: "Mud",
    },
] as const;

export function Palette() {
    const {currentBrush, setCurrentBrush, weightsAreDisabled} = useBrush();

    const handleChange = (option: PaletteBrush) => setCurrentBrush(option);

    return (
        <div data-tutorial-id="palette">
            <Label id="palette-label">Palette</Label>
            <div
                role="radiogroup"
                aria-describedby="palette-label"
                css={styles.paletteContainer}
            >
                {PALETTE_OPTIONS.map(({label, type}) => {
                    const isActive = currentBrush === type;
                    const disabled = weightsAreDisabled && type !== "wall";
                    return (
                        <div
                            data-tooltip={label}
                            onClick={() => {
                                if (disabled) return;
                                handleChange(type);
                            }}
                            css={styles.paletteItem(type, isActive, disabled)}
                            key={type}
                        >
                            {isActive && <Check css={styles.paletteIcon} />}
                            <input
                                type="radio"
                                id={type}
                                name="palette"
                                value={type}
                                checked={isActive}
                                onChange={() => handleChange(type)}
                                disabled={disabled}
                                aria-label={label}
                                key={type}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
