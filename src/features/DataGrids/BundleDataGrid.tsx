import React, { useState, useEffect } from "react";
import { DataGrid, RowData, RowSelectedParams, ColDef } from "@material-ui/data-grid";

import { getChildItems } from "../../api/childItems";

export const RecordChildItems = ({
    parentItemId,
    onRowSelected,
}: {
    parentItemId: string;
    onRowSelected?: (row: RowSelectedParams) => void;
}) => {
    const [rows, setRows] = useState<RowData[]>([]);

    const cols: ColDef[] = [
        // { field: "name", headerName: "Name" },
        { field: "id", headerName: "id" },
        { field: "quantity", headerName: "Quantity" },
        { field: "createdAt", headerName: "Created at", width: 200 },
    ];

    useEffect(() => {
        getChildItems(parentItemId)
            .then((data) => {
                if (data.status !== 400) {
                    setRows(data);
                }
            })
            .catch((e) => console.log(e));
    }, [parentItemId]);

    return (
        <div style={{ width: "100%", height: 250 }}>
            <DataGrid columns={cols} rows={rows} onRowSelected={onRowSelected} />
        </div>
    );
};
