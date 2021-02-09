import React, { useState, useEffect } from "react";
import { DataGrid, RowData, RowSelectedParams, ColDef } from "@material-ui/data-grid";

import { getAllModelDocuments } from "../../api/document";

export const RecordDocuments = ({
    model,
    itemId,
    onRowSelected,
}: {
    model: string;
    itemId: number;
    onRowSelected?: (row: RowSelectedParams) => void;
}) => {
    const [rows, setRows] = useState([] as RowData[]);

    const cols: ColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Created at", width: 300 },
    ];

    useEffect(() => {
        getAllModelDocuments(model, itemId)
            .then((data) => setRows(data))
            .catch((e) => console.log(e));
    }, [itemId, model]);

    return (
        <div style={{ width: "100%", height: 250 }}>
            <DataGrid columns={cols} rows={rows} onRowSelected={onRowSelected} />
        </div>
    );
};
