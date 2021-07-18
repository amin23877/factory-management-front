import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import React, { useMemo } from "react";
import useSWR from "swr";
import { IFilter } from "../../../api/filter";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { ArraySelect, FieldSelect } from "../../../app/Inputs";

export default function DevicesList({ onDeviceSelected }: { onDeviceSelected: (row: any) => void }) {
    const { data: filters } = useSWR("/filter");
    const { data: devices } = useSWR("/item?device=true");
    const cols = useMemo<GridColumns>(() => {
        const res: GridColumns = [
            { field: "name", flex: 1 },
            { field: "Product Family", flex: 1 },
        ];

        if (devices) {
            const colsSet = new Set<string>();

            devices.items.forEach((device: any) => {
                Object.keys(device.fields).forEach((f) => colsSet.add(f));
            });

            colsSet.forEach((col) => res.push({ field: col, flex: 1 }));
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
                onChange={(e) => onDeviceSelected({ "Product Family": e.target.value })}
            />
            <BaseDataGrid cols={cols} rows={devices.items || []} onRowSelected={onDeviceSelected} />
        </Box>
    );
}
