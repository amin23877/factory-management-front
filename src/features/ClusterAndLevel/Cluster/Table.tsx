import React from "react";
import { LinearProgress } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { IFilter } from "../../../api/filter";

export default function FilterTable({ onFilterSelected }: { onFilterSelected: (row: IFilter) => void }) {
    const { data: filters } = useSWR<IFilter[]>("/filter");
    const cols: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "valid", headerName: "Valid", flex: 1 },
    ];

    if (!filters) {
        return <LinearProgress />;
    }

    return <BaseDataGrid cols={cols} rows={filters} onRowSelected={(r) => onFilterSelected(r)} height={300} />;
}
