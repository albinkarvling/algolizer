import {createContext, useContext, useState} from "react";

const SidebarCollapsedContext = createContext<{
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
} | null>(null);

export const useSidebarCollapsed = () => {
    const context = useContext(SidebarCollapsedContext);
    if (!context) {
        throw new Error(
            "useSidebarCollapsed must be used within a SidebarCollapsedProvider",
        );
    }
    return context;
};

export function SidebarCollapsedProvider({children}: {children: React.ReactNode}) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const value = {
        isCollapsed,
        setIsCollapsed,
    };
    return (
        <SidebarCollapsedContext.Provider value={value}>
            {children}
        </SidebarCollapsedContext.Provider>
    );
}
