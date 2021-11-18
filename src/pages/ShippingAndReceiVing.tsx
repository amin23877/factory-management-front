import React, { useState } from "react";
import { Box } from "@material-ui/core";

import { MyTabs, MyTab } from "../app/Tabs";
import Shipping from "../features/ShippingAndReceiving/Shipping";
import Units from "../features/FieldService/Units";

export default function ShipNReceive() {
    const [activeTab, setActiveTab] = useState(1);
    // const [shipActiveTab, setShipActiveTab] = useState(0);
    // const [receiveActiveTab, setReceiveActiveTab] = useState(0);

    return (
        // <Container>
        <>
            <Box display="flex">
                <MyTabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, nv) => setActiveTab(nv)}
                    orientation="vertical"
                    style={{ marginRight: "1em", position: "sticky", top: 65 }}
                >
                    <MyTab label="Shipping" disabled />
                    <MyTab label=" ‌ ‌  + In Progress" />
                    <MyTab label=" ‌ ‌  + Ready to Ship" />
                    <MyTab label=" ‌ ‌  + Shipped" />
                    <MyTab label=" ‌ ‌  + Units" />
                    <MyTab label="Receiving" disabled />
                    <MyTab label=" ‌ ‌  + Received" />
                    <MyTab label=" ‌ ‌  + Expected" />
                </MyTabs>
                {/* <div style={{ flexGrow: 1 }} /> */}
                {/* {activeTab === 0 && (
                    <>
                        <MyTabs value={shipActiveTab} textColor="primary" onChange={(e, nv) => setShipActiveTab(nv)}>
                            <MyTab label="Shipments - In Progress" />
                            <MyTab label="Ready to Ship" />
                            <MyTab label="Shipped" />
                            <MyTab label="Units" />
                        </MyTabs>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <MyTabs
                            value={receiveActiveTab}
                            textColor="primary"
                            onChange={(e, nv) => setReceiveActiveTab(nv)}
                        >
                            <MyTab label="Received" />
                            <MyTab label="Expected Deliveries" />
                        </MyTabs>
                    </>
                )} */}
                <Box flex={1}>
                    {activeTab === 1 && <Shipping tab={0} />}
                    {activeTab === 2 && <Shipping tab={1} />}
                    {activeTab === 3 && <Shipping tab={2} />}
                    {activeTab === 4 && <Units />}
                </Box>
            </Box>
        </>
        // </Container>
    );
}
