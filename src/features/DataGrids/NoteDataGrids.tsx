import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

import { getAllModelNotes, INote } from "../../api/note";

export const RecordNotes = ({ model, itemId, onRowSelected }: { model: string; itemId: number; onRowSelected?: (row: any) => void }) => {
    const [rows, setRows] = useState<INote[]>([]);

    const cols = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    useEffect(() => {
        getAllModelNotes(model, itemId as any)
            .then((data) => setRows(data))
            .catch((e) => console.log(e));
    }, [itemId, model]);

    return (
        <div style={{ width: "100%", height: 250 }}>
            <DataGrid columns={cols} rows={rows} onRowSelected={onRowSelected} />
        </div>
    );
};
