import React, { useState } from "react";
import { Box, Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import { MyTabs, MyTab } from "../app/Tabs";

import Dashboard from "../features/Production/Dashboard";
import Tasks from "../features/Production/Task";
import Staff from "../features/Production/Staff";

import { usePortal } from "../logic/PortalContext";

export default function Unit() {
    const [activeTab, setActiveTab] = useState(0);
    const [tabText, setTabText] = useState("Dashboard");
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const portals = usePortal();
    return (
        <>
            <Portal container={portals.topAppBar ? (portals.topAppBar as any).current : null}>
                <div
                    onClick={handleClick}
                    style={{
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginRight: "20px",
                        cursor: "pointer",
                    }}
                >
                    {anchorEl ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />} {tabText}
                </div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <MyTabs
                        value={activeTab}
                        textColor="primary"
                        onChange={(e: any, nv) => {
                            setActiveTab(nv);
                            setTabText(e.target.textContent);
                            handleClose();
                        }}
                        orientation="vertical"
                    >
                        <MyTab label="Dashboard" />
                        <MyTab label="Tasks" />
                        <MyTab label="Staff" />
                    </MyTabs>
                </Popover>
            </Portal>
            <Box display="flex">
                <Box flex={1}>
                    {activeTab === 0 && <Dashboard />}
                    {activeTab === 1 && <Tasks />}
                    {activeTab === 2 && <Staff />}
                </Box>
            </Box>
            {/* we had something called management here that was for labors cost per hour */}
        </>
    );
}
