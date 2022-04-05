import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";

import { formatTimestampToDate } from "logic/date";
import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";

function getStatus({ data }: any) {
  // On hand, On order, To purchase
  if (!data) {
    return { status: "Need To Purchase", qty: 0 };
  }
  const availableQty = Number(data.onHandQty || 0) - Number(data.allocatedQty || 0);
  if (data.quantity < availableQty) {
    return { status: "On Hand", qty: Number(data.onHandQty || 0) };
  }
  if (data.quantity < data.onOrderQty) {
    return { status: "On Order", qty: Number(data.onOrderQty || 0) };
  }
  return { status: "Need To Purchase", qty: Number(data.quantity || 0) };
}

const cols: GridColumns = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    width: 120,
    valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
  },
  { field: "so", headerName: "SO Number", width: 120 },
  { field: "unit", headerName: "Unit Number", width: 120 },
  { field: "itemNo", headerName: "Item Number", width: 120, valueFormatter: (params) => params?.row?.data?.no },
  { field: "itemName", headerName: "Item Name", width: 120, valueFormatter: (params) => params?.row?.data?.no },
  {
    field: "itemDescription",
    headerName: "Item Description",
    width: 180,
    valueFormatter: (params) => params?.row?.data?.no,
  },
  {
    field: "qtyUsed",
    headerName: "Qty Used",
    width: 120,
    valueFormatter: (params) => params?.row?.data?.quantity || 0,
  },
  { field: "status", headerName: "Status", width: 120, valueFormatter: (p) => getStatus(p?.row).status },
  { field: "statusQty", headerName: "Status Qty", width: 120, valueFormatter: (p) => getStatus(p?.row).qty },
  { field: "qtyRemain", headerName: "Qty Remain", width: 120 },
  { field: "dateExpected", headerName: "Date Expected", width: 120 },
];

export default function Dashboard() {
  const [tab, setTab] = useState(0);

  return (
    <BasePaper>
      <Tabs textColor="primary" value={tab} onChange={(e, nv) => setTab(nv)} style={{ marginBottom: 10 }}>
        <Tab label="Purchasing Required List" />
        <Tab label="Fulfillment List" />
      </Tabs>
      {tab === 0 && (
        <NewDataGrid columns={cols} url="/notification?type=Purchasing Required" onRowSelected={() => {}} />
      )}
      {/* {activeTab === 1 && (
        <NewDataGrid columns={cols} url="/" onRowSelected={() => {}} />
      )} */}
    </BasePaper>
  );
}
