import React, { useState } from "react";
import { Box, LinearProgress, useMediaQuery } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import EditForm from "../../../features/Sales/PO/EditForm";
import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import { BasePaper } from "app/Paper";

import { customerPoType } from "api/customerPo";
import AuditTable from "common/Audit";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export default function Details() {
  const { poId } = useParams<{ poId: string }>();
  const { data: poData } = useSWR<customerPoType>(poId ? `/customerPo/${poId}` : null);

  const [activeTab, setActiveTab] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");

  if (!poData) {
    return <LinearProgress />;
  }

  return (
    <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}>
      <EditForm poData={poData} />
      <BasePaper>
        <Tabs
          style={{ marginBottom: "10px" }}
          textColor="primary"
          value={activeTab}
          onChange={(e, nv) => setActiveTab(nv)}
          variant="scrollable"
        >
          <Tab label="Documents" />
          <Tab label="Notes" />
          <Tab label="Auditing" />
        </Tabs>
        {activeTab === 0 && <DocumentTab itemId={poData.id} model="salesPo" />}
        {activeTab === 1 && <NoteTab itemId={poData.id} model="salesPo" />}
        {activeTab === 2 && <AuditTable itemId={poData.id} />}
      </BasePaper>
    </Box>
  );
}
