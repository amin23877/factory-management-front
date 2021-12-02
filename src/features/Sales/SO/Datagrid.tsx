import React, { useMemo } from "react";

import { ParameterType } from "../../../logic/utils";
import DataGrid from "../../../app/NewDataGrid";

function SODataGrid({ onRowSelected, params }: { onRowSelected: (row: any) => void; params?: ParameterType }) {
    const columns = useMemo(
        () => [
            {
                name: "date",
                header: "Date",
                minWidth: 100,
                type: "date",
            },
            { name: "number", header: "SO ID", minWidth: 100 },
            { name: "Client", minWidth: 100, render: ({ data }: any) => data?.client?.name },
            { name: "description", header: "Description", minWidth: 150 },
            { name: "Rep", minWidth: 130, render: ({ data }: any) => data?.repOrAgency?.name },
            { name: "state", header: "State", minWidth: 120, render: ({ data }: any) => data?.repOrAgency?.state },

            {
                name: "estimatedShipDate",
                header: "Estimated SD.",
                minWidth: 120,
                type: "date",
            },
            {
                name: "actualShipDate",
                header: "Actual SD.",
                minWidth: 120,
                type: "date",
            },
            { name: "status", header: "Status", minWidth: 120 },
            {
                name: "totalOrder",
                header: "Total Amount",
                minWidth: 120,
                type: "number",
            },
        ],
        []
    );

    return <DataGrid url="/so" onRowSelected={onRowSelected} columns={columns} initParams={params} />;
}

export default SODataGrid;
