import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSWR from "swr";

import { BasePaper } from "../../../app/Paper";
import BaseLineChart from "../../../app/Chart/LineChart";
import { engApData, FSHData } from "../../../logic/dashboardReports";

export default function Report() {
    const [activeTab, setActiveTab] = useState(0);

    const { data: engApp } = useSWR("/engapp");
    const { data: FSH } = useSWR("/fsh");

    return (
        <Box>
            <BasePaper>
                <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
                    <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                        <Tab label="Eng. AP." />
                        <Tab label="purchase" />
                        <Tab label="F.S.H." />
                        <Tab label="Flags" />
                        <Tab label="QCFlags" />
                    </Tabs>
                    <div style={{ flexGrow: 1 }} />
                </Box>
                {activeTab === 0 && (
                    <Box flex={1}>
                        {engApp && (
                            <BaseLineChart data={engApData(engApp)} xDataKey={"createdAt"} barDataKey={"units"} />
                        )}
                    </Box>
                )}
                {activeTab === 1 && <Box flex={1}></Box>}
                {activeTab === 2 && <Box flex={1}></Box>}
                {activeTab === 3 && <Box flex={1}></Box>}
                {activeTab === 4 && <Box flex={1}></Box>}
                {activeTab === 5 && <Box flex={1}></Box>}
            </BasePaper>
        </Box>
    );
}
