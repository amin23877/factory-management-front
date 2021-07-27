import { LinearProgress } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import React from "react";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";

import { IField } from "../../../api/field";
import { splitLevelName } from "../../../logic/levels";

export default function FieldTable({ onRowSelected }: { onRowSelected?: (row: IField) => void }) {
    const { data: fields } = useSWR<IField[]>("/field");
    const rows = fields ? fields.map((f) => ({ ...f, headerName: splitLevelName(f.name) })) : [];

    const cols: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "valid", headerName: "Valid", flex: 1 },
        { field: "type", headerName: "Type", flex: 1 },
        { field: "default", headerName: "Default", flex: 1 },
        { field: "filterName", headerName: "Filter Name", flex: 1 },
        { field: "filterValue", headerName: "Filter Value", flex: 1 },
    ];

    if (!fields) {
        return <LinearProgress />;
    }

    return <BaseDataGrid cols={cols} rows={rows} height={350} onRowSelected={onRowSelected} />;
}
