import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@material-ui/data-grid";

import { useDataGridData } from "../../../components/Datagrid/hooks";

export default function CustomerDataGrid({
    url,
    onRowSelected,
    params,
}: {
    params?: { [key: string]: any };
    url: string;
    onRowSelected: (row: any) => void;
}) {
    const { dataGridClasses, loading, page, rows, setPage } = useDataGridData({ url, params });

    const cols: GridColDef[] = [
        {
            field: "number",
            width: 120,
            headerName: "Customer ID",
        },
        {
            field: "name",
            width: 120,
            headerName: "Name",
            flex: 1,
        },
        {
            field: "state",
            width: 120,
            headerName: "State",
        },
        {
            field: "city",
            width: 120,
            headerName: "City",
        },
        {
            field: "zipcode",
            headerName: "Zip Code",
            width: 120,
        },
        {
            field: "productLine",
            width: 120,
            headerName: "Product Line",
        },
        {
            field: "supportStaff",
            width: 120,
            headerName: "Support Staff",
            valueFormatter: (data) => data.row?.supportStaff?.username,
        },
        {
            field: "contact",
            headerName: "Main Contact",
            width: 130,
            valueFormatter: (data) => data.row?.contact?.firstName,
            hide: true,
        },

        {
            field: "phone",
            headerName: "Phone",
            width: 150,
            // valueFormatter: (data) => (data.row.phone ? data.row?.phone?.ext + " " + data.row?.phone?.phone : ""),
        },
        {
            field: "email",
            headerName: "Email",
            width: 150,
            hide: true,

            // valueFormatter: (data) => (data.row.phone ? data.row?.phone?.ext + " " + data.row?.phone?.phone : ""),
        },
        {
            field: "Type",
            width: 100,
            valueFormatter: (data) => data.row?.CustomerTypeId?.name,
        },
        {
            field: "status",
            width: 100,
            headerName: "Status",
        },
    ];

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
