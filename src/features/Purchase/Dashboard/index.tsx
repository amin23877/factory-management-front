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
    width: 180,
    valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
  },
  { field: "so", headerName: "SO Number", width: 120 },
  { field: "unit", headerName: "Unit Number", width: 120 },
  { field: "no", headerName: "Item Number", flex: 1, valueFormatter: (params) => params?.row?.data?.no },
  { field: "no", headerName: "Item Name", flex: 1, valueFormatter: (params) => params?.row?.data?.no },
  { field: "no", headerName: "Item Description", flex: 1, valueFormatter: (params) => params?.row?.data?.no },
  { field: "body", headerName: "Qty Used", flex: 2 },
  { field: "body", headerName: "Status", flex: 2 },
  { field: "body", headerName: "Status Qty", flex: 2 },
  { field: "body", headerName: "Qty Remain", flex: 2 },
  { field: "body", headerName: "Date Expected", flex: 2 },
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
