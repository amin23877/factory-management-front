import React, { useState } from "react";
import { Box, LinearProgress, Tab, Tabs } from "@material-ui/core";

import Form from "features/Engineering/BOM/Details/Form";
import Levels from "features/Engineering/BOM/Details/Levels";
import MatrixTable from "features/Engineering/BOM/Table";
import { BasePaper } from "app/Paper";
import PhotoTab from "common/PhotoTab";

import { clusterType } from "api/cluster";
import useSWR from "swr";
import { useParams } from "react-router-dom";

export default function Details() {
  const [activeTab, setActiveTab] = useState(0);
  const { clusterId } = useParams<{ clusterId: string }>();
  const { data: selectedRow } = useSWR<clusterType>(clusterId ? `/cluster/${clusterId}` : null);
  const { data: levels } = useSWR<any>(selectedRow ? `/level?clusterId=${selectedRow.id}` : null);

  if (!selectedRow) {
    return <LinearProgress />;
  }

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
          <Tab label="matrix" disabled={!(levels?.result && levels?.result?.length > 0)} />
        </Tabs>
        {activeTab === 0 && <Levels selectedRow={selectedRow} />}
        {activeTab === 1 && <MatrixTable cluster={selectedRow} />}
      </BasePaper>
    </Box>
  );
}
