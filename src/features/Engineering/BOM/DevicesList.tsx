import React, { useMemo, useState } from "react";
import { Box, Paper } from "@material-ui/core";
import { DataGrid, GridColumns, GridFilterItem, GridToolbar } from "@material-ui/data-grid";
import useSWR from "swr";
import { makeStyles } from "@material-ui/core";

import { splitLevelName } from "../../../logic/levels";

export const useDataGridStyles = makeStyles({
    root: {
        backgroundColor: "#f9f9f9",
        border: "none",

        "& .MuiDataGrid-columnsContainer": {
            backgroundColor: "#202731",
            color: "#fff",
            // borderRadius: " 10px 10px 0 0",
        },
        "& .MuiDataGrid-iconSeparator": {
            display: "none",
            width: 0,
            height: 0,
            opacity: 0,
        },
        "& .Mui-selected": {
            boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "#fff !important",
        },
        "& .MuiDataGrid-sortIcon": {
            fill: "white",
        },
    },
});

export default function DevicesList({ onDeviceSelected }: { onDeviceSelected: (row: any) => void }) {
    const classes = useDataGridStyles();

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
            <Box height={"81.5vh"}>
                <DataGrid
                    density="compact"
                    filterMode="server"
                    onFilterModelChange={(filters) => {
                        console.log(filters.filterModel.items[0]);
                        setSelectedFilter(filters.filterModel.items[0]);
                    }}
                    className={classes.root}
                    columns={cols}
                    rows={devices ? devices.result : []}
                    onRowSelected={(params) => onDeviceSelected(params.data)}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Paper>
    );
}
