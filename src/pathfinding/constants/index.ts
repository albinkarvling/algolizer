import {TutorialStep} from "@shared/contexts";

export const SUPPORTS_WEIGHTS = ["dijkstra", "astar"];
export const GRASS_WEIGHT = 3;
export const MUD_WEIGHT = 7;

export const PATH_FINDING_TUTORIAL_STEPS: TutorialStep[] = [
    {
        header: "Pathfinding Visualizer Tutorial",
        description:
            "This is a pathfinding visualizer. You can use it to visualize different pathfinding algorithms - how they behave and how they find the shortest path between two points. You can also use it to visualize how different algorithms overcome obstacles and environments.",
    },
    {
        id: "pathfinding-header",
        header: "Tile Types",
        description:
            "The pathfinding board is made up of different types of tiles. Each tile has a different purpose; start, wall, weight, etc.",
    },
    {
        id: "board",
        header: "The Pathfinding Board",
        description:
            "The board is where you will visualize the pathfinding algorithm. You can click and drag on the tiles to change their state.",
    },
    {
        id: "island-controls",
        header: "Playback Controls",
        description:
            "Use the playback controls to start, pause, go back and forward through the steps of the algorithm. You can also use space and the arrow keys.",
    },
    {
        id: "palette",
        header: "The Palette",
        description:
            "The palette is where you can select the type of tile you want to place on the board. You can choose between wall, grass, and mud tiles.",
        showSidebar: true,
    },
    {
        id: "algorithm-selector",
        header: "Algorithm Selector",
        description:
            "The algorithm selector is where you can choose the pathfinding algorithm you want to use.",
        showSidebar: true,
    },
    {
        id: "obstacle-selector",
        header: "Obstacle Selector",
        description:
            "The obstacle selector provides you with a list of preset obstacles you can place on the board.",
        showSidebar: true,
    },
    {
        id: "reset-board-button",
        header: "Reset Board",
        description:
            "The reset board button will reset the board to its original state. This will remove all tiles and obstacles.",
        showSidebar: true,
    },
    {
        id: "tutorial-button",
        header: "Tutorial Button",
        description: "The tutorial button will show you this tutorial again.",
        showSidebar: true,
    },
];
