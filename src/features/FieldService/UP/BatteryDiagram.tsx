import React from "react";
import { Box } from "@material-ui/core";

import BaseScatterChart from "../../../app/Chart/ScatterChart";

const data = [
    { x: 10, y: 20, color: "red" },
    { x: 12, y: 10, color: "green" },
    { x: 17, y: 30, color: "red" },
    { x: 14, y: 25, color: "red" },
    { x: 15, y: 40, color: "red" },
    { x: 11, y: 18, color: "yellow" },
];

export default function BatteryDiagram() {
    return (
        <Box display="flex">
            <BaseScatterChart
                scatterName="Batteries"
                data={data}
                xDataKey="x"
                xName="Voltage"
                xUnit="v"
                yDataKey="y"
                yName="Temperature"
                yUnit="c"
            />
        </Box>
    );
}
