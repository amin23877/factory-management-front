import React, { useState, useMemo } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import BaseDataGrid from "app/BaseDataGrid";

import NoteTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import ContactTab from "common/Contact/Tab";
import AddressTab from "common/Address/Tab";
// import SOTab from "common/SOHistory/Tab";
import SOTab from "features/Sales/SO/Datagrid";
import QuoteTab from "features/Sales/Quote/Datagrid";
import AuditTable from "common/Audit";

import { IActivity } from "api/activity";
import useSWR from "swr";
import { LockButton, useLock } from "common/Lock";
import { IClient } from "api/client";
import { GridColumns } from "@material-ui/data-grid";

export default function DataGridTabs({ selectedRow }: { selectedRow: IClient }) {
  const [activeTab, setActiveTab] = useState(0);

  const { data: activities } = useSWR<{ result: IActivity[]; total: number }>(
    activeTab === 2 ? `/activity/client/${selectedRow?.id}` : null
  );
  const phone = useMediaQuery("(max-width:900px)");
  const { setLock } = useLock();

  const activityCols = useMemo<GridColumns>(
    () => [
      { field: "startTime", headerName: "Entry Date", width: 150, type: "date" },
      { field: "number", headerName: "Quote ID", flex: 1 },
      { field: "project", headerName: "Project Name", flex: 1 },
      { field: "quotedBy", headerName: "Quoted By", flex: 1 },
      { field: "requestedBy", headerName: "Requested By", flex: 1 },
      { field: "note", headerName: "Note" },
    ],
    []
  );

  return (
    <>
      <Box display={"flex"} alignItems="center" mb={1} justifyContent="space-between">
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, v) => {
            setActiveTab(v);
            setLock(true);
          }}
          variant="scrollable"
          style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
          scrollButtons={phone ? "on" : "auto"}
        >
          <Tab label="Contacts" /> 0
          <Tab label="Documents" /> 1
          <Tab label="Activities" /> 2
          <Tab label="Sales History" /> 3
          <Tab label="Work Orders" /> 4
          <Tab label="Notes" /> 5
          <Tab label="Addresses" /> 6
          <Tab label="Auditing" /> 7
        </Tabs>
        <LockButton />
      </Box>
      {activeTab === 0 && <ContactTab itemId={selectedRow.id} model="client" />}
      {activeTab === 1 && <DocumentTab itemId={selectedRow.id} model="client" />}
      {activeTab === 2 && (
        <BaseDataGrid
          height="calc(100% - 60px)"
          cols={activityCols}
          rows={activities?.result || []}
          onRowSelected={() => {}}
        />
      )}
      {activeTab === 3 && (
        <SOTab onRowSelected={() => {}} params={{ ClientId: selectedRow.id }} style={{ height: "64vh" }} />
      )}
      {activeTab === 4 && (
        <QuoteTab onRowSelected={() => {}} params={{ ClientId: selectedRow.id }} style={{ height: "64vh" }} />
      )}
      {activeTab === 5 && <NoteTab itemId={selectedRow.id} model="client" />}
      {activeTab === 6 && <AddressTab model="client" itemId={selectedRow.id} />}
      {activeTab === 7 && <AuditTable itemId={selectedRow.id} />}
    </>
  );
}
