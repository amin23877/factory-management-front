import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import PurchaseQuote from "../features/Purchase/Quote";
import PurchasePO from "../features/Purchase/PO";
import Vendors from "../features/Vendor";

export default function Purchase() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Dashboard" />
                    <MyTab label="Quote" />
                    <MyTab label="Purchase Order" />
                    <MyTab label="Vendor" />
                </MyTabs>
            </Box>
            {activeTab === 1 && <PurchaseQuote />}
            {activeTab === 2 && <PurchasePO />}
            {activeTab === 3 && <Vendors tech={false} />}
        </>
    );
}
