import React from "react";
import { ColDef, RowData } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";

export default function ClientOverview({ rows, onRowSelected }: { rows: RowData[]; onRowSelected: (row: any) => void }) {
    const cols: ColDef[] = [
        {
            field: "name",
            flex: 1,
            headerName: "name",
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
            valueGetter: ({ data }) => (data.address ? data?.address?.address : ""),
        },
        {
            field: "contact",
            headerName: "contact",
            flex: 1,
            width: 170,
            valueGetter: ({ data }) => (data.contact ? data?.contact?.name : ""),
        },
        {
            field: "phone",
            headerName: "phone",
            width: 170,
            flex: 1,
            valueGetter: ({ data }) => (data.phone ? data?.phone?.ext + " " + data?.phone?.phone : ""),
        },
        {
            field: "Type",
            flex: 1,
            valueGetter: ({ data }) => data?.ClientType?.name,
        },
    ];

    return <BaseDataGrid rows={rows} onRowSelected={onRowSelected} cols={cols} />;
}
