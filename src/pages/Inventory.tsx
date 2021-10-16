import React, { useState } from "react";
import { Box, Container } from "@material-ui/core";

import Dashboard from "../features/Items/Dashboard";
import Items from "../features/Items";

import { MyTabs, MyTab } from "../app/Tabs";

const Inventory = () => {
    const [mainTab, setMainTab] = useState(0);

    return (
        <>
            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={mainTab} onChange={(e, nv) => setMainTab(nv)} textColor="secondary">
                    <MyTab color="primary" label="Dashboard" />
                    <MyTab label="items" />
                </MyTabs>
            </Box>
            {mainTab === 0 && <Dashboard />}
            {mainTab === 1 && <Items />}
        </>
    );
};

export default Inventory;
