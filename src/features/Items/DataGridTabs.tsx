import React, { useState, useMemo } from "react";
import { Tabs, Tab, useMediaQuery, Box } from "@material-ui/core";

import AuditTable from "common/Audit";
import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";
import { formatTimestampToDate } from "logic/date";
import { VendorModal } from "features/Modals/AddVendor";

import Button from "app/Button";
import VendorsTable from "features/Items/VendorsTable";
import NotesTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import ItemBomTable from "features/BOM/ItemBomTable";
import useSWR from "swr";
import { IItem } from "api/items";
import { LockButton, useLock } from "common/Lock";

const style = {
  border: "1px solid gray ",
  borderRadius: "4px",
  padding: "5px 10px",
  margin: "0px 0px 10px 5px ",
};

export default function DataGridTabs({
  selectedRow,
  boms,
  mutateBoms,
  values,
}: {
  selectedRow: IItem;
  boms?: { result: any[]; total: number };
  values: any;
  mutateBoms: any;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [addVendorModal, setAddVendorModal] = useState(false);

  const { setLock } = useLock();

  const { data: itemUsage } = useSWR<{ result: any[]; total: number }>(
    activeTab === 5 ? (selectedRow && selectedRow.id ? `/usage?ItemId=${selectedRow.id}` : null) : null
  );

  const usageCols = useMemo<GridColumns>(
    () => [
      {
        field: "soNumber",
        headerName: "SO NO.",
        valueFormatter: (params) => params.row?.SOId?.number,
        flex: 1,
      },
      {
        field: "unit",
        headerName: "Unit NO.",
        valueFormatter: (params) => params.row?.UnitId?.number,
        flex: 1,
      },
      {
        field: "unitName",
        headerName: "Device NO.",
        valueFormatter: (params) => {
          let serial = params.row?.UnitId?.serial.split("-");
          serial.pop();
          return serial.join("-");
        },
        flex: 1,
      },
      {
        field: "count",
        headerName: "Usage",
        flex: 1,
      },
      {
        field: "soDate",
        headerName: "SO Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.SOId?.createdAt),
        flex: 1,
      },
    ],
    []
  );

  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      <VendorModal open={addVendorModal} onClose={() => setAddVendorModal(false)} itemId={selectedRow.id as any} />
      <Box display="flex" mb={1} alignItems="center" justifyContent={"space-between"}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => {
            setActiveTab(v);
            setLock(true);
          }}
          textColor="primary"
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
        >
          <Tab label="Document" /> 0
          <Tab label="Vendor" /> 1
          <Tab label="BOM" disabled={!values.bom} /> 2
          <Tab label="Sales order History" /> 3
          <Tab label="PO History" /> 4
          <Tab label="Usage" /> 5
          <Tab label="Note" /> 6
          <Tab label="Auditing" /> 7
        </Tabs>
        <LockButton />
      </Box>
      {activeTab === 0 && <DocumentTab itemId={selectedRow.id} model="item" />}
      {activeTab === 1 && (
        <div style={{ maxWidth: "79vw", overflow: "auto" }}>
          <Button
            onClick={() => {
              setAddVendorModal(true);
            }}
            style={style}
          >
            + Add Vendor
          </Button>
          <VendorsTable selectedItem={selectedRow} />
        </div>
      )}
      {activeTab === 2 && boms && (
        <div style={{ maxWidth: "79vw", overflow: "auto", height: "85%" }}>
          <ItemBomTable item={selectedRow} boms={boms?.result || []} mutateBoms={mutateBoms} />
        </div>
      )}
      {activeTab === 5 && (
        <BaseDataGrid
          cols={usageCols}
          rows={itemUsage?.result || []}
          onRowSelected={() => {}}
          height={"calc(100% - 60px)"}
        />
      )}
      {activeTab === 6 && <NotesTab itemId={selectedRow.id} model="item" />}
      {activeTab === 7 && <AuditTable itemId={selectedRow.id} />}
    </>
  );
}
