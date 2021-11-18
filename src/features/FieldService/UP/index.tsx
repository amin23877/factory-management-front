import React, { useState } from "react";
import { GridColumns } from "@material-ui/data-grid";
import { Tabs, Tab } from "@material-ui/core";
import useSwr from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import Details from "./Details";

import { formatTimestampToDate } from "../../../logic/date";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

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
        <BasePaper style={{ height: "100%" }}>
            <Tabs
                value={activeTab}
                textColor="primary"
                onChange={(e, nv) => setActiveTab(nv)}
                style={{ marginBottom: 10 }}
            >
                <Tab
                    icon={
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <ListAltRounded style={{ marginRight: "5px" }} /> List
                        </span>
                    }
                    wrapped
                />
                <Tab
                    // disabled={!selectedUp}
                    icon={
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                        </span>
                    }
                />
            </Tabs>
            {activeTab === 0 && ups && (
                <BaseDataGrid
                    height="78.3vh"
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
    );
}
