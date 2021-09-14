import React, { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../../app/BaseDataGrid";

import { formatTimestampToDate } from "../../../../logic/date";
import { ITicket } from "../../../../api/ticket";

export default function Table({ onRowSelected }: { onRowSelected: (row: ITicket) => void }) {
    const { data: tickets } = useSWR<ITicket[]>("/ticket");

    // TODO: Assign, Ticket NO, Ticket Name, Client, Rep, Package,
    const cols = useMemo<GridColumns>(
        () => [
            {
                field: "createdAt",
                headerName: "Date",
                type: "date",
                valueFormatter: (params) => formatTimestampToDate(params.row.createdAt),
                width: 120,
                disableColumnMenu: true,
            },
            {
                field: "SO NO",
                valueFormatter: (params) => params.row?.LineServiceRecordId?.SOId,
                width: 120,
                disableColumnMenu: true,
            },
            { field: "Assign", flex: 1, disableColumnMenu: true },
            { field: "Ticket NO", width: 120, disableColumnMenu: true },
            { field: "Ticket Name", flex: 1, disableColumnMenu: true },
            { field: "Unit", valueFormatter: (params) => params.row?.ItemId?.no, width: 150, disableColumnMenu: true },
            { field: "Client", width: 150, disableColumnMenu: true },
            { field: "Rep", width: 100, disableColumnMenu: true },
            { field: "Package", width: 80, disableColumnMenu: true },
            { field: "status", headerName: "Status", width: 80, disableColumnMenu: true },
            { field: "productionStatus", headerName: "Prod. Status", width: 100, disableColumnMenu: true },
        ],
        []
    );

    return <BaseDataGrid cols={cols} rows={tickets || []} onRowSelected={onRowSelected} />;
}
