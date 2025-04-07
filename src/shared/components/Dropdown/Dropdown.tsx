import {HTMLAttributes, useRef, useState} from "react";
import {ArrowForwardIos} from "@mui/icons-material";
import {Interpolation, Theme} from "@emotion/react";
import {useClickOutside} from "@shared/hooks";
import {Button} from "../Button";
import {Label} from "../Label";
import * as styles from "./Dropdown.styles";

/**
    Initially, the dropdown component had simpler typing. It worked, but
    because of how typescript infer types, when you pass an array of dropdown
    groups, it would only infer the `id` type for items in the first group.
    Meaning `selectedId` & `onSelect` would only have types for the first group.
    This typing also allows custom properties to be added to the items, which
    also extends the DropdownItem type.
*/

export type DropdownItem = {
    id: string;
    label: string;
    href?: string;
};

export type DropdownGroup<T extends DropdownItem = DropdownItem> = {
    groupLabel?: string;
    items: readonly T[];
};

// this ensures types are inferred correctly from the groups
// even if there are multiple groups, each group's ids and item custom
// properties, that are not native to the DropdownItem, are inferred correctly
type InferDropdownItem<TGroups extends readonly DropdownGroup[]> =
    TGroups[number]["items"][number];

type DropdownProps<TGroups extends readonly DropdownGroup[]> = {
    groups: TGroups;
    label: string;
    selectedId?: InferDropdownItem<TGroups>["id"] | null;
    onSelect?: (item: InferDropdownItem<TGroups>) => void;
    noSelectionLabel?: string;
    cssProp?: Interpolation<Theme>;
    dropdownProps?: HTMLAttributes<HTMLDivElement> & {
        [key: `data-${string}`]: string;
    };
};

export function Dropdown<TGroups extends readonly DropdownGroup[]>({
    groups,
    onSelect,
    selectedId,
    noSelectionLabel = "None selected",
    label,
    cssProp,
    dropdownProps,
}: DropdownProps<TGroups>) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setOpen(false));

    const handleSelect = (item: InferDropdownItem<TGroups>) => {
        onSelect?.(item);
        setOpen(false);
    };

    const selectedItem = groups
        .flatMap((group) => group.items)
        .find((item) => item.id === selectedId);

    return (
        <div css={[styles.container, cssProp]} ref={containerRef} {...dropdownProps}>
            <Label as="label" htmlFor={label}>
                {label}
            </Label>

            <button
                id={label}
                css={styles.selectButton}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-haspopup
            >
                {selectedItem?.label || noSelectionLabel}
                <ArrowForwardIos
                    style={{rotate: open ? "-90deg" : "90deg"}}
                    fontSize="inherit"
                />
            </button>

            {open && (
                <ul css={styles.dropdownGroups}>
                    {groups.map(({groupLabel, items}, index) => (
                        <li key={groupLabel || index}>
                            {groupLabel && <Label id={groupLabel}>{groupLabel}</Label>}
                            <ul aria-labelledby={groupLabel}>
                                {items.map((item) => (
                                    <li key={item.id}>
                                        <Button
                                            size="small"
                                            onClick={() => handleSelect(item)}
                                            cssProp={styles.dropdownItem(
                                                selectedId === item.id,
                                            )}
                                            href={item.href}
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
