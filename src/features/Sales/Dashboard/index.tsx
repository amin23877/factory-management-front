import React, { useMemo } from "react";
import { Box, Typography, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "app/BaseDataGrid";
import { BasePaper } from "app/Paper";

import { ClientPie, DevicesPie, SalesLocationPie, SalesRepPie, SalesVsWeek } from "./Charts";
import { formatTimestampToDate } from "logic/date";

export default function Dashboard() {
  const { data: inProgressSOs } = useSWR(`/so?progress=true`);

  const cols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params: any) => formatTimestampToDate(params.row?.date),
        width: 100,
      },
      { field: "number", headerName: "SO ID", width: 100 },
      { field: "Client", width: 130, valueGetter: (data) => (data.row.ClientId ? data.row.ClientId.name : "") },
      { field: "description", headerName: "Description", width: 150 },
      { field: "Rep", width: 130, valueGetter: (data) => (data.row.ClientId ? data.row.ClientId.name : "") },
      { field: "state", headerName: "State", width: 120 },
      {
        field: "originalShipDate",
        headerName: "Original SD.",
        valueFormatter: (params) => formatTimestampToDate(params.row?.originalShippingDate),
        width: 120,
      },
      {
        field: "estimatedShipDate",
        headerName: "Estimated SD.",
        valueFormatter: (params) => formatTimestampToDate(params.row?.estimatedShippingDate),
        width: 120,
      },
      {
        field: "actualShipDate",
        headerName: "Actual SD.",
        valueFormatter: (params) => formatTimestampToDate(params.row?.actualShippingDate),
        width: 120,
      },
      { field: "invoice", headerName: "Invoice", width: 120 },
      { field: "status", headerName: "Status", width: 120 },
      {
        field: "total",
        headerName: "Total Amount",
        valueFormatter: (params) => params.row?.cost * params.row?.quantity,
        width: 120,
      },
    ],
    []
  );
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box display="grid" gridTemplateColumns={phone ? "1fr" : "1fr 1fr"} gridGap={10}>
      <BasePaper style={phone ? {} : { gridColumnEnd: "span 2" }}>
        <Typography variant="subtitle1">Sales Per Week(Last 30 days)</Typography>
        <SalesVsWeek />
      </BasePaper>

      <BasePaper>
        <Typography variant="subtitle1">Snapshot For Each Device</Typography>
        <DevicesPie />
      </BasePaper>

      <BasePaper>
        <Typography variant="subtitle1">Snapshot For Location</Typography>
        <SalesLocationPie />
      </BasePaper>

      <BasePaper>
        <Typography variant="subtitle1">Snapshot For Each Client</Typography>
        <ClientPie />
      </BasePaper>

      <BasePaper>
        <Typography variant="subtitle1">Snapshot For Each Rep</Typography>
        <SalesRepPie />
      </BasePaper>

      <BasePaper style={phone ? {} : { gridColumnEnd: "span 2" }}>
        <Typography variant="subtitle1">In progress SOs</Typography>
        <BaseDataGrid cols={cols} rows={inProgressSOs ? inProgressSOs.result : []} height={350} />
      </BasePaper>
    </Box>
  );
}
