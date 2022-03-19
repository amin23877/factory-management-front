import React, { useState, useMemo } from "react";
import { Box, useMediaQuery } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GridColumns } from "@material-ui/data-grid";

import EditForm from "./EditForm";
import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";

import BaseDataGrid from "app/BaseDataGrid";

import { IPO } from "api/po";
import { BasePaper } from "app/Paper";

export default function Details({ poData, onDone }: { poData: IPO; onDone: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");

  const LICols = useMemo<GridColumns>(
    () => [
      { field: "index", headerName: "Sort" },
      { field: "ItemId", headerName: "Part Number", valueFormatter: (r) => r.row.ItemId?.name, width: 200 },
      { field: "description", headerName: "Description", flex: 1 },
      { field: "quantity", headerName: "QTY", width: 90 },
      { field: "price", headerName: "Price", width: 100 },
      { field: "tax", headerName: "Tax", type: "boolean", width: 80 },
      { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row.quantity, width: 200 },
    ],
    []
  );

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
          <Tab label="Line Items" />
          <Tab label="Documents" />
          <Tab label="Notes" />
          <Tab label="Auditing" />
        </Tabs>
        {activeTab === 0 && <BaseDataGrid cols={LICols} rows={[]} height="calc(100% - 60px)" />}
        {activeTab === 1 && <DocumentTab itemId={poData.id} model="salesPo" />}
        {activeTab === 2 && <NoteTab itemId={poData.id} model="salesPo" />}
      </BasePaper>
    </Box>
  );
}
