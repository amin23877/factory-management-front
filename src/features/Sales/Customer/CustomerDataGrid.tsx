import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@material-ui/data-grid";

import usePaginatedData from "../../../components/Datagrid/hooks";
//	Status

export default function CustomerDataGrid({
    url,
    onRowSelected,
    params,
}: {
    params?: string;
    url: string;
    onRowSelected: (row: any) => void;
}) {
    const { dataGridClasses, loading, page, rows, setPage } = usePaginatedData({ url, params });

    const cols: GridColDef[] = [
        {
            field: "number",
            width: 120,
            headerName: "Customer ID",
            editable: true,
        },
        {
            field: "name",
            width: 120,
            headerName: "Name",
            editable: true,
        },
        {
            field: "state",
            width: 120,
            headerName: "State",
            editable: true,
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

    // FIXME: *rows.results* should change to *rows.result* from api response
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
                rows={rows ? (rows as any).results : []}
                rowCount={rows ? rows.total : 0}
            />
        </div>
    );
}
