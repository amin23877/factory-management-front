import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function BaseScatterChart({
  height,
  yDataKey,
  xDataKey,
  xName,
  yName,
  xUnit,
  yUnit,
  data,
  scatterName,
}: {
  height?: number;
  xDataKey: string;
  xName: string;
  xUnit: string;
  yDataKey: string;
  yName: string;
  yUnit: string;
  scatterName: string;
  data: any;
}) {
  return (
    <div style={{ width: "100%", height: height ? height : 400, display: "flex", justifyContent: "center" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey={xDataKey} name={xName} unit={xUnit} />
          <YAxis type="number" dataKey={yDataKey} name={yName} unit={yUnit} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name={scatterName} data={data} fill="#8884d8">
            {data.map((item: any, i: number) => (
              <Cell key={`cell-${i}`} fill={item.color ? item.color : "#8884d8"} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
