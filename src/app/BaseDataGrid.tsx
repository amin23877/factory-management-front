import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { DataGrid, RowData, ColDef } from "@material-ui/data-grid";

const useStyles = makeStyles({
    dataGridCont: {
        width: "100%",
        borderRadius: 8,
    },
    root: {
        backgroundColor: "#f9f9f9",
        border: "none",

        "& .MuiDataGrid-columnsContainer": {
            backgroundColor: "#202731",
            color: "#fff",
            borderRadius: " 10px 10px 0 0",
        },
        "& .MuiDataGrid-cell": {
            border: "1px solid #f0f1f5",
        },
        "& .MuiDataGrid-iconSeparator": {
            display: "none",
            width: 0,
            height: 0,
            opacity: 0,
        },
        "& .Mui-selected": {
            boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "#fff !important",
        },
        "& .MuiDataGrid-sortIcon": {
            fill: "white",
        },
    },
});

interface IBaseDataGrid {
    onRowSelected: (row: any) => void;
    rows: RowData[];
    cols: ColDef[];
    height?: number;
}

export default function BaseDataGrid({ onRowSelected, rows, cols, height }: IBaseDataGrid) {
    const classes = useStyles();

    const updatedCols = cols.map((x) => {
        let obj = Object.keys(x);
        let check = false;
        for (let o in obj) {
            if (o == "flex") {
                check = true;
            }
        }
        if (!check) {
            x = { ...x, flex: 1 };
        }
        return x;
    });

    return (
        <Box display="flex" style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", border: "none" }}>
            <div
                className={classes.dataGridCont}
                style={{
                    height: height ? height : 450,
                }}
            >
                <DataGrid
                    className={classes.root}
                    onRowSelected={(r) => {
                        onRowSelected(r.data);
                    }}
                    columns={updatedCols}
                    rows={rows}
                />
            </div>
        </Box>
    );
}
