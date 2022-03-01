import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSWR from "swr";

import { BasePaper } from "app/Paper";
import BaseLineChart from "app/Chart/LineChart";
import { extractEngAppData } from "logic/reports/dashboard";

export default function Report() {
  const [activeTab, setActiveTab] = useState(0);

  const { data: engApp } = useSWR<{ result: any[]; total: number }>(
    activeTab === 0 ? "/notification?type=Engineering Approval" : null
  );

  const engAppData = useMemo(
    () => (engApp && engApp?.result?.length ? extractEngAppData(engApp.result) : []),
    [engApp]
  );

  return (
    <Box height="78.7vh">
      <BasePaper>
        <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
          <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
            <Tab label="Eng. AP." />
            <Tab label="Purchase" />
            <Tab label="F.S.H." />
            <Tab label="Phocus Monitor Flags" />
            <Tab label="Quality Control Flags" />
          </Tabs>
          <div style={{ flexGrow: 1 }} />
        </Box>
        {activeTab === 0 && (
          <Box flex={1}>{engApp && <BaseLineChart data={engAppData} xDataKey="date" barDataKey="units" />}</Box>
        )}
        {activeTab === 1 && <Box flex={1}></Box>}
        {activeTab === 2 && (
          <Box flex={1}>
            <BaseLineChart data={[]} xDataKey="date" barDataKey="units" />
          </Box>
        )}
        {activeTab === 3 && <Box flex={1}></Box>}
        {activeTab === 4 && <Box flex={1}></Box>}
        {activeTab === 5 && <Box flex={1}></Box>}
      </BasePaper>
    </Box>
  );
}
