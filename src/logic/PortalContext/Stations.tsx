import React from "react";
import { usePortal } from ".";

export function AppBarStation() {
    const portals = usePortal();

    return <div ref={portals.topAppBar} />;
}
