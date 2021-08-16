import React, { useMemo } from "react";
import useSWR from "swr";
import PieChart from "../../../app/Chart/PieChart";

import { ISO } from "../../../api/so";
import { extractClientPieChartData } from "../../../logic/reports/sales";

export function ClientPie() {
    const { data: SOs } = useSWR<ISO[]>("/so");

    const chartData = useMemo(() => {
        if (SOs) {
            console.log(extractClientPieChartData(SOs));

            return extractClientPieChartData(SOs);
        } else {
            return [];
        }
    }, [SOs]);

    return <PieChart data={chartData} dataKey="value" height={250} />;
}
