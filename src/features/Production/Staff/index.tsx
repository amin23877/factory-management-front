import React from "react";

import Box from "@material-ui/core/Box";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { GridColDef } from "@material-ui/data-grid";
import useSwr from "swr";
import { formatTimestampToDate } from "../../../logic/date";

function Index() {
    const { data: staffs } = useSwr("/");

    const cols: GridColDef[] = [
        { field: "Name", headerName: "Name", flex: 1 },
        { field: "Last Name", headerName: "Last Name", flex: 1 },
        { field: "Role", headerName: "Role", flex: 1 },
        { field: "Task", headerName: "Task", flex: 1 },
        {
            field: "Assigned Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.createdAt),
            flex: 1,
        },
    ];

    return (
        <Box>
            <BaseDataGrid cols={cols} rows={[]} onRowSelected={(d) => {}} />
        </Box>
    );
}

export default Index;
