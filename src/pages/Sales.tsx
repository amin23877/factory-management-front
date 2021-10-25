import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import QuotePanel from "../features/Sales/Quote";
import SalesOrderPanel from "../features/Sales/SO";
import PurchaseOrderPanel from "../features/Sales/PO";
import DevicesPanel from "../features/Engineering/Devices";
import Dashboard from "../features/Sales/Dashboard";
import Calls from "../features/Sales/Call";
import Customers from "../features/Sales/Customer";

export default function Sales() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        // <Container>
        <Box display="flex">
            {/* <SearchBar /> */}
            {/* <div style={{ flexGrow: 1 }} /> */}
            <MyTabs
                value={activeTab}
                textColor="primary"
                onChange={(e, nv) => setActiveTab(nv)}
                orientation="vertical"
                style={{ marginRight: "1em", position: "sticky", top: 65 }}
            >
                <MyTab label="+  Calls" />
                <MyTab label="+  Dashboard" />
                <MyTab label="+  Devices" />
                <MyTab label="+  Quotes" />
                <MyTab label="+  Customer POs" />
                <MyTab label="+  Sales Orders" />
                <MyTab label="+  Customers" />
            </MyTabs>
            <Box flex={1}>
                {activeTab === 0 && <Calls />}
                {activeTab === 1 && <Dashboard />}
                {activeTab === 2 && <DevicesPanel sales={true} />}
                {activeTab === 3 && <QuotePanel />}
                {activeTab === 4 && <PurchaseOrderPanel />}
                {activeTab === 5 && <SalesOrderPanel />}
                {activeTab === 6 && <Customers />}
            </Box>
        </Box>
        // </Container>
    );
}
