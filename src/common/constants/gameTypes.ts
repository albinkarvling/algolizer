export const GAME_TYPES = [
    {id: "game-of-life", name: "Game of Life", path: "/game-of-life"},
    {id: "pathfinding", name: "Pathfinding", path: "/pathfinding"},
] as const;
export type GameType = (typeof GAME_TYPES)[number];
export type GameId = GameType["id"];
