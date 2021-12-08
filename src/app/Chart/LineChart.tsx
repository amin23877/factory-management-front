import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, YAxis, Legend } from "recharts";

export default function BaseLineChart({
    data,
    xDataKey,
    barDataKey,
    height,
}: {
    data: any[];
    xDataKey: string;
    barDataKey: string;
    height?: string | number;
}) {
    return (
        <div style={{ width: "100%", height: height ? height : 400, display: "flex", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={50} height={100} data={data}>
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
