import React from "react";
import { Box } from "@material-ui/core";
// import { FindInPageRounded, SearchRounded } from "@material-ui/icons";
import { DataGrid, RowData, ColDef } from "@material-ui/data-grid";

// import { BasePaper } from "../app/Paper";
// import { BaseTextInput } from "../app/Inputs";

export default function BaseDataGrid({
    onRowSelected,
    rows,
    cols,
}: {
    onRowSelected: (row: any) => void;
    rows: RowData[];
    cols: ColDef[];
}) {
    // const [rows, setRows] = useState([] as RowData[]);

    // const cols: ColDef[] = [
    //     { field: "no", headerName: "Item no" },
    //     { field: "name", headerName: "Item name" },
    //     { field: "description", headerName: "desc" },
    //     { field: "category", valueGetter: (c) => c.data.Category.name, headerName: "cetegory" },
    //     { field: "type", valueGetter: (c) => c.data.Type.name, headerName: "type" },
    //     { field: "cost", headerName: "Cost" },
    // ];

    return (
        <Box my={2}>
            <Box display="flex">
                <div
                    style={{
                        height: 450,
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
