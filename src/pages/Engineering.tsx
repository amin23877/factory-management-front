import React, { useState } from "react";
import { Box, Container } from "@material-ui/core";

import { SearchBar } from "../app/TextField";
import { MyTabs, MyTab } from "../app/Tabs";

import DevicesPanel from "../features/Engineering/Devices";
import Project from "../features/Engineering/Projects";
import BOM from "../features/Engineering/BOM";
import Monitoring from "../features/Engineering/Monitoring";
import Dashboard from "../features/Engineering/Dashboard";

export default function Engineering() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Dashboard" />
                    <MyTab label="Devices" />
                    <MyTab label="Devices BOM" />
                    <MyTab label="Phocus Monitoring" />
                    <MyTab label="Projects" />
                </MyTabs>
            </Box>
            {activeTab === 0 && <Dashboard />}
            {activeTab === 1 && <DevicesPanel />}
            {activeTab === 2 && <BOM />}
            {activeTab === 3 && <Monitoring />}
            {activeTab === 4 && <Project />}
        </Container>
    );
}
