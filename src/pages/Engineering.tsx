import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import DevicesPanel from "../features/Devices";
import BOM from "../features/Engineering/BOM";

export default function Sales() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Devices" />
                    <MyTab label="Projects" />
                    <MyTab label="Dashboard" />
                    <MyTab label="BOM" />
                </MyTabs>
            </Box>
            {activeTab === 0 && <DevicesPanel />}
            {activeTab === 1 && <div>Engineering Projects</div>}
            {activeTab === 2 && <div>Engineering Dashboard</div>}
            {activeTab === 3 && <BOM />}
        </Container>
    );
}
