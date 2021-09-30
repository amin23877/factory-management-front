import React, { useMemo } from "react";
import { DataGrid, GridColumns, GridToolbar } from "@material-ui/data-grid";

import { formatTimestampToDate } from "../../../logic/date";
import { useDataGridData } from "../../../components/Datagrid/hooks";
import { ParameterType } from "../../../logic/utils";
// import { formatTimestampToDate } from "../../../logic/date";

function QuoteDataGrid({
    onRowSelected,
    params,
    url,
}: {
    params?: ParameterType;
    url?: string;
    onRowSelected: (row: any) => void;
}) {
    const { dataGridClasses, loading, page, rows, setPage } = useDataGridData({ params, url: "/quote" });

    const cols = useMemo<GridColumns>(
        () => [
            {
                field: "Date",
                valueFormatter: (r) => formatTimestampToDate(r.row?.createdAt),
                width: 100,
            },
            { field: "number", headerName: "Quote ID", width: 100 },
            {
                field: "client",
                headerName: "Client",
                width: 100,
                valueFormatter: (params) => params.row?.client?.name,
            },
            { field: "rep", headerName: "Rep", width: 100, valueFormatter: (params) => params.row?.repOrAgency?.name },
            {
                field: "state",
                headerName: "State",
                width: 100,
                valueFormatter: (params) => params.row?.repOrAgency?.name,
            },
            { field: "requesterName", headerName: "Requester", width: 100 },
            {
                field: "project",
                headerName: "Project Name",
                flex: 1,
                valueFormatter: (params) => params.row?.ProjectId?.name,
            },
            {
                field: "quotedBy",
                headerName: "Quoted By",
                width: 100,
                valueFormatter: (params) => params.row?.salesperson?.username,
            },
            { field: "so", headerName: "SO", width: 100, valueFormatter: (params) => params.row?.SOId?.number },
            { field: "status", headerName: "Status", width: 100 },
            { field: "total", headerName: "Total Amount", flex: 1 },
        ],
        []
    );

    return (
        <div
            style={{
                flexGrow: 1,
                height: 500,
            }}
        >
            <DataGrid
                loading={loading}
                density="compact"
                components={{ Toolbar: GridToolbar }}
                className={dataGridClasses.root}
                onRowSelected={(r) => {
                    onRowSelected && onRowSelected(r.data);
                }}
                columns={cols}
                pagination
                paginationMode="server"
                page={page}
                onPageChange={(p) => setPage(p.page)}
                pageSize={25}
                rows={rows ? rows.result : []}
                rowCount={rows ? rows.total : 0}
            />
        </div>
    );
}

export default QuoteDataGrid;
