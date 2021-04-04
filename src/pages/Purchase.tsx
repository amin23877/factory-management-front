import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import PurchaseQuote from "../features/PurchaseQuote";
import PurchasePO from "../features/PurchasePO";

export default function Purchase() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Quote" />
                    <MyTab label="PO" />
                    <MyTab label="SO" disabled />
                </MyTabs>
            </Box>
            {activeTab === 0 && <PurchaseQuote />}
            {activeTab === 1 && <PurchasePO />}
        </Container>
    );
}
