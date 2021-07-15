import { GridColumns } from "@material-ui/data-grid";
import React, { useMemo } from "react";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";

export default function DevicesList({ onDeviceSelected }: { onDeviceSelected: (row: any) => void }) {
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

    return <BaseDataGrid cols={cols} rows={devices.items || []} onRowSelected={onDeviceSelected} />;
}
