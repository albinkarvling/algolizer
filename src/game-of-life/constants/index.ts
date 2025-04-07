import {TutorialStep} from "@common/contexts/TutorialProvider";

export * from "./presets";

export const SIDEBAR_STATES = {
    IDLE: "idle",
    HISTORY: "history",
} as const;

export const TUTORIAL_STEPS: TutorialStep[] = [
    {
        header: "The Game of Life",
        description:
            "The Game of Life is a cellular automaton devised by mathematician John Conway in 1970. It consists of a grid of cells that can be either alive or dead. The state of each cell changes based on the states of its neighbors according to a set of rules.",
    },
    {
        id: "grid",
        header: "The Grid",
        description:
            "The grid is the playing field for the Game of Life. Each cell can be either alive (black) or dead (white). You can click and drag on cells to toggle their state.",
    },
    {
        id: "playback-controls",
        header: "Playback Controls",
        description:
            "The playback controls allow you to start, pause, and step through the simulation. You can also use space and the arrow keys.",
    },
    {
        id: "history-button",
        header: "Generation History",
        description:
            "The current generation is displayed at the top of the grid. You can click on the history button to view the previous generations.",
    },
    {
        id: "preset-selector",
        header: "Presets",
        description:
            "You can use presets to quickly set up fun patterns. Click on the presets button to view the available presets.",
        showSidebar: true,
    },
    {
        id: "reset-board-button",
        header: "Reset Board",
        description:
            "You can reset the board to its initial state by clicking the reset button.",
        showSidebar: true,
    },
    {
        id: "tutorial-button",
        header: "Tutorial Button",
        description:
            "You can click on the tutorial button to view this tutorial again at any time.",
        showSidebar: true,
    },
];
