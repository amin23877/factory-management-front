import React from "react";
import DataGrid from "../../../app/NewDataGrid";
import { ITicket } from "../../../api/ticket";

export default function Table({ onRowSelected }: { onRowSelected: (d: ITicket) => void }) {
    const cols = [
        {
            name: "startDate",
            header: "Date",
            type: "date",
            minWidth: 110,
        },
        { name: "number", header: "Ticket ID", minWidth: 110 },
        { name: "subject", header: "Subject", minWidth: 110 },
        { name: "Company", header: "Company", minWidth: 110, render: ({ data }: any) => data?.repId?.name },
        { name: "contact", header: "Contact Name", minWidth: 130 },
        { name: "phone", header: "Contact Number", minWidth: 130 },
        { name: "email", header: "Contact Email", minWidth: 130 },
        { name: "state", header: "State", minWidth: 110, render: ({ data }: any) => data?.repId?.state },
        { name: "Zip Code", header: "Zip Code", minWidth: 110, render: ({ data }: any) => data?.repId?.zipcode },
        {
            name: "assignee",
            header: "Assigned to",
            minWidth: 120,
        },
        {
            name: "createdBy",
            header: "Created By",
            minWidth: 120,
            render: ({ data }: any) => data?.AssignedTo?.username,
        },
        { name: "category", header: "Category", minWidth: 110 },
        {
            name: "targetDate",
            header: "Target Date",
            minWidth: 120,
            type: "date",
        },
        { name: "status", header: "Status", minWidth: 110 },
        { name: "tag", header: "tag", minWidth: 110, render: ({ data }: any) => data?.tag?.name },
    ];

    return <DataGrid columns={cols} url="/ticket" onRowSelected={onRowSelected} />;
}
