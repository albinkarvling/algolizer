import {GRASS_WEIGHT, MUD_WEIGHT} from "@pathfinding/constants";
import {useBoard, useBrush} from "@pathfinding/contexts";
import {Tile} from "@pathfinding/types";
import {useCallback, useEffect, useRef} from "react";

type TileDragType = "start" | "end" | "paint";
type MouseTile = Pick<Tile, "row" | "column" | "isWall" | "weight" | "isStart" | "isEnd">;

export function useMouseControls(containerRef: React.RefObject<HTMLDivElement | null>) {
    const {currentBrush} = useBrush();
    const {moveTile, toggleWall, toggleWeight} = useBoard();

    const isDragging = useRef<false | TileDragType>(false);
    const updatedTiles = useRef<Set<string>>(new Set());

    const resetDrag = () => {
        isDragging.current = false;
        updatedTiles.current.clear();
    };

    const applyTileEffect = useCallback(
        (tile: MouseTile) => {
            const key = `${tile.row}-${tile.column}`;

            switch (isDragging.current) {
                case "start":
                    moveTile("start", tile.row, tile.column);
                    break;
                case "end":
                    moveTile("end", tile.row, tile.column);
                    break;
                case "paint":
                    if (!updatedTiles.current.has(key)) {
                        updatedTiles.current.add(key);

                        switch (currentBrush) {
                            case "wall":
                                toggleWall(tile.row, tile.column);
                                break;
                            case "grass":
                                toggleWeight(tile.row, tile.column, GRASS_WEIGHT);
                                break;
                            case "mud":
                                toggleWeight(tile.row, tile.column, MUD_WEIGHT);
                                break;
                        }
                    }
                    break;
            }
        },
        [moveTile, toggleWall, toggleWeight, currentBrush],
    );

    const startDrag = (tile: MouseTile) => {
        if (tile.isStart) {
            isDragging.current = "start";
        } else if (tile.isEnd) {
            isDragging.current = "end";
        } else {
            isDragging.current = "paint";
            applyTileEffect(tile);
        }
    };

    const onMouseDown = (tile: Tile) => startDrag(tile);
    const onMouseEnter = (tile: Tile) => {
        if (isDragging.current) applyTileEffect(tile);
    };
    const onMouseUp = resetDrag;
    const onTouchEnd = resetDrag;

    const getTileFromPoint = useCallback((x: number, y: number): MouseTile | null => {
        const el = document.elementFromPoint(x, y);
        if (!el) return null;

        const row = Number(el.getAttribute("data-row"));
        const column = Number(el.getAttribute("data-column"));

        if (isNaN(row) || isNaN(column)) return null;

        return {
            row,
            column,
            isWall: el.getAttribute("data-is-wall") === "true",
            isStart: el.getAttribute("data-is-start") === "true",
            isEnd: el.getAttribute("data-is-end") === "true",
        };
    }, []);

    const onTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        if (!touch) return;

        const tile = getTileFromPoint(touch.clientX, touch.clientY);
        if (tile) startDrag(tile);
    };

    const onTouchMove = useCallback(
        (event: TouchEvent) => {
            const touch = event.touches[0];
            if (!touch || !isDragging.current) return;

            const tile = getTileFromPoint(touch.clientX, touch.clientY);
            if (tile) applyTileEffect(tile);
        },
        [applyTileEffect, getTileFromPoint],
    );

    // prevent page scroll while dragging on touch devices
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            onTouchMove(e);
        };

        container.addEventListener("touchmove", handleTouchMove, {passive: false});
        return () => container.removeEventListener("touchmove", handleTouchMove);
    }, [onTouchMove, containerRef]);

    return {
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        onTouchStart,
        onTouchEnd,
    };
}
