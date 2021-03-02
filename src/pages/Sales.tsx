import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import TextField, { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import QuotePanel from "../features/Quote";
import SalesOrderPanel from "../features/SO";
import PurchaseOrderPanel from "../features/PO";

export default function Sales() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Quote" />
                    <MyTab label="Purchase" />
                    <MyTab label="Sales" />
                </MyTabs>
            </Box>
            {activeTab === 0 && <QuotePanel />}
            {activeTab === 1 && <PurchaseOrderPanel />}
            {activeTab === 2 && <SalesOrderPanel />}
        </Container>
    );
}
