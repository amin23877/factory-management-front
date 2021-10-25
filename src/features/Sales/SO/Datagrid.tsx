import React, { useMemo } from "react";
import { GridColumns, DataGrid, GridToolbar } from "@material-ui/data-grid";

import { formatTimestampToDate } from "../../../logic/date";
import { useDataGridData } from "../../../components/Datagrid/hooks";
import { ParameterType } from "../../../logic/utils";

function SODataGrid({
    onRowSelected,
    params,
    url,
}: {
    onRowSelected: (row: any) => void;
    params?: ParameterType;
    url?: string;
}) {
    const { dataGridClasses, loading, page, rows, setPage } = useDataGridData({ params, url: "/so" });

    const cols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
                width: 100,
            },
            { field: "number", headerName: "SO ID", width: 100 },
            { field: "Client", flex: 1, valueGetter: (data) => data.row.client?.name },
            { field: "description", headerName: "Description", width: 150 },
            { field: "Rep", width: 130, valueGetter: (data) => data.row.repOrAgency?.name },
            { field: "state", headerName: "State", width: 120, valueGetter: (data) => data.row.repOrAgency?.state },
            {
                field: "originalShipDate",
                headerName: "Original SD.",
                valueFormatter: (params) => formatTimestampToDate(params.row?.originalShippingDate),
                width: 120,
                hide: true,
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
            { field: "invoice", headerName: "Invoice", width: 120, hide: true },
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

export default SODataGrid;
