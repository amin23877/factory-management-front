import React, { useMemo, useState } from "react";
import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import { ArraySelect } from "../../../app/Inputs";
import BaseDataGrid from "../../../app/BaseDataGrid";

import { splitLevelName } from "../../../logic/levels";

export default function DevicesList({ onDeviceSelected }: { onDeviceSelected: (row: any) => void }) {
    const [selectedProductFamily, setSelectedProductFamily] = useState<string>();
    const { data: filters } = useSWR("/filter");
    const { data: devices } = useSWR(
        selectedProductFamily ? `/item?device=true&Product Family=${selectedProductFamily}` : "/item?device=true"
    );

    const cols = useMemo<GridColumns>(() => {
        const res: GridColumns = [
            { field: "name", flex: 1, headerName: "Name" },
            { field: "description", flex: 1, headerName: "Description" },
            { field: "Product Family", flex: 1 },
        ];

        if (devices) {
            const colsSet = new Set<string>();

            devices.items.forEach((device: any) => {
                device.fields && Object.keys(device.fields).forEach((f) => colsSet.add(f));
            });

            colsSet.forEach((col) => res.push({ field: col, flex: 1, headerName: splitLevelName(col) }));
        }

        return res;
    }, []);

    const productFamily: string[] = filters ? filters.find((f: any) => f.name === "Product Family")?.valid : [];

    return (
        <Box>
            <ArraySelect
                style={{ width: 250 }}
                items={productFamily}
                label="Product Family"
                onChange={(e) => {
                    setSelectedProductFamily(e.target.value);
                }}
            />
            <BaseDataGrid cols={cols} rows={devices ? devices.items : []} onRowSelected={onDeviceSelected} />
        </Box>
    );
}
