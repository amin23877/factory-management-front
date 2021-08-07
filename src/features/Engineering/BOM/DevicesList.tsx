import React, { useMemo, useState } from "react";
import { Box, Paper } from "@material-ui/core";
import { DataGrid, GridColumns, GridFilterItem, GridToolbar } from "@material-ui/data-grid";
import useSWR from "swr";

import { splitLevelName } from "../../../logic/levels";

export default function DevicesList({ onDeviceSelected }: { onDeviceSelected: (row: any) => void }) {
    const [selectedFilter, setSelectedFilter] = useState<GridFilterItem>();
    const { data: devices } = useSWR<{ total: number; result: any[] }>(
        selectedFilter && selectedFilter.value
            ? `/item?device=true&${selectedFilter.columnField}=${selectedFilter.value}`
            : "/item?device=true"
    );

    const cols = useMemo<GridColumns>(() => {
        const res: GridColumns = [
            { field: "name", flex: 1, headerName: "Name" },
            { field: "description", flex: 1, headerName: "Description" },
            { field: "Product Family", flex: 1 },
        ];

        if (devices && devices.result) {
            const colsSet = new Set<string>();

            devices.result.forEach((device: any) => {
                device.fields && Object.keys(device.fields).forEach((f) => colsSet.add(f));
            });

            colsSet.forEach((col) => res.push({ field: col, flex: 1, headerName: splitLevelName(col) }));
        }

        return res;
    }, [devices]);

    return (
        <Paper>
            <Box height={450}>
                <DataGrid
                    filterMode="server"
                    onFilterModelChange={(filters) => {
                        console.log(filters.filterModel.items[0]);
                        setSelectedFilter(filters.filterModel.items[0]);
                    }}
                    columns={cols}
                    rows={devices ? devices.result : []}
                    onRowSelected={(params) => onDeviceSelected(params.data)}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Paper>
    );
}
