import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#F43B86", "#0F52BA", "#FF2626", "#2C394B", "#64C9CF"];

export default function MyPieChart({
  height,
  data,
  dataKey,
  legend,
}: {
  legend?: boolean;
  height?: number;
  data: any[];
  dataKey: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height ? height : "100%"}>
      <PieChart width={750} height={750}>
        {legend && <Legend />}
        <Pie isAnimationActive={false} dataKey={dataKey} data={data} innerRadius={40} outerRadius={80} fill="#82ca9d">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
