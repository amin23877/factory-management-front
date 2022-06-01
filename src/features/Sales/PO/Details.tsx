import React, { useState } from "react";
import { Box, useMediaQuery } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import EditForm from "./EditForm";
import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import { BasePaper } from "app/Paper";

import { customerPoType } from "api/customerPo";

export default function Details({ poData, onDone }: { poData: customerPoType; onDone: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box
      display="grid"
      gridGap={10}
      gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}
      height={phone ? "" : "calc(100vh - 200px)"}
    >
      <EditForm poData={poData} onDone={onDone} />
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
      </BasePaper>
    </Box>
  );
}
