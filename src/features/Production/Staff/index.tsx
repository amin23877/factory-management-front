import React from "react";

import Box from "@material-ui/core/Box";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { GridColDef } from "@material-ui/data-grid";
import useSwr from "swr";
import { formatTimestampToDate } from "../../../logic/date";
import { BasePaper } from "../../../app/Paper";

function Index() {
    const { data: staffs } = useSwr("/prodtask");

    const cols: GridColDef[] = [
        { field: "Name", valueFormatter: (r) => r.row?.UnitId?.assignee?.firstName, flex: 1 },
        { field: "Last Name", valueFormatter: (r) => r.row?.UnitId?.assignee?.lastName, flex: 1 },
        { field: "Role", valueFormatter: (r) => r.row?.UnitId?.assignee?.position, flex: 1 },
        {
            field: "Task",
            valueFormatter: (r) => r.row?.EngEvalTaskId?.id || r.row?.EngManTaskId?.id || r.row?.EngTestTaskId?.id,
            flex: 1,
        },
        {
            field: "Assigned Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.assginDate),
            flex: 1,
        },
    ];

    return (
        <BasePaper>
            <BaseDataGrid cols={cols} rows={staffs || []} onRowSelected={(d) => {}} height={635} />
        </BasePaper>
    );
}

export default Index;
