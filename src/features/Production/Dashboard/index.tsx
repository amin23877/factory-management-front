import React, { useState } from "react";

import Box from "@material-ui/core/Box";

import { MyTabs, MyTab } from "../../../app/Tabs";
import UnitList from "./UnitList";

function Index() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box>
            <Box display="flex">
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="secondary">
                    <MyTab label="Unit List" />
                    <MyTab label="Service List" />
                </MyTabs>
                <div style={{ flex: 1 }}></div>
            </Box>
            {activeTab === 0 && <UnitList />}
            {activeTab === 1 && <div></div>}
        </Box>
    );
}

export default Index;
