import React from "react";
import { ColDef, RowData } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";

export default function ClientOverview({ rows, onRowSelected }: { rows: RowData[]; onRowSelected: (row: any) => void }) {
    const cols: ColDef[] = [
        {
            field: "name",
            headerName: "name",
        },
        { field: "size", headerName: "size" },
        { field: "address", headerName: "address", width: 170, valueGetter: ({ data }) => (data.address ? data.address.address : "") },
        {
            field: "contact",
            headerName: "contact",
            width: 170,
            valueGetter: ({ data }) => (data.contact ? data.contact.firstName + " " + data.contact.lastName : ""),
        },
        {
            field: "phone",
            headerName: "phone",
            width: 170,
            valueGetter: ({ data }) => (data.phone ? data.phone.ext + " " + data.phone.phone : ""),
        },
        {
            field: "Type",
            valueGetter: ({ data }) => data.ClientType.name,
        },
    ];

    return <BaseDataGrid rows={rows} onRowSelected={onRowSelected} cols={cols} />;
}
