import React from "react";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../app/BaseDataGrid";

import { ITicket } from "../../api/ticket";

export default function Table({ onRowSelected }: { onRowSelected: (d: ITicket) => void }) {
    const { data: tickets } = useSWR<ITicket[]>("/ticket");

    const cols: GridColDef[] = [
        { field: "description", headerName: "Description", flex: 1 },
        { field: "deadline", headerName: "Deadline", width: 180 },
        { field: "callTime", headerName: "Call time", width: 180 },
        { field: "status", headerName: "Status", width: 180 },
    ];

    return <BaseDataGrid cols={cols} rows={tickets || []} onRowSelected={onRowSelected} />;
}
