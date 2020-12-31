import React, { useState, useEffect } from "react";
import { DataGrid, RowData, RowSelectedParams, ColDef } from "@material-ui/data-grid";

import { getAllModelNotes } from "../../api/note";

export const RecordNotes = ({
    model,
    itemId,
    onRowSelected,
}: {
    model: string;
    itemId: string;
    onRowSelected?: (row: RowSelectedParams) => void;
}) => {
    const [rows, setRows] = useState([] as RowData[]);

    const cols: ColDef[] = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    useEffect(() => {
        getAllModelNotes(model, itemId)
            .then((data) => setRows(data))
            .catch((e) => console.log(e));
    }, [itemId, model]);

    return (
        <div style={{ width: "100%", height: 250 }}>
            <DataGrid columns={cols} rows={rows} onRowSelected={onRowSelected} />
        </div>
    );
};
