import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BaseLineChart({ data, xDataKey, barDataKey }: { data: any[]; xDataKey: string; barDataKey: string }) {
    return (
        <div style={{ width: 100, height: 100 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                    <Tooltip />
                    <XAxis dataKey={xDataKey} hide />
                    <Line type="natural" dataKey={barDataKey} stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
