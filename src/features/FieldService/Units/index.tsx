import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import { BasePaper } from "../../../app/Paper";

import Details from "./Details";

import { formatTimestampToDate } from "../../../logic/date";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import DataGrid from "../../../app/NewDataGrid";

export default function Unit() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedUnit, setSelectedUnit] = useState<any>();

    const cols = [
        {
            name: "Device",
            header: "Device",
            flex: 1,
            render: ({ data }: any) => data?.item?.no,
        },
        {
            name: "EST.S.D",
            render: ({ data }: any) => formatTimestampToDate(data?.so?.estimatedShipDate),
            minWidth: 120,
        },
        {
            name: "Act.S.D.",
            render: ({ data }: any) => formatTimestampToDate(data?.so?.actualShipDate),
            minWidth: 120,
        },
        { name: "status", header: "Status", minWidth: 100 },
        { name: "warrantyStatus", header: "Warranty Status", minWidth: 150 },
        { name: "warrantyEndDate", header: "warranty End Date", minWidth: 150 },
        {
            name: "SO NO.",
            header: "SO NO.",
            minWidth: 90,
            render: ({ data }: any) => data?.so?.number,
        },
        {
            name: "SO Date",
            header: "SO Date",
            minWidth: 100,
            render: ({ data }: any) => formatTimestampToDate(data?.so?.date),
        },
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
                            <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                        </span>
                    }
                    wrapped
                />
                <Tab
                    disabled={!selectedUnit}
                    icon={
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                        </span>
                    }
                />
            </Tabs>
            {activeTab === 0 && (
                <DataGrid
                    url="/unit"
                    columns={cols}
                    onRowSelected={(d) => {
                        setSelectedUnit(d);
                        setActiveTab(1);
                    }}
                />
            )}
            {activeTab === 1 && selectedUnit && <Details unit={selectedUnit} />}
        </BasePaper>
    );
}
