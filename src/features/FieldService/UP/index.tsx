import React, { useState } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Box, Tabs, Tab } from "@material-ui/core";
import useSwr from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import Details from "./Details";

import { formatTimestampToDate } from "../../../logic/date";

export default function Up() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedUp, setSelectedUp] = useState<any>({
        id: "test",
        number: "testnumber",
        item: { no: "testitemno", name: "testitemname", modelName: "", modelNumber: "", description: "" },
        so: { number: "" },
        options: [],
    });

    const { data: ups } = useSwr("/up");

    const cols: GridColumns = [
        {
            field: "Device",
            headerName: "Device Serial Number",
            flex: 1,
            valueFormatter: (r) => r.row?.item?.no,
        },
        { field: "model", headerName: "Model", flex: 1 },
        {
            field: "Act.S.D.",
            valueFormatter: (r) => formatTimestampToDate(r.row?.so?.actualShipDate),
            width: 120,
        },
        {
            field: "SO NO.",
            headerName: "SO NO.",
            width: 90,
            valueFormatter: (r) => r.row?.so?.number,
        },
        { field: "warrantyEndDate", headerName: "warranty End Date", width: 150 },
        { field: "inverterStatus", headerName: "Inverter Status	", width: 150 },
        { field: "batteryStatus", headerName: "Battery Status", width: 150 },
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
                    {/* <Tab label="Details" disabled={!selectedUp} /> */}
                    <Tab label="Details" />
                </Tabs>
                {activeTab === 0 && ups && (
                    <BaseDataGrid
                        height="74vh"
                        rows={ups.result || []}
                        cols={cols}
                        onRowSelected={(d) => {
                            setSelectedUp(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedUp && <Details up={selectedUp} />}
            </BasePaper>
        </Box>
    );
}
