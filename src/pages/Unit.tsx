import React, { useState, useMemo } from "react";
import { Container, Box, Paper } from "@material-ui/core";
import { DataGrid, GridColDef, GridToolbar } from "@material-ui/data-grid";
import useSWR from "swr";
import { endOfWeek, endOfMonth } from "date-fns";

import { ChangeUnitModal } from "../features/Unit/ChangeUnitModal";
import UnitBomModal from "../features/UBOM/UBomModal";

import Button from "../app/Button";
import { DateInput } from "../components/Filters/Date";

import { IUnit } from "../api/units";

export default function Unit() {
    const [open, setOpen] = useState<boolean>(false);
    const [bOpen, setBOpen] = useState<any>();
    const [selected, setSelected] = useState<IUnit>();
    const [topDateFilter, setTopDateFilter] = useState<"week" | "month">();

    const [finish, setFinish] = useState<string>();
    const { data: units } = useSWR(finish ? `/unit?finish=${finish}` : "/unit");

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

    const dateStringToUnix = (date: Date) => {
        return String(Math.round(new Date(date).getTime() / 1000));
    };

    return (
        <Container>
            <UnitBomModal open={bOpen} onClose={() => setBOpen(false)} unitId={bOpen} />
            <ChangeUnitModal
                open={open}
                onClose={() => setOpen(false)}
                unit={selected ? selected : ({} as IUnit)}
                openBom={(id) => {
                    setBOpen(id);
                }}
            />

            <Box display="flex" alignItems="center" my={1}>
                <Button
                    color={topDateFilter === "week" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week");
                        setFinish(dateStringToUnix(endOfWeek(new Date())));
                    }}
                >
                    This week
                </Button>
                <Button
                    color={topDateFilter === "month" ? "primary" : "default"}
                    variant="contained"
                    style={{ margin: "0 0.5em" }}
                    onClick={() => {
                        setTopDateFilter("month");
                        setFinish(dateStringToUnix(endOfMonth(new Date())));
                    }}
                >
                    This month
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
                <Box height={550}>
                    <DataGrid
                        columns={unitCols}
                        rows={units || []}
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
                            setSelected(i.data as any);
                            setOpen(true);
                        }}
                    />
                </Box>
            </Paper>
        </Container>
    );
}
