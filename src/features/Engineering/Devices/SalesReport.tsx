import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { useMemo } from "react";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";
import { extractChartData } from "../../../logic/reports/sales";
import { formatDate } from "../../../logic/utils";

const Chart = ({ data }: { data: { string: number }[] }) => {
    return (
        <div style={{ width: "100%", height: 400, display: "flex", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="units" stroke="#ffa726" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const Table = ({ data }: { data: any }) => {
    const cols = useMemo<GridColumns>(
        () => [
            {
                field: "date",
                headerName: "Date",
                width: 100,
                valueFormatter: (params) => formatDate(params.row.date, "yyyy/MMMM/dd"),
            },
            { field: "serialNumber", headerName: "Serial NO.", width: 100 },
            { field: "clientName", headerName: "Client", flex: 1 },
            { field: "project", headerName: "Project", flex: 1 },
            { field: "price", headerName: "Price", width: 80 },
            { field: "cost", headerName: "Cost", width: 80 },
            { field: "auditing", headerName: "Auditing", flex: 1 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );

    return (
        <BaseDataGrid
            cols={cols}
            rows={data && data.map ? data.map((d: any, i: any) => ({ ...d, id: i })) : []}
            height={430}
        />
    );
};

function SalesReport() {
    const [activeTab, setActiveTab] = useState(0);
    const [chartData, setChartData] = useState<any>([]);

    const { data } = useSWR("/salesreport");

    useEffect(() => {
        if (data) {
            setChartData(extractChartData(data));
        }
    }, [data]);

    return (
        <Box height={493}>
            <Tabs style={{ marginBottom: 10 }} value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="Graph" />
                <Tab label="Details" />
            </Tabs>
            {activeTab === 0 && <Chart data={chartData} />}
            {activeTab === 1 && <Table data={data} />}
        </Box>
    );
}

export default SalesReport;
