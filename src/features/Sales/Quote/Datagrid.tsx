import React, { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
// import { formatTimestampToDate } from "../../../logic/date";

function QuoteDatagrid({
    onRowSelected,
    params,
    url,
}: {
    params?: string;
    url?: string;
    onRowSelected: (row: any) => void;
}) {
    const { data: quotes } = useSWR(url ? url : params ? `/quote?${params}` : "/quote");
    // Date	Quote ID	Client	Rep	State	Requestor	Project Name	Quoted By	SO	Status	Total Amount

    const quoteCols = useMemo<GridColumns>(
        () => [
            {
                field: "Date",
                // valueFormatter: (r) => formatTimestampToDate(r.row?.createdAt),
                width: 100,
            },
            { field: "number", headerName: "Quote ID", width: 100 },
            {
                field: "client",
                headerName: "Client",
                width: 100,
                valueFormatter: (params) => (params.row.client ? params.row.client.name : ""),
            },
            { field: "rep", headerName: "Rep", width: 100 },
            { field: "state", headerName: "State", width: 100 },
            { field: "requester", headerName: "Requester", width: 100 },
            { field: "project", headerName: "Project Name", flex: 1 },
            { field: "quotedBy", headerName: "Quoted By", width: 100 },
            { field: "so", headerName: "SO", width: 100 },
            { field: "status", headerName: "Status", width: 100 },
            { field: "total", headerName: "Total Amount", flex: 1 },
        ],
        []
    );

    return <BaseDataGrid cols={quoteCols} rows={quotes || []} onRowSelected={onRowSelected} />;
}

export default QuoteDatagrid;
