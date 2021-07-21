import { LinearProgress } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import React, { useMemo } from "react";
import useSWR from "swr";
import BaseDataGrid from "../../app/BaseDataGrid";

function SODatagrid({
    onRowSelected,
    params,
    url,
}: {
    onRowSelected: (row: any) => void;
    params?: string;
    url?: string;
}) {
    const { data: sos } = useSWR(url ? url : params ? `/so?${params}` : "/so");

    const cols = useMemo<GridColumns>(
        () => [
            { field: "number" },
            { field: "Client", valueGetter: (data) => (data.row.ClientId ? data.row.ClientId.name : "") },
            { field: "Project", valueGetter: (data) => (data.row.ProjectId ? data.row.ProjectId.name : "") },
        ],
        []
    );

    if (!sos) {
        return <LinearProgress />;
    }

    return <BaseDataGrid cols={cols} rows={sos || []} onRowSelected={onRowSelected} />;
}

export default SODatagrid;
