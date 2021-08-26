import React, { useMemo } from "react";
import { Grid, Typography } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";
import PieChart from "../../../app/Chart/PieChart";

import { ClientPie, DevicesPie, SalesVsWeek } from "./Charts";
import { formatTimestampToDate } from "../../../logic/date";

const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
];

export default function Dashboard() {
    const { data: inProgressSOs } = useSWR(`/so?progress=true`);

    const cols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params: any) => formatTimestampToDate(params.row?.createdAt),
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
    // TODO: each location, each Rep

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <BasePaper>
                    <Typography variant="h6">Sales Per Week</Typography>
                    <SalesVsWeek />
                </BasePaper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <BasePaper>
                    <Typography variant="h6">Snapshot For Each Device</Typography>
                    <DevicesPie />
                </BasePaper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <BasePaper>
                    <Typography variant="h6">Snapshot For Location</Typography>
                    <PieChart data={data02} dataKey="value" height={250} />
                </BasePaper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <BasePaper>
                    <Typography variant="subtitle1">Snapshot For Each Customer</Typography>
                    <ClientPie />
                </BasePaper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <BasePaper>
                    <Typography variant="subtitle1">Snapshot For Each Rep</Typography>
                    <PieChart data={data02} dataKey="value" height={250} />
                </BasePaper>
            </Grid>
            <Grid item xs={12} sm={12}>
                <BasePaper>
                    <Typography variant="h6">In progress SOs</Typography>
                    <BaseDataGrid cols={cols} rows={inProgressSOs || []} height={350} />
                </BasePaper>
            </Grid>
        </Grid>
    );
}
