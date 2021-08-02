import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, YAxis, Legend } from "recharts";

export default function BaseLineChart({
    data,
    xDataKey,
    barDataKey,
}: {
    data: any[];
    xDataKey: string;
    barDataKey: string;
}) {
    return (
        <div style={{ width: "100%", height: 400, display: "flex", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                    <XAxis dataKey={xDataKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={barDataKey} stroke="#ffa726" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
