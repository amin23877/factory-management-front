import { LinearProgress } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import React, { useMemo } from "react";
import useSWR from "swr";
import BaseDataGrid from "../../../app/BaseDataGrid";
import { formatTimestampToDate } from "../../../logic/date";

function SODatagrid({
    onRowSelected,
    params,
    url,
}: {
    onRowSelected: (row: any) => void;
    params?: string;
    url?: string;
}) {
    const { data: sos } = useSWR(url ? url : params ? `/so?${params}` : "/so");

    const cols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 100,
            },
            { field: "number", headerName: "SO ID", width: 100 },
            { field: "Client", width: 130, valueGetter: (data) => data.row.client?.name },
            { field: "description", headerName: "Description", width: 150 },
            { field: "Rep", width: 130, valueGetter: (data) => data.row.repOrAgency?.name },
            { field: "state", headerName: "State", width: 120, valueGetter: (data) => data.row.repOrAgency?.state },
            {
                field: "originalShipDate",
                headerName: "Original SD.",
                valueFormatter: (params) => formatTimestampToDate(params.row?.originalShippingDate),
                width: 120,
            },
            {
                field: "estimatedShipDate",
                headerName: "Estimated SD.",
                valueFormatter: (params) => formatTimestampToDate(params.row?.estimatedShipDate),
                width: 120,
            },
            {
                field: "actualShipDate",
                headerName: "Actual SD.",
                valueFormatter: (params) => formatTimestampToDate(params.row?.actualShipDate),
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

    if (!sos) {
        return <LinearProgress />;
    }

    return <BaseDataGrid cols={cols} rows={sos || []} onRowSelected={onRowSelected} />;
}

export default SODatagrid;
