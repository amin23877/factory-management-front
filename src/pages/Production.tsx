import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { MyTabs, MyTab } from "../app/Tabs";

import Dashboard from "../features/Production/Dashboard";
import Tasks from "../features/Production/Task";
import Staff from "../features/Production/Staff";
export default function Unit() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="secondary">
                    <MyTab label="Dashboard" />
                    <MyTab label="Tasks" />
                    <MyTab label="Staff" />
                </MyTabs>
            </Box>
            {activeTab === 0 && <Dashboard />}
            {activeTab === 1 && <Tasks />}
            {activeTab === 2 && <Staff />}
            {/* we had something called management here that was for labors cost per hour */}
        </>
    );
}
