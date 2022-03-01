import React from "react";
import { Container, Typography } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "app/BaseDataGrid";
import { formatTimestampToDate } from "logic/date";

const cols: GridColumns = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    width: 180,
    valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
  },
  { field: "so", headerName: "SO", width: 80 },
  { field: "unit", headerName: "Unit", width: 80 },
  { field: "no", headerName: "Device ID", flex: 1, valueFormatter: (params) => params?.row?.data?.no },
  { field: "body", headerName: "Note", flex: 2 },
  {
    field: "EA",
    headerName: "E.A.",
    width: 80,
    type: "boolean",
    valueFormatter: (params) => params.row?.ItemId?.engineeringApproved,
  },
  { field: "priority", headerName: "Priority", width: 100 },
  { field: "qty", headerName: "Quantity", width: 100 },
];

export default function Dashboard() {
  const { data: purchasingRequiredItems } = useSWR<{ result: any[]; total: number }>(
    "/notification?type=Purchasing Required"
  );

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: "1em" }}>
        Purchasing Required List
      </Typography>
      <BaseDataGrid cols={cols} rows={purchasingRequiredItems?.result || []} />
    </Container>
  );
}
