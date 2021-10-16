import React, { useState } from "react";
import { Box, Container } from "@material-ui/core";

import { MyTabs, MyTab } from "../app/Tabs";
import Shipping from "../features/ShippingAndReceiving/Shipping";
import Units from "../features/FieldService/Units";

export default function ShipNReceive() {
    const [activeTab, setActiveTab] = useState(0);
    const [shipActiveTab, setShipActiveTab] = useState(0);
    const [receiveActiveTab, setReceiveActiveTab] = useState(0);

    return (
        // <Container>
        <>
            <Box display="flex" alignItems="center" my={2}>
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Shipping" />
                    <MyTab label="Receiving" />
                </MyTabs>
                <div style={{ flexGrow: 1 }} />
                {activeTab === 0 && (
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
                )}
            </Box>
            {activeTab === 0 && shipActiveTab === 0 && <Shipping tab={0} />}
            {activeTab === 0 && shipActiveTab === 1 && <Shipping tab={1} />}
            {activeTab === 0 && shipActiveTab === 2 && <Shipping tab={2} />}
            {activeTab === 0 && shipActiveTab === 3 && <Units />}
        </>
        // </Container>
    );
}
