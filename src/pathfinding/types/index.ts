export type Tile = {
    row: number;
    column: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isVisited: boolean;
    isPath: boolean;
    distance: number;
    g?: number;
    f?: number;
    previous?: Tile;
};

export type Step = Pick<Tile, "row" | "column"> & {
    type: "visit" | "path";
};

export type Grid = Tile[][];
