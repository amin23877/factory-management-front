import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";

import Form from "./Form";
import Levels from "./Levels";
import { BasePaper } from "app/Paper";
import PhotoTab from "common/PhotoTab";

import { clusterType } from "api/cluster";

export default function Details({ selectedRow }: { selectedRow: clusterType }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box display="grid" gridTemplateColumns="2fr 10fr" style={{ gap: 8 }}>
      <Box>
        <BasePaper style={{ marginBottom: 8 }}>
          <Form initialValues={selectedRow} />
        </BasePaper>
        <BasePaper>
          <PhotoTab model="cluster" id={selectedRow.id} />
        </BasePaper>
      </Box>
      <BasePaper>
        <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
          <Tab label="Levels" />
          <Tab label="matrix" />
        </Tabs>
        {activeTab === 0 && <Levels selectedRow={selectedRow} />}
      </BasePaper>
    </Box>
  );
}
