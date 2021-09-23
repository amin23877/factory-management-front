import React, { useState } from "react";
import { GridColDef } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSwr from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

// import Details from "./Details";

import { formatTimestampToDate } from "../../../logic/date";

export default function Unit() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedUnit, setSelectedUnit] = useState<any>();

    const { data: units } = useSwr("/");

    const callCols: GridColDef[] = [
        { field: "number", headerName: "Device Serial Number", width: 100 },
        {
            field: "estimatedShipDate",
            headerName: "Est. S.D.",
            valueFormatter: (r) => formatTimestampToDate(r.row?.estimatedShipDate),
            width: 120,
        },
        {
            field: "actualShipDate",
            headerName: "Act. S.D.",
            valueFormatter: (r) => formatTimestampToDate(r.row?.actualShipDate),
            width: 120,
        },
        { field: "status", headerName: "Status", width: 110 },

        { field: "warrantyStatus", headerName: "Warranty Status", width: 120 },
        {
            field: "warrantyEndDate",
            headerName: "Warranty End Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.warrantyEndDate),
            width: 120,
        },
        { field: "SO Number", valueFormatter: (r) => r.row?.SOId?.number, width: 120 },
        {
            field: "SO Date",
            valueFormatter: (r) => formatTimestampToDate(r.row?.SOId?.createdAt),
            width: 120,
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
                    <BaseDataGrid
                        rows={units || []}
                        cols={callCols}
                        onRowSelected={(d) => {
                            setSelectedUnit(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {/* {activeTab === 1 && selectedUnit && <Details unitsData={selectedUnit} />} */}
            </BasePaper>
        </Box>
    );
}
