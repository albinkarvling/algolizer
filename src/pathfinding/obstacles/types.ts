import * as Obstacles from "./index";

export type ObstacleId = keyof typeof Obstacles;
export type ObstacleFn = (typeof Obstacles)[keyof typeof Obstacles];
