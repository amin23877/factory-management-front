import React, { useState } from "react";
import { Box, Portal, Popover } from "@material-ui/core";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";

import { MyTabs, MyTab } from "../app/Tabs";
import Shipping from "../features/ShippingAndReceiving/Shipping";
import Units from "../features/FieldService/Units";

import { usePortal } from "../logic/PortalContext";

export default function ShipNReceive() {
    const [activeTab, setActiveTab] = useState(1);
    const [tabText, setTabText] = useState("In Progress");
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
                        <MyTab label="+ Shipping" disabled />
                        <MyTab label="In Progress" />
                        <MyTab label="Ready to Ship" />
                        <MyTab label="Shipped" />
                        <MyTab label="Units" />
                        <MyTab label="+ Receiving" disabled />
                        <MyTab label="Received" />
                        <MyTab label="Expected" />
                    </MyTabs>
                </Popover>
            </Portal>
            <Box display="flex">
                <Box flex={1}>
                    {activeTab === 1 && <Shipping tab={0} />}
                    {activeTab === 2 && <Shipping tab={1} />}
                    {activeTab === 3 && <Shipping tab={2} />}
                    {activeTab === 4 && <Units />}
                </Box>
            </Box>
        </>
    );
}
