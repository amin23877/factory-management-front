import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import PurchaseQuote from "../features/Purchase/Quote";
import PurchasePO from "../features/Purchase/PO";
import Vendors from "./Vendors";

export default function Purchase() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Dashboard" />
                    <MyTab label="Quote" />
                    <MyTab label="Purchase Order" />
                    <MyTab label="vendor" />
                </MyTabs>
            </Box>
            {activeTab === 1 && <PurchaseQuote />}
            {activeTab === 2 && <PurchasePO />}
            {activeTab === 3 && <Vendors />}
        </Container>
    );
}
