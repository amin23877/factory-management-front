import React from "react";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../app/BaseDataGrid";

// import { fetcher } from "../../api";
import { ITicket } from "../../api/ticket";
import { formatTimestampToDate } from "../../logic/date";
import { BasePaper } from "../../app/Paper";

export default function Table({ onRowSelected }: { onRowSelected: (d: ITicket) => void }) {
    const { data: tickets } = useSWR<ITicket[]>("/ticket");

    const cols: GridColDef[] = [
        {
            field: "Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.date),
            width: 110,
        },
        { field: "number", headerName: "Ticket ID", width: 110 },
        { field: "subject", headerName: "Subject", width: 110 },
        { field: "Company", headerName: "Company", width: 110, valueGetter: (data) => data.row.repOrAgency?.name },
        { field: "contactName", headerName: "Contact Name", width: 130 },
        { field: "contactNumber", headerName: "Contact Number", width: 130 },
        { field: "contactEmail", headerName: "Contact Email", width: 130 },
        { field: "state", headerName: "State", width: 110, valueGetter: (data) => data.row.repOrAgency?.state },
        { field: "Zip Code", headerName: "Zip Code", width: 110, valueGetter: (data) => data.row.repOrAgency?.zipcode },
        {
            field: "assignedTo",
            headerName: "Assigned to",
            width: 120,
            valueGetter: (data) => data.row.AssignedTo?.username,
        },
        {
            field: "createdBy",
            headerName: "Created By",
            width: 120,
            valueGetter: (data) => data.row.AssignedTo?.username,
        },
        { field: "Category", headerName: "Category", width: 110, valueGetter: (data) => data.row.category?.name },
        {
            field: "deadline",
            headerName: "Target Date",
            width: 120,
            valueFormatter: (r) => formatTimestampToDate(r.row?.deadline),
        },
        { field: "status", headerName: "Status", width: 110, valueGetter: (data) => data.row.status?.name },
        { field: "tag", headerName: "tag", width: 110, valueGetter: (data) => data.row.tag?.name },
    ];

    // if (!tickets) {
    //     return <LinearProgress />;
    // }

    return (
        <BasePaper>
            <BaseDataGrid height="73vh" cols={cols} rows={tickets || []} onRowSelected={onRowSelected} />
        </BasePaper>
    );
}
