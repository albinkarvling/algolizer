import React from "react";
import {SIDEBAR_STATES} from "@game-of-life/constants";

export type SidebarState = (typeof SIDEBAR_STATES)[keyof typeof SIDEBAR_STATES];

const SidebarStateContext = React.createContext<null | {
    state: SidebarState;
    changeState: (state: SidebarState) => void;
    toggleHistoryState: () => void;
}>(null);

export const useSidebarState = () => {
    const context = React.useContext(SidebarStateContext);
    if (!context) {
        throw new Error("useSidebarState must be used within a SidebarStateProvider");
    }
    return context;
};

export function SidebarStateProvider({children}: {children: React.ReactNode}) {
    const [state, setState] = React.useState<SidebarState>(SIDEBAR_STATES.IDLE);

    const changeState = (state: SidebarState) => setState(state);
    const toggleHistoryState = () => {
        setState((prevState) => {
            if (prevState === SIDEBAR_STATES.HISTORY) {
                return SIDEBAR_STATES.IDLE;
            }
            return SIDEBAR_STATES.HISTORY;
        });
    };

    const value = {
        state,
        changeState,
        toggleHistoryState,
    };
    return (
        <SidebarStateContext.Provider value={value}>
            {children}
        </SidebarStateContext.Provider>
    );
}
