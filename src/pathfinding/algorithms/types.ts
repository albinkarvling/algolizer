import * as Algorithms from "./index";

export type AlgorithmId = keyof typeof Algorithms;
export type AlgorithmFn = (typeof Algorithms)[keyof typeof Algorithms];
