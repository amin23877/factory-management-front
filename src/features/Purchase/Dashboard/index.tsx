import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";

import { formatTimestampToDate } from "logic/date";
import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";

function getStatus({ data }: any) {
  // On hand, On order, To purchase
  if (!data) {
    return { status: "Need To Purchase", qty: 0 };
  }
  const availableQty = Number(data?.id?.onHandQty || 0) - Number(data?.id?.allocatedQty || 0);
  if (data.quantity < availableQty) {
    return { status: "On Hand", qty: Number(data?.id?.onHandQty || 0) };
  }
  if (data.quantity < data?.id?.onOrderQty) {
    return { status: "On Order", qty: Number(data?.id?.onOrderQty || 0) };
  }
  return { status: "Need To Purchase", qty: Number(data.quantity || 0) };
}

const cols = [
  {
    name: "date",
    header: "Date",
    type: "string",
    width: 120,
    render: ({ data }: any) => formatTimestampToDate(data?.createdAt),
  },
  { name: "so", header: "SO Number", width: 120 },
  { name: "unit", header: "Unit Number", width: 120 },
  { name: "itemNo", header: "Item Number", type: "string", width: 120, render: ({ data }: any) => data?.data?.no },
  { name: "itemName", header: "Item Name", type: "string", width: 120, render: ({ data }: any) => data?.data?.name },
  {
    name: "itemDescription",
    header: "Item Description",
    type: "string",
    flex: 1,
    render: ({ data }: any) => data?.data?.id?.description,
  },
  {
    name: "qtyUsed",
    header: "Qty Used",
    type: "string",
    width: 120,
    render: ({ data }: any) => data?.data?.quantity || 0,
  },
  { name: "status", header: "Status", type: "string", width: 120, render: ({ data }: any) => getStatus(data).status },
  {
    name: "statusQty",
    header: "Status Qty",
    type: "string",
    width: 120,
    render: ({ data }: any) => getStatus(data).qty,
  },
  { name: "qtyRemain", header: "Qty Remain", type: "string", width: 120 },
  { name: "dateExpected", header: "Date Expected", type: "string", width: 120 },
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
