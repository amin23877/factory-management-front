import React, { useMemo } from "react";
import useSWR from "swr";

import PieChart from "../../../app/Chart/PieChart";
import BaseLineChart from "../../../app/Chart/LineChart";

import { ISO } from "../../../api/so";

import { extractClientPieChartData, extractDevicesSales, extractSalesVsWeek } from "../../../logic/reports/sales";

export function ClientPie() {
    const { data: SOs } = useSWR<ISO[]>("/so");

    const chartData = useMemo(() => {
        if (SOs) {
            return extractClientPieChartData(SOs);
        } else {
            return [];
        }
    }, [SOs]);

    return <PieChart data={chartData} dataKey="value" height={250} />;
}

export function SalesVsWeek() {
    const { data: SOs } = useSWR<ISO[]>("/so");

    const chartData = useMemo(() => {
        if (SOs) {
            return extractSalesVsWeek(SOs);
        } else {
            return [];
        }
    }, [SOs]);

    return <BaseLineChart height={250} data={chartData} xDataKey="week" barDataKey="totalAmount" />;
}

export function DevicesPie() {
    const { data: units } = useSWR("/unit");

    const chartData = useMemo(() => {
        if (units) {
            return extractDevicesSales(units.result);
        } else {
            return [];
        }
    }, [units]);

    return <PieChart data={chartData} dataKey="value" height={250} />;
}
