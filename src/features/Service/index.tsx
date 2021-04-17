import React from "react";
import { ColDef, RowData } from "@material-ui/data-grid";

import BaseDataGrid from "../../app/BaseDataGrid";

export default function ServiceIndex() {
    const cols: ColDef[] = [{ field: "name" }];

    return <BaseDataGrid cols={cols} rows={[]} onRowSelected={() => {}} />;
}
