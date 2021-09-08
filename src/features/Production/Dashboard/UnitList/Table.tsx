import React, { useState, useMemo } from "react";
import { Box, Paper } from "@material-ui/core";
import { addDays } from "date-fns";
import { DataGrid, GridColDef, GridToolbar } from "@material-ui/data-grid";
import useSWR from "swr";

import Button from "../../../../app/Button";
import { DateInput } from "../../../../components/Filters/Date";
import { UnitSearchBox } from "../../../../app/SearchBox";

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

    const dateStringToUnix = (date: Date) => {
        return String(Math.round(new Date(date).getTime() / 1000));
    };

    const unitCols = useMemo<GridColDef[]>(() => {
        const cols: any = [
            { field: "number", headerName: "Serial No." },
            { field: "laborCost", headerName: "Labor Cost" },
            {
                field: "dueDate",
                headerName: "Due Date",
                flex: 1,
                type: "date",
                valueFormatter: (d: any) => new Date(d.row.dueDate),
            },
            { field: "status", headerName: "Status" },
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
                    XX Units Due This Week
                </Button>
                <Button
                    color={topDateFilter === "week2" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week2");
                        setFinish(dateStringToUnix(addDays(new Date(), 7 * 2)));
                    }}
                >
                    XX Units Due This Week2
                </Button>
                <Button
                    color={topDateFilter === "week3" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week3");
                        setFinish(dateStringToUnix(addDays(new Date(), 7 * 3)));
                    }}
                >
                    XX Units Due This Week3
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
                    XX Units Due Week4
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
