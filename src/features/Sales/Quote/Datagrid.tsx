import React, { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";

function QuoteDatagrid({
    onRowSelected,
    params,
    url,
}: {
    params?: string;
    url?: string;
    onRowSelected: (row: any) => void;
}) {
    const { data: quotes } = useSWR(url ? url : params ? `/quote?${params}` : "/quote");

    const quoteCols = useMemo<GridColumns>(
        () => [
            { field: "entryDate", headerName: "Entry Date", flex: 1 },
            { field: "expireDate", headerName: "Expire Date", flex: 1 },
            { field: "quoteStatus", headerName: "Status", flex: 1 },
        ],
        []
    );

    return <BaseDataGrid cols={quoteCols} rows={quotes || []} onRowSelected={onRowSelected} />;
}

export default QuoteDatagrid;
