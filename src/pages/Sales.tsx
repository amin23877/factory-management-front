import React, { useState } from "react";
import { Container, Box, Breadcrumbs, Link } from "@material-ui/core";

import { QuotePanel } from "../features/QuotePanel";
import { SalesOrderPanel } from "../features/SalesOrderPanel";
import { PurchaseOrderPanel } from "../features/PurchaseOrderPanel";
import { MainTabs } from "../app/Tabs";

export default function Sales() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" my={2}>
                <Breadcrumbs separator=">">
                    <Link>Website</Link>
                    <Link>Home</Link>
                    <Link>Sales</Link>
                </Breadcrumbs>
                <div style={{ flexGrow: 1 }} />
                <MainTabs tabs={["Quote", "Sales Order", "Purchase Order"]} currentTab={activeTab} onChange={setActiveTab} />
            </Box>
            {activeTab === 0 && <QuotePanel />}
            {activeTab === 1 && <SalesOrderPanel />}
            {activeTab === 2 && <PurchaseOrderPanel />}
        </Container>
    );
}
