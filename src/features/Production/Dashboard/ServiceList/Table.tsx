import React, { useMemo } from "react";
import { ITicket } from "../../../../api/ticket";
import DataGrid from "../../../../app/NewDataGrid";

export default function Table({ onRowSelected }: { onRowSelected: (row: ITicket) => void }) {
    const cols = useMemo(
        () => [
            {
                name: "date",
                header: "Date",
                type: "date",
                width: 120,
            },
            {
                name: "SO NO",
                render: ({ data }: any) => data?.LineServiceRecordId?.SOId,
                width: 120,
            },
            { name: "Assign", flex: 1 },
            { name: "Ticket NO", width: 120 },
            { name: "Ticket Name", flex: 1 },
            { name: "Unit", render: ({ data }: any) => data?.ItemId?.no, width: 150 },
            { name: "Client", width: 150 },
            { name: "Rep", width: 100 },
            { name: "Package", width: 80 },
            { name: "status", header: "Status", width: 80 },
            { name: "productionStatus", header: "Prod. Status", width: 100 },
        ],
        []
    );

    return <DataGrid columns={cols} url="/ticket" onRowSelected={onRowSelected} />;
}
