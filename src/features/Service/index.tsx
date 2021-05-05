import React from "react";
import { ColDef } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";
import { IFieldService } from "../../api/fieldService";

export default function ServiceIndex({
    fieldServices,
    onFieldServiceSelected,
}: {
    fieldServices: any[];
    onFieldServiceSelected: (fs: IFieldService) => void;
}) {
    const cols: ColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "price", headerName: "Price" },
        { field: "length", headerName: "Length" },
    ];

    return <BaseDataGrid cols={cols} rows={fieldServices} onRowSelected={onFieldServiceSelected} />;
}
