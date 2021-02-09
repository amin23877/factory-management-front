import React, { useState } from "react";
import { Container, Box, TextField } from "@material-ui/core";

import { QuotePanel } from "../features/Quote/QuotePanel";
import { SalesOrderPanel } from "../features/SalesOrderPanel";
import { PurchaseOrderPanel } from "../features/PurchaseOrderPanel";
import { MyTabs, MyTab } from "../app/Tabs";

export default function Sales() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <TextField variant="outlined" placeholder="Search..." />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Quote" />
                    <MyTab label="Sales" />
                    <MyTab label="Purchase" />
                </MyTabs>
            </Box>
            {activeTab === 0 && <QuotePanel />}
            {activeTab === 1 && <SalesOrderPanel />}
            {activeTab === 2 && <PurchaseOrderPanel />}
        </Container>
    );
}
