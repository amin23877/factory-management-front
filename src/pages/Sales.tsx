import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import QuotePanel from "../features/Sales/Quote";
import SalesOrderPanel from "../features/Sales/SO";
import PurchaseOrderPanel from "../features/Sales/PO";

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
