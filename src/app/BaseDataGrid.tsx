import React from "react";
import { Box } from "@material-ui/core";
import { DataGrid, RowData, ColDef } from "@material-ui/data-grid";

export default function BaseDataGrid({
    onRowSelected,
    rows,
    cols,
    height,
}: {
    onRowSelected: (row: any) => void;
    rows: RowData[];
    cols: ColDef[];
    height?: number;
}) {
    return (
        <Box my={2}>
            <Box display="flex">
                <div
                    style={{
                        height: height ? height : 450,
                        width: "100%",
                        margin: "1em 0",
                        backgroundColor: "#fff",
                        borderRadius: "1em",
                        border: "1px solid #ccc",
                    }}
                >
                    <DataGrid
                        onRowSelected={(r) => {
                            onRowSelected(r.data);
                        }}
                        columns={cols}
                        rows={rows}
                    />
                </div>
            </Box>
        </Box>
    );
}
