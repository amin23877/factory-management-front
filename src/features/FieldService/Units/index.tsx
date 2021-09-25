import React, { useState } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSwr from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import Details from "./Details";

import { formatTimestampToDate } from "../../../logic/date";
import { UnitSearchBox } from "../../../app/SearchBox";

export default function Unit() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedUnit, setSelectedUnit] = useState<any>();

    const { data: units } = useSwr("/unit");

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
            {/* <Box mb={2} display="flex" alignItems="center">
                <Button
                    onClick={() => setAddCall(true)}
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                >
                    <AddRoundedIcon />
                    Add Ticket
                </Button>
                <Button
                    kind="delete"
                    disabled={!selectedUnit}
                    onClick={() => setConfirm(true)}
                    style={{ margin: "0 0.5em" }}
                >
                    Delete Ticket
                </Button>
                <Button kind="add" onClick={() => setCTagModal(true)} style={{ margin: "0 0.5em" }}>
                    Add Call Tags
                </Button>
            </Box> */}
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
                        <BaseDataGrid
                            rows={units.result || []}
                            cols={cols}
                            onRowSelected={(d) => {
                                setSelectedUnit(d);
                                setActiveTab(1);
                            }}
                        />
                    </>
                )}
                {activeTab === 1 && selectedUnit && <Details unit={selectedUnit} />}
            </BasePaper>
        </Box>
    );
}
