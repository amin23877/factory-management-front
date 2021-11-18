import React, { useState, useMemo, useEffect } from "react";
import { Box, Paper } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { addDays } from "date-fns";

import Button from "../../../../app/Button";
// import { UnitSearchBox } from "../../../../app/SearchBox";
// import { useDataGridStyles } from "../../../../app/BaseDataGrid";
import { UnitSearchBox } from "../../../../app/SearchBox";
import { DateInput } from "../../../../components/Filters/Date";

// import { useDataGridData } from "../../../../components/Datagrid/hooks";
import { formatTimestampToDate } from "../../../../logic/date";
import { get } from "../../../../api";
import FullDataGrid from "../../../../components/Datagrid/FullDataGrid";
import { IUnit } from "../../../../api/units";
import { BasePaper } from "../../../../app/Paper";

const dateStringToUnix = (date: Date) => {
    return String(Math.round(new Date(date).getTime() / 1));
};

function Table({ onRowSelected }: { onRowSelected: (row: IUnit) => void }) {
    const [topDateFilter, setTopDateFilter] = useState<"week" | "week2" | "week3" | "week4">();
    const [finish, setFinish] = useState<string>();
    const [start, setStart] = useState<string>();
    const [week, setWeek] = useState<any>();
    const [week2, setWeek2] = useState<any>();
    const [week3, setWeek3] = useState<any>();
    const [week4, setWeek4] = useState<any>();

    const sWeek = dateStringToUnix(new Date());
    const sWeek1 = dateStringToUnix(addDays(new Date(), 7));
    const sWeek2 = dateStringToUnix(addDays(new Date(), 7 * 2));
    const sWeek3 = dateStringToUnix(addDays(new Date(), 7 * 3));
    const sWeek4 = dateStringToUnix(addDays(new Date(), 7 * 4));

    const getWeeks = async () => {
        const resp = await get(`/unit?finish=${sWeek1}&start=${sWeek}`);
        if (resp) {
            setWeek(resp);
        }
        const resp2 = await get(`/unit?finish=${sWeek2}&start=${sWeek1}`);
        if (resp2) {
            setWeek2(resp2);
        }
        const resp3 = await get(`/unit?finish=${sWeek3}&start=${sWeek2}`);
        if (resp3) {
            setWeek3(resp3);
        }
        const resp4 = await get(`/unit?finish=${sWeek4}&start=${sWeek3}`);
        if (resp4) {
            setWeek4(resp4);
        }
    };
    useEffect(() => {
        getWeeks();
    }, []);

    // const classes = useDataGridStyles();

    const unitCols = useMemo<GridColDef[]>(() => {
        const cols: GridColumns = [
            {
                field: "EST. Ship Date",
                valueFormatter: (r) => formatTimestampToDate(r.row?.so?.estimatedShipDate),
                width: 130,
            },
            {
                field: "SO NO.",
                headerName: "SO NO.",
                width: 90,
                valueFormatter: (r) => r.row?.so?.number,
            },
            { field: "Assign", width: 100, valueFormatter: (r) => r.row?.assignee?.username },
            { field: "number", headerName: "Unit", width: 100 },
            {
                field: "Device",
                headerName: "Device",
                width: 200,
                valueFormatter: (r) => r.row?.item?.no,
            },
            { field: "Client", headerName: "Client", width: 110, valueFormatter: (r) => r.row?.so?.client?.name },
            { field: "Rep", headerName: "Rep", width: 110, valueFormatter: (r) => r.row?.so?.repOrAgency?.name },
            { field: "productionStatus", headerName: "Production Status", width: 140 },
            { field: "Package", headerName: "Package", width: 100 }, // touch later
            { field: "status", headerName: "Status", width: 100 },
            { field: "Time Left", headerName: "Time Left", width: 100 }, // touch later
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
        <>
            {/* <UnitSearchBox /> */}
            <Box display="flex" alignItems="center" my={1}>
                <Button
                    color={topDateFilter === "week" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week");
                        setFinish(sWeek1);
                        setStart(sWeek);
                    }}
                >
                    {week ? week?.totalCount : "1"} Units Due this Week
                </Button>
                <Button
                    color={topDateFilter === "week2" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week2");
                        setFinish(sWeek2);
                        setStart(sWeek1);
                    }}
                    style={{ margin: "0 0.5em" }}
                >
                    {week2 ? week2.totalCount : ""} Units Due Week 2
                </Button>
                <Button
                    color={topDateFilter === "week3" ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setTopDateFilter("week3");
                        setFinish(sWeek3);
                        setStart(sWeek2);
                    }}
                >
                    {week3 ? week3.totalCount : ""} Units Due Week 3
                </Button>
                <Button
                    color={topDateFilter === "week4" ? "primary" : "default"}
                    variant="contained"
                    style={{ margin: "0 0.5em" }}
                    onClick={() => {
                        setTopDateFilter("week4");
                        setFinish(sWeek4);
                        setStart(sWeek3);
                    }}
                >
                    {week4 ? week4.totalCount : ""} Units Due Week 4
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
            {/* <DataGrid
                        density="compact"
                        loading={loading}
                        pagination
                        paginationMode="server"
                        page={page}
                        onPageChange={(p) => setPage(p.page)}
                        pageSize={25}
                        rowCount={units ? units.totalCount : 0}
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
                    /> */}
            <FullDataGrid columns={unitCols} url="/unit" height={534} onRowSelected={onRowSelected} />
        </>
    );
}

export default Table;
