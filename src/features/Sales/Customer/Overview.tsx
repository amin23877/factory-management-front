import React from "react";
import { GridColDef, GridRowData } from "@material-ui/data-grid";

import BaseDataGrid from "../../../app/BaseDataGrid";
//	Status

export default function ClientOverview({
    rows,
    onRowSelected,
}: {
    rows: GridRowData[];
    onRowSelected: (row: any) => void;
}) {
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

    return <BaseDataGrid rows={rows} onRowSelected={onRowSelected} cols={cols} />;
}
