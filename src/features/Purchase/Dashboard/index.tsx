import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "app/BaseDataGrid";
import { formatTimestampToDate } from "logic/date";
import { BasePaper } from "app/Paper";

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
  { field: "qtyUsed", headerName: "Qty Used", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "statusQty", headerName: "Status Qty", width: 120 },
  { field: "qtyRemain", headerName: "Qty Remain", width: 120 },
  { field: "dateExpected", headerName: "Date Expected", width: 120 },
];

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const { data: purchasingRequiredItems } = useSWR<{ result: any[]; total: number }>(
    "/notification?type=Purchasing Required"
  );

  return (
    <BasePaper>
      <Tabs textColor="primary" value={tab} onChange={(e, nv) => setTab(nv)} style={{ marginBottom: 10 }}>
        <Tab label="Purchasing Required List" />
      </Tabs>
      <BaseDataGrid cols={cols} rows={purchasingRequiredItems?.result || []} />
    </BasePaper>
  );
}
