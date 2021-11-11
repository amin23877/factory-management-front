import React, { useState } from "react";
import { Box } from "@material-ui/core";

import Dashboard from "../features/Items/Dashboard";
import Items from "../features/Items";

import { MyTabs, MyTab } from "../app/Tabs";

const Inventory = () => {
    const [mainTab, setMainTab] = useState(0);

    return (
        <>
            <Box display="flex">
                <MyTabs
                    value={mainTab}
                    onChange={(e, nv) => setMainTab(nv)}
                    textColor="secondary"
                    orientation="vertical"
                    style={{ marginRight: "1em", position: "sticky", top: 65 }}
                >
                    <MyTab color="primary" label="Dashboard" />
                    <MyTab label="Items" />
                </MyTabs>
                <Box flex={1}>
                    {mainTab === 0 && <Dashboard />}
                    {mainTab === 1 && <Items />}
                </Box>
            </Box>
        </>
    );
};

export default Inventory;
