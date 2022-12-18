import React, { useState, useMemo } from "react";
import { Tabs, Tab, useMediaQuery, Box } from "@material-ui/core";
import Button from "app/Button";

import AuditTable from "common/Audit";
import NewDataGrid from "app/NewDataGrid";
import { formatTimestampToDate } from "logic/date";
import { VendorModal } from "features/Modals/AddVendor";

import VendorsTable from "features/Items/VendorsTable";
import NotesTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import ItemBomTable from "features/BOM/ItemBomTable";
import SOTab from "features/Sales/SO/Datagrid";
import POTab from "features/Purchase/PO/Datagrid";

import useSWR from "swr";
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
  selectedRow: any;
  boms?: { result: any[]; total: number };
  values: any;
  mutateBoms: any;
}) {
  console.log("selectedRoweUSAGE: ", selectedRow);

  const [activeTab, setActiveTab] = useState(0);
  const [addVendorModal, setAddVendorModal] = useState(false);
  const { setLock } = useLock();
  const selected = selectedRow?.result?.find(() => true);
  const { data: itemUsage } = useSWR<{ result: any[]; total: number }>(
    activeTab === 5 ? (selectedRow && selected.id ? `/usage?ItemId=${selected.id}` : null) : null
  );

  const usageCols = useMemo(
    () => [
      { name: "soNumber", header: "SO NO.", render: ({ data }: any) => data?.SOId?.number, flex: 1 },
      { name: "unit", header: "Unit NO.", render: ({ data }: any) => data?.UnitId?.number, flex: 1 },
      {
        name: "unitName",
        header: "Device NO.",
        render: ({ data }: any) => {
          let serial = data?.UnitId?.serial.split("-");
          serial.pop();
          return serial.join("-");
        },
        flex: 1,
      },
      { name: "count", header: "Usage", flex: 1 },
      {
        name: "soDate",
        header: "SO Date",
        render: ({ data }: any) => formatTimestampToDate(data?.SOId?.createdAt),
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
      {activeTab === 3 && (
        <SOTab onRowSelected={() => {}} params={{ ItemId: selectedRow.id }} style={{ height: "64vh" }} />
      )}
      {activeTab === 4 && (
        <POTab onRowSelected={() => {}} params={{ ItemId: selectedRow.id }} style={{ height: "64vh" }} />
      )}
      {activeTab === 5 && (
        <NewDataGrid columns={usageCols} url={`/usage?ItemId=${selected.id}`} onRowSelected={(r) => {}} />
      )}
      {activeTab === 6 && <NotesTab itemId={selectedRow.id} model="item" />}
      {activeTab === 7 && <AuditTable itemId={selectedRow.id} />}
    </>
  );
}
