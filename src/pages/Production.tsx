import React, { useState } from "react";
import { Box } from "@material-ui/core";

import { MyTabs, MyTab } from "../app/Tabs";

import Dashboard from "../features/Production/Dashboard";
import Tasks from "../features/Production/Task";
import Staff from "../features/Production/Staff";

export default function Unit() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Box display="flex">
                <MyTabs
                    value={activeTab}
                    onChange={(e, nv) => setActiveTab(nv)}
                    textColor="primary"
                    orientation="vertical"
                    style={{ marginRight: "1em", position: "sticky", top: 65 }}
                >
                    <MyTab label="+ Dashboard" />
                    <MyTab label="+ Tasks" />
                    <MyTab label="+ Staff" />
                </MyTabs>
                <Box flex={1}>
                    {activeTab === 0 && <Dashboard />}
                    {activeTab === 1 && <Tasks />}
                    {activeTab === 2 && <Staff />}
                </Box>
            </Box>
            {/* we had something called management here that was for labors cost per hour */}
        </>
    );
}
