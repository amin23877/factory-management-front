import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";

const data = [
    {
        createdAt: "2020-03-1",
        so: 5,
        quote: 7,
        po: 12,
    },
    {
        createdAt: "2020-03-3",
        so: 20,
        quote: 7,
        po: 5,
    },
    {
        createdAt: "2020-03-7",
        so: 7,
        quote: 19,
        po: 28,
    },
    {
        createdAt: "2020-03-10",
        so: 17,
        quote: 5,
        po: 6,
    },
    {
        createdAt: "2020-03-17",
        so: 27,
        quote: 34,
        po: 10,
    },
];

const Chart = () => {
    return (
        <div style={{ width: "100%", height: 400, display: "flex", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                    <XAxis dataKey="createAt" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="so" stroke="#ffa726" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const Table = () => {
    const cols = useMemo<GridColumns>(
        () => [
            { field: "date", headerName: "Date", flex: 1 },
            { field: "number", headerName: "Serial NO.", flex: 1 },
            { field: "client", headerName: "Client", flex: 1 },
            { field: "project", headerName: "Project", flex: 1 },
            { field: "price", headerName: "Price", width: 80 },
            { field: "cost", headerName: "Cost", width: 80 },
            { field: "auditing", headerName: "Auditing", flex: 1 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );

    return <BaseDataGrid cols={cols} rows={[]} height={380} />;
};

function SalesReport() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box height={450}>
            <Tabs style={{ marginBottom: 10 }} value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="Graph" />
                <Tab label="Details" />
            </Tabs>
            {activeTab === 0 && <Chart />}
            {activeTab === 1 && <Table />}
        </Box>
    );
}

export default SalesReport;
