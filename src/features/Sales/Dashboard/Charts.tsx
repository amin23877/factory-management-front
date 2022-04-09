import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import PieChart from "app/Chart/PieChart";
import BaseLineChart from "app/Chart/LineChart";

import { ISO } from "api/so";

import { extractDevicesSales, extractSalesVsWeek } from "logic/reports/sales";
import { post, get } from "api";

export function ClientPie() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const generate = async () => {
      try {
        const rawData = await post("/report", {
          model: "sos",
          field: "ClientId",
          afterPopulation: { from: "clients", as: "client" },
        });

        setChartData(rawData.slice(1, 30).map((i: any) => ({ name: i.client[0]?.name, count: i.count })));
      } catch (error) {
        console.log(error);
      }
    };

    generate();
  }, []);

  return <PieChart data={chartData} dataKey="count" height={250} />;
}

export function SalesVsWeek() {
  const [SOs, setSOs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const nowDate = Number(date);
      const endMonthDate = Number(date.setDate(date.getDate() - 30));
      try {
        const resp = await get(`/so?mindate=${endMonthDate}&maxdate=${nowDate}&pageSize=10000`);
        setSOs(resp);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // const chartData = useMemo(() => {
  //   if (SOs) {
  //     return extractSalesVsWeek(SOs.result);
  //   } else {
  //     return [];
  //   }
  // }, [SOs]);

  // return <BaseLineChart height={250} data={chartData} xDataKey="week" barDataKey="totalAmount" />;
  return <></>;
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

export function SalesLocationPie() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const generate = async () => {
      try {
        const rawData = await post("/report", {
          model: "sos",
          beforePopulations: [{ from: "projects", as: "project", localField: "ProjectId" }],
          field: "project.location",
        });

        setChartData(rawData.slice(1, 30).map((i: any) => ({ name: i._id[0], count: i.count })));
      } catch (error) {
        console.log(error);
      }
    };

    generate();
  }, []);

  return <PieChart data={(chartData as any) || []} dataKey="count" height={250} />;
}

export function SalesRepPie() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const generate = async () => {
      try {
        const rawData = await post("/report", {
          model: "sos",
          field: "RepId",
          afterPopulation: { from: "reps", as: "rep" },
        });

        setChartData(rawData.slice(1, 30).map((i: any) => ({ name: i.rep[0]?.name, count: i.count })));
      } catch (error) {
        console.log(error);
      }
    };

    generate();
  }, []);

  return <PieChart data={chartData} dataKey="count" height={250} />;
}
