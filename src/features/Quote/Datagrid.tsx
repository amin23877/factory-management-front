import React, { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../app/BaseDataGrid";

function QuoteDatagrid({ onRowSelected, params }: { params?: string; onRowSelected: (row: any) => void }) {
    const { data: quotes } = useSWR(params ? `/quote?${params}` : "/quote");

    const quoteCols = useMemo<GridColumns>(
        () => [
            { field: "entryDate", width: 150 },
            { field: "expireDate", width: 150 },
            { field: "quoteStatus", width: 150 },
        ],
        []
    );

    return <BaseDataGrid cols={quoteCols} rows={quotes || []} onRowSelected={onRowSelected} />;
}

export default QuoteDatagrid;
