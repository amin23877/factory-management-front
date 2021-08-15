import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import QuotePanel from "../features/Sales/Quote";
import SalesOrderPanel from "../features/Sales/SO";
import PurchaseOrderPanel from "../features/Sales/PO";
import DevicesPanel from "../features/Engineering/Devices";
import Dashboard from "../features/Sales/Dashboard";

import Clients from "../pages/Clients";

export default function Sales() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Calls" />
                    <MyTab label="Dashboard" />
                    <MyTab label="Devices" />
                    <MyTab label="Quote" />
                    <MyTab label="Customer Pos" />
                    <MyTab label="Sales Order" />
                    <MyTab label="Client" />
                </MyTabs>
            </Box>
            {activeTab === 1 && <Dashboard />}
            {activeTab === 2 && <DevicesPanel sales={true} />}
            {activeTab === 3 && <QuotePanel />}
            {activeTab === 4 && <PurchaseOrderPanel />}
            {activeTab === 5 && <SalesOrderPanel />}
            {activeTab === 6 && <Clients />}
        </Container>
    );
}
