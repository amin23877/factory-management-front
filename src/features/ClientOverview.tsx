import React from "react";
import { ColDef, RowData } from "@material-ui/data-grid";

import BaseDataGrid from "../app/BaseDataGrid";

export default function ClientOverview({ rows, onRowSelected }: { rows: RowData[]; onRowSelected: (row: any) => void }) {
    const cols: ColDef[] = [
        { field: "name", headerName: "name" },
        { field: "website", headerName: "website" },
        { field: "linkedIn", headerName: "linkedIn" },
        { field: "instagram", headerName: "instagram" },
        { field: "abbr", headerName: "abbr" },
        { field: "location", headerName: "location", width: 170 },
        { field: "size", headerName: "size" },
        { field: "prospect", headerName: "prospect" },
    ];

    return <BaseDataGrid rows={rows} onRowSelected={onRowSelected} cols={cols} />;
}
