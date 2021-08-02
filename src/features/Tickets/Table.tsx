import React from "react";
import { LinearProgress } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../app/BaseDataGrid";

import { fetcher } from "../../api";
import { ITicket } from "../../api/ticket";

export default function Table({ onRowSelected }: { onRowSelected: (d: ITicket) => void }) {
    const { data: tickets } = useSWR<ITicket[]>("/ticket", fetcher);
    const cols: GridColDef[] = [
        { field: "description", headerName: "Description", flex: 1 },
        { field: "deadline", headerName: "Deadline", width: 180 },
        { field: "callTime", headerName: "Call time", width: 180 },
        { field: "status", headerName: "Status", width: 180 },
    ];

    if (!tickets) {
        return <LinearProgress />;
    }

    return <BaseDataGrid cols={cols} rows={tickets} onRowSelected={onRowSelected} />;
}
