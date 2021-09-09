import React, { useState, useMemo } from "react";
import { Box, Paper } from "@material-ui/core";
import { addDays } from "date-fns";
import { DataGrid, GridColDef, GridToolbar, GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import Button from "../../../../app/Button";
import { DateInput } from "../../../../components/Filters/Date";
import { UnitSearchBox } from "../../../../app/SearchBox";
import { formatTimestampToDate } from "../../../../logic/date";
import { useDataGridStyles } from "../../../../app/BaseDataGrid";
function Table({
    setActiveTab,
    setSelectedUnit,
}: {
    setSelectedUnit: (a: any) => void;
    setActiveTab: (a: any) => void;
}) {
    const [topDateFilter, setTopDateFilter] = useState<"week" | "week2" | "week3" | "week4">();
    const [finish, setFinish] = useState<string>();

    const { data: units } = useSWR(finish ? `/unit?finish=${finish}` : "/unit");

    const classes = useDataGridStyles();

    const dateStringToUnix = (date: Date) => {
        return String(Math.round(new Date(date).getTime() / 1000));
    };

    const unitCols = useMemo<GridColDef[]>(() => {
        const cols: GridColumns = [
            {
                field: "EST. Ship Date",
                valueFormatter: (r) => formatTimestampToDate(r.row?.estimatedShipDate),
                width: 130,
            },
            { field: "SO NO.", headerName: "SO NO.", width: 100 },
            { field: "Assign", headerName: "Assign", width: 100 },
            { field: "number", headerName: "Unit", width: 100 },
            { field: "Device", headerName: "Device", width: 110 },
            { field: "Client", headerName: "Client", width: 110 },
            { field: "Rep", headerName: "Rep", width: 110 },
            { field: "Production Status", headerName: "Production Status", width: 140 },
            { field: "Package", headerName: "Package", width: 100 },
            { field: "status", headerName: "Status", width: 100 },
            { field: "Time Left", headerName: "Time Left", width: 100 },
            // {
            //     field: "dueDate",
            //     headerName: "Due Date",
            //     flex: 1,
            //     type: "date",
            //     valueFormatter: (d: any) => new Date(d.row.dueDate),
            // },
        ];
        const dateColumn = cols.find((column: any) => column.field === "dueDate")!;
        const dateColIndex = cols.findIndex((column: any) => column.field === "dueDate");
        const dateOperators = [
            {
                label: "Finish",
                value: "finish",
                getApplyFilterFn: () => null,
                InputComponent: DateInput,
                InputComponentProps: { value: finish },
            },
        ];

        cols[dateColIndex] = { ...dateColumn, filterOperators: dateOperators };
        return cols;
    }, [finish]);

    return (
        <Box>
            <UnitSearchBox />
            <Box display="flex" alignItems="center" my={1}>
                <Button
                    color={topDateFilter === "week" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week");
                        setFinish(dateStringToUnix(addDays(new Date(), 7)));
                    }}
                >
                    XX Units Due this Week
                </Button>
                <Button
                    color={topDateFilter === "week2" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week2");
                        setFinish(dateStringToUnix(addDays(new Date(), 7 * 2)));
                    }}
                    style={{ margin: "0 0.5em" }}
                >
                    XX Units Due Week 2
                </Button>
                <Button
                    color={topDateFilter === "week3" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week3");
                        setFinish(dateStringToUnix(addDays(new Date(), 7 * 3)));
                    }}
                >
                    XX Units Due Week 3
                </Button>
                <Button
                    color={topDateFilter === "week4" ? "primary" : "default"}
                    variant="contained"
                    style={{ margin: "0 0.5em" }}
                    onClick={() => {
                        setTopDateFilter("week4");
                        setFinish(dateStringToUnix(addDays(new Date(), 4 * 7)));
                    }}
                >
                    XX Units Due Week 4
                </Button>
                <Button
                    onClick={() => {
                        setTopDateFilter(undefined);
                        setFinish(undefined);
                    }}
                >
                    clear
                </Button>
                <div style={{ marginLeft: "auto" }} />
            </Box>
            <Paper>
                <Box height={350}>
                    <DataGrid
                        density="compact"
                        className={classes.root}
                        columns={unitCols}
                        rows={units ? units.result : []}
                        filterMode="server"
                        components={{ Toolbar: GridToolbar }}
                        onFilterModelChange={(f) => {
                            const date = f.filterModel.items[0].value;
                            if (date) {
                                const finishUnix = Math.round(new Date(date).getTime() / 1000);
                                setFinish(String(finishUnix));
                            }
                        }}
                        onRowSelected={(i) => {
                            setSelectedUnit(i.data as any);
                            setActiveTab(1);
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default Table;
