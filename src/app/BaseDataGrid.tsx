import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { DataGrid, RowData, ColDef } from "@material-ui/data-grid";

const useStyles = makeStyles({
    dataGridCont: {
        width: "100%",
        margin: "1em 0",
        backgroundColor: "#fff",
        borderRadius: 8,
        border: "1px solid #ccc",
    },
});

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
    const classes = useStyles();

    return (
        <Box my={2}>
            <Box display="flex">
                <div
                    className={classes.dataGridCont}
                    style={{
                        height: height ? height : 450,
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
