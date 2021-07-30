import React from "react";
import { LinearProgress } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../app/BaseDataGrid";

import { fetcher } from "../../api";
import { IJob } from "../../api/job";

export default function Table({ onRowSelected }: { onRowSelected: (d: IJob) => void }) {
    const { data: jobs } = useSWR<IJob[]>("/job", fetcher);
    const cols: GridColDef[] = [
        { field: "description", headerName: "Description", flex: 1 },
        { field: "deadline", headerName: "Deadline", width: 180 },
        { field: "callTime", headerName: "Call time", width: 180 },
        { field: "status", headerName: "Status", width: 180 },
    ];

    if (!jobs) {
        return <LinearProgress />;
    }

    return <BaseDataGrid cols={cols} rows={jobs} onRowSelected={onRowSelected} />;
}
