import React from "react";
import { GridColDef, GridRowData } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";

export default function ClientOverview({ rows, onRowSelected }: { rows: GridRowData[]; onRowSelected: (row: any) => void }) {
    const cols: GridColDef[] = [
        {
            field: "name",
            flex: 1,
            headerName: "name",
            editable: true,
        },
        {
            field: "size",
            flex: 1,
            headerName: "size",
        },
        {
            field: "address",
            headerName: "address",
            width: 170,
            flex: 1,
            valueFormatter: (d) => {
                return d.row.address?.city;
            },
        },
        {
            field: "contact",
            headerName: "contact",
            flex: 1,
            width: 170,
            valueFormatter: (data) => data.row?.contact?.name,
        },
        {
            field: "phone",
            headerName: "phone",
            width: 170,
            flex: 1,
            valueFormatter: (data) => (data.row.phone ? data.row?.phone?.ext + " " + data.row?.phone?.phone : ""),
        },
        {
            field: "Type",
            flex: 1,
            valueFormatter: (data) => data.row?.ClientType?.name,
        },
    ];

    return <BaseDataGrid rows={rows} onRowSelected={onRowSelected} cols={cols} />;
}
