import React, { useMemo, useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import ReceivingTab from "features/Purchase/PO/Receiving";
import { ILineItem } from "api/lineItem";
import { IPurchasePO } from "api/purchasePO";

import AuditTable from "common/Audit";
import NotesTab from "common/Note/Tab";
import DocumentsTab from "common/Document/Tab";
import BaseDataGrid from "app/BaseDataGrid";
import { Box, useMediaQuery } from "@material-ui/core";
import { LockButton, useLock } from "common/Lock";

export default function DataGridTabs({ selectedPO }: { selectedPO: IPurchasePO }) {
  const phone = useMediaQuery("(max-width:900px)");
  const { data: lines } = useSWR<{ result: ILineItem[]; total: number }>(`/polineitem?POId=${selectedPO?.id}`);
  const { setLock } = useLock();

  const [activeTab, setActiveTab] = useState(0);

  const LICols = useMemo<GridColumns>(
    () => [
      { field: "ItemId", headerName: "Item No.", valueFormatter: (r) => r.row.ItemId?.no, width: 120 },
      { field: "ItemName", headerName: "Item Name", valueFormatter: (r) => r.row.ItemId?.name, flex: 1 },
      {
        field: "Vendor P.NO.",
        valueFormatter: (r) => r.row.ItemId?.vendorPartNumber,
        width: 120,
      },
      { field: "orderedQuantity", headerName: "QTY", width: 90 },
      {
        field: "UOM",
        valueFormatter: (r) => r.row.ItemId?.uom,
        width: 100,
      },
      { field: "cost", headerName: "Cost", width: 100 },
      {
        field: "total",
        headerName: "Total",
        valueFormatter: (r) => Number(r.row?.cost) * Number(r.row?.orderedQuantity),
        width: 100,
      },
      { field: "Status", headerName: "Status", width: 100 },
      { field: "notes", headerName: "Notes", width: 100 },
    ],
    []
  );
  return (
    <>
      <Box display={"flex"} alignItems="center" justifyContent="space-between">
        <Tabs
          textColor="primary"
          value={activeTab}
          onChange={(e, nv) => {
            setActiveTab(nv);
            setLock(true);
          }}
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "1em" } : { marginBottom: "1em" }}
        >
          <Tab label="Line items" />
          <Tab label="Documents" />
          <Tab label="Receiving" />
          <Tab label="Notes" />
          <Tab label="Auditing" />
        </Tabs>
        <LockButton />
      </Box>
      {activeTab === 0 && (
        <BaseDataGrid
          rows={lines?.result || []}
          cols={LICols}
          onRowSelected={(d) => {
            // TODO: edit line item
          }}
          height={"calc(100% - 60px)"}
        />
      )}
      {activeTab === 1 && <DocumentsTab itemId={selectedPO.id} model="purchasePo" />}
      {activeTab === 2 && <ReceivingTab POId={selectedPO.id} />}
      {activeTab === 3 && <NotesTab itemId={selectedPO.id} model="purchasePo" />}
      {activeTab === 4 && <AuditTable itemId={selectedPO.id} />}
    </>
  );
}
