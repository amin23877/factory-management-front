import React, { createContext, ReactNode, useContext, useRef } from "react";

const PortalContext = createContext<{ topAppBar: React.LegacyRef<HTMLDivElement> | null }>({
    topAppBar: null,
});

export const PortalProvider = ({ children }: { children: ReactNode }) => {
    const topAppBar = useRef<HTMLDivElement | null>(null);

    return <PortalContext.Provider value={{ topAppBar }}>{children}</PortalContext.Provider>;
};

export const usePortal = () => {
    return useContext(PortalContext);
};
