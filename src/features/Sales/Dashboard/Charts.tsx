import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import getWeekOfMonth from "date-fns/getWeekOfMonth";

import PieChart from "app/Chart/PieChart";
import BaseLineChart from "app/Chart/LineChart";

import { extractDevicesSales } from "logic/reports/sales";
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

  return <PieChart legend data={chartData} dataKey="count" height={250} />;
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
        const chartData = resp.result.reduce((prev: any, cur: any) => {
          if (cur.date) {
            const week = getWeekOfMonth(cur.date);
            const index = prev.findIndex((i: any) => i.name === week);
            if (index > -1) {
              let temp = prev.concat();
              temp[index] = { name: week, count: prev[index].count + 1 };
              return temp;
            } else {
              return prev.concat({ name: week, count: 0 });
            }
          } else {
            return prev;
          }
        }, []);
        console.log({ chartData });

        setSOs(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <BaseLineChart height={250} data={SOs} xDataKey="name" barDataKey="count" />;
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

  return <PieChart legend data={chartData} dataKey="value" height={250} />;
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

  return <PieChart legend data={(chartData as any) || []} dataKey="count" height={250} />;
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

  return <PieChart legend data={chartData} dataKey="count" height={250} />;
}
