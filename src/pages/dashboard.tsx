import React, { useState } from "react";
import { Container, Box, TextField } from "@material-ui/core";

import Quote from "../features/Dashboard/Quote";
import { Ship } from "../features/Dashboard/Ship";
import { Sales } from "../features/Dashboard/Sales";
import { MyTab, MyTabs } from "../app/Tabs";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" style={{ margin: "1em 0" }}>
                <TextField />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Quote" />
                    <MyTab label="Sales" />
                    <MyTab label="Ship" />
                </MyTabs>
            </Box>
            {activeTab === 0 && <Quote />}
            {activeTab === 1 && <Sales />}
            {activeTab === 2 && <Ship />}
        </Container>
    );
}
