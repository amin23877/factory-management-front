import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BaseBarChart({ data, xDataKey, barDataKey }: { data: any[]; xDataKey: string; barDataKey: string }) {
    return (
        <div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={data}>
                    <Tooltip />
                    <XAxis dataKey={xDataKey} hide />
                    <Bar dataKey={barDataKey} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
