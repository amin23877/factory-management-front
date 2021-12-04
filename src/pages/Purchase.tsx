import React, { useState } from "react";
import { Box } from "@material-ui/core";

import { MyTabs, MyTab } from "../app/Tabs";

import PurchaseQuote from "../features/Purchase/Quote";
import PurchasePO from "../features/Purchase/PO";
import Vendors from "../features/Purchase/Vendor";

export default function Purchase() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Box display="flex">
                <MyTabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, nv) => setActiveTab(nv)}
                    orientation="vertical"
                    style={{ marginRight: "1em", position: "sticky", top: 65 }}
                >
                    <MyTab label="+ Dashboard" />
                    <MyTab label="+ Quote" />
                    <MyTab label="+ Purchase Order" />
                    <MyTab label="+ Vendor" />
                </MyTabs>
                <Box flex={1}>
                    {activeTab === 1 && <PurchaseQuote />}
                    {activeTab === 2 && <PurchasePO />}
                    {activeTab === 3 && <Vendors tech={false} />}
                </Box>
            </Box>
        </>
    );
}
