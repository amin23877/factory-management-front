import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#F43B86", "#0F52BA", "#FF2626", "#2C394B", "#64C9CF"];

const renderLegend = (props: any, onClick: any) => {
  const { payload } = props;

  return (
    <ul>
      {payload.slice(0, 5).map((entry: any, index: number) => (
        <li
          style={{
            color: COLORS[index % COLORS.length],
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: 200,
            cursor: "pointer",
          }}
          key={`item-${index}`}
          onClick={() => {
            onClick({ name: entry.value });
          }}
        >
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

export default function MyPieChart({
  height,
  data,
  dataKey,
  legend,
  onClick,
}: {
  legend?: boolean;
  height?: number;
  data: any[];
  dataKey: string;
  onClick?: any;
}) {
  return (
    <ResponsiveContainer width="100%" height={height ? height : "100%"}>
      <PieChart width={750} height={750}>
        {legend && <Legend content={(d: any) => renderLegend(d, onClick)} />}
        <Pie isAnimationActive={false} dataKey={dataKey} data={data} innerRadius={40} outerRadius={80} fill="#82ca9d">
          {data.map((i, index) => (
            <Cell
              style={{ cursor: "pointer" }}
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              onClick={(d: any) => {
                onClick(i);
              }}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
