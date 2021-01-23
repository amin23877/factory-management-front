import React, { useState } from "react";
import { Container, Box, TextField } from "@material-ui/core";

import { Production } from "../features/Production";
import { Ship } from "../features/Ship";
import { Sales } from "../features/Sales";
import { MyTab, MyTabs } from "../app/Tabs";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" style={{ margin: "1em 0" }}>
                <TextField />
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="Quote" />
                    <MyTab label="Sales" />
                    <MyTab label="Purchase" />
                </MyTabs>
            </Box>
            {activeTab === 0 && <Production />}
            {activeTab === 1 && <Ship />}
            {activeTab === 2 && <Sales />}
        </Container>
    );
}
