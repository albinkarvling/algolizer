export type Tile = {
    row: number;
    column: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isVisited: boolean;
    isPath: boolean;
    distance: number;
    weight?: number;
    g?: number;
    f?: number;
    previous?: Tile;
    previousFromStart?: Tile;
    previousFromEnd?: Tile;
};

export type Step = Pick<Tile, "row" | "column"> & {
    type: "visit" | "path";
    from?: "start" | "end";
};

export type Grid = Tile[][];

export type PaletteBrush = "wall" | "grass" | "mud";
