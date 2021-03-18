import React from "react";
import { Typography } from "@material-ui/core";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { BasePaper } from "../../app/Paper";
import { IQuote } from "../../api/quote";
import { ISO } from "../../api/so";

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

export const SalesReport = ({ quotes, salesOrders }: { quotes: IQuote[]; salesOrders: ISO[] }) => {
    return (
        <BasePaper>
            <Typography variant="h6">Sales Report</Typography>
            <div style={{ width: "100%", height: 200, display: "flex", justifyContent: "center" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={300} height={100} data={data}>
                        <XAxis dataKey="createAt" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="so" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="quote" stroke="#84d884" strokeWidth={2} />
                        <Line type="monotone" dataKey="po" stroke="#d8ad84" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </BasePaper>
    );
};
