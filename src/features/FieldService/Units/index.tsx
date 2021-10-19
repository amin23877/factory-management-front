import React, { useState } from "react";
import { DataGrid, GridColumns, GridToolbar } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";

import { UnitSearchBox } from "../../../app/SearchBox";
import { BasePaper } from "../../../app/Paper";

import { useDataGridData } from "../../../components/Datagrid/hooks";
import Details from "./Details";

import { formatTimestampToDate } from "../../../logic/date";

export default function Unit() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedUnit, setSelectedUnit] = useState<any>();

    const { rows: units, loading, page, setPage, dataGridClasses } = useDataGridData({ url: "/unit" });

    const cols: GridColumns = [
        {
            field: "Device",
            headerName: "Device",
            flex: 1,
            valueFormatter: (r) => r.row?.item?.no,
        },
        {
            field: "EST.S.D",
            valueFormatter: (r) => formatTimestampToDate(r.row?.so?.estimatedShipDate),
            width: 120,
        },
        {
            field: "Act.S.D.",
            valueFormatter: (r) => formatTimestampToDate(r.row?.so?.actualShipDate),
            width: 120,
        },
        { field: "status", headerName: "Status", width: 100 },
        { field: "warrantyStatus", headerName: "Warranty Status", width: 150 },
        { field: "warrantyEndDate", headerName: "warranty End Date", width: 150 },
        {
            field: "SO NO.",
            headerName: "SO NO.",
            width: 90,
            valueFormatter: (r) => r.row?.so?.number,
        },
        {
            field: "SO Date",
            headerName: "SO Date",
            width: 100,
            valueFormatter: (r) => formatTimestampToDate(r.row?.so?.createdAt),
        },
    ];

    return (
        <Box>
            <BasePaper>
                <Tabs
                    value={activeTab}
                    textColor="primary"
                    onChange={(e, nv) => setActiveTab(nv)}
                    style={{ marginBottom: 10 }}
                >
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedUnit} />
                </Tabs>
                {activeTab === 0 && units && (
                    <>
                        <UnitSearchBox />

                        <Box height={550}>
                            <DataGrid
                                density="compact"
                                loading={loading}
                                pagination
                                paginationMode="server"
                                page={page}
                                onPageChange={(p) => setPage(p.page)}
                                pageSize={25}
                                rowCount={units ? units.totalCount : 0}
                                className={dataGridClasses.root}
                                filterMode="server"
                                components={{ Toolbar: GridToolbar }}
                                rows={units.result || []}
                                columns={cols}
                                onRowSelected={(d) => {
                                    setSelectedUnit(d.data);
                                    setActiveTab(1);
                                }}
                            />
                        </Box>
                    </>
                )}
                {activeTab === 1 && selectedUnit && <Details unit={selectedUnit} />}
            </BasePaper>
        </Box>
    );
}
