import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSWR from "swr";

import { BasePaper } from "../../../app/Paper";

export default function Report() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box>
            <BasePaper>
                <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                    <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                        <Tab label="Report 1" />
                        <Tab label="Report 2" />
                        <Tab label="Report 3" />
                        <Tab label="Report 4" />
                        <Tab label="Report 5" />
                        <Tab label="Report 6" />
                    </Tabs>
                    <div style={{ flexGrow: 1 }} />
                </Box>
                {activeTab === 0 && <Box flex={1}></Box>}
                {activeTab === 1 && <Box flex={1}></Box>}
                {activeTab === 2 && <Box flex={1}></Box>}
                {activeTab === 3 && <Box flex={1}></Box>}
                {activeTab === 4 && <Box flex={1}></Box>}
                {activeTab === 5 && <Box flex={1}></Box>}
            </BasePaper>
        </Box>
    );
}
