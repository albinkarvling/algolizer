import {useRef, useState} from "react";
import * as styles from "./Dropdown.styles";
import {useClickOutside} from "../../hooks/useClickOutside";
import {Button} from "../Button";
import {ArrowForwardIos} from "@mui/icons-material";

export type DropdownGroup<T> = {
    groupLabel: string;
    items: DropdownItem<T>[];
};
export type DropdownItem<T> = {
    id: T;
    label: string;
};

type Props<T> = {
    groups: DropdownGroup<T>[];
    selectedId?: T | null;
    onSelect: (id: T) => void;
    noSelectionLabel?: string;
};

export function Dropdown<T extends string>({
    groups,
    onSelect,
    selectedId,
    noSelectionLabel = "None selected",
}: Props<T>) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setOpen(false));

    const handleSelect = (id: T) => {
        onSelect(id);
        setOpen(false);
    };

    const selectedItem = groups
        .flatMap((group) => group.items)
        .find((item) => item.id === selectedId);
    return (
        <div css={styles.container} ref={containerRef}>
            <button css={styles.selectButton} onClick={() => setOpen(!open)}>
                {selectedItem?.label || noSelectionLabel}
                <ArrowForwardIos
                    style={{rotate: open ? "-90deg" : "90deg"}}
                    fontSize="inherit"
                />
            </button>

            {open && (
                <ul css={styles.dropdownGroups}>
                    {groups.map((group) => (
                        <li key={group.groupLabel}>
                            <span css={styles.groupLabel}>{group.groupLabel}</span>
                            <ul>
                                {group.items.map((item) => (
                                    <li key={item.id}>
                                        <Button
                                            size="small"
                                            onClick={() => handleSelect(item.id)}
                                            cssProp={styles.dropdownItem(
                                                selectedId === item.id,
                                            )}
                                        >
                                            {item.label}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
