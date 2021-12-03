import React from "react";
import DataGrid from "../../app/NewDataGrid";
import { ITicket } from "../../api/ticket";

export default function Table({ onRowSelected }: { onRowSelected: (d: ITicket) => void }) {
    const cols = [
        {
            name: "date",
            header: "Date",
            type: "date",
            width: 110,
        },
        { name: "number", header: "Ticket ID", width: 110 },
        { name: "subject", header: "Subject", width: 110 },
        { name: "Company", header: "Company", width: 110, render: ({ data }: any) => data?.repOrAgency?.name },
        { name: "contactName", header: "Contact Name", width: 130 },
        { name: "contactNumber", header: "Contact Number", width: 130 },
        { name: "contactEmail", header: "Contact Email", width: 130 },
        { name: "state", header: "State", width: 110, render: ({ data }: any) => data?.repOrAgency?.state },
        { name: "Zip Code", header: "Zip Code", width: 110, render: ({ data }: any) => data?.repOrAgency?.zipcode },
        {
            name: "assignedTo",
            header: "Assigned to",
            width: 120,
            render: ({ data }: any) => data?.AssignedTo?.username,
        },
        {
            name: "createdBy",
            header: "Created By",
            width: 120,
            render: ({ data }: any) => data?.AssignedTo?.username,
        },
        { name: "Category", header: "Category", width: 110, render: ({ data }: any) => data?.category?.name },
        {
            name: "deadline",
            header: "Target Date",
            width: 120,
            type: "date",
        },
        { name: "status", header: "Status", width: 110, render: ({ data }: any) => data?.status?.name },
        { name: "tag", header: "tag", width: 110, render: ({ data }: any) => data?.tag?.name },
    ];

    return <DataGrid columns={cols} url="/ticket" onRowSelected={onRowSelected} />;
}
