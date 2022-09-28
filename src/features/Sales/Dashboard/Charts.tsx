import React, { useEffect, useState } from "react";
import getWeekOfMonth from "date-fns/getWeekOfMonth";

import PieChart from "app/Chart/PieChart";
import BaseLineChart from "app/Chart/LineChart";

import { post, get } from "api";
import SOTableModal, { ClientOrRepSOTable, LocationSOTable } from "./SOTableModal";

export function SalesVsWeek({ quote }: { quote?: boolean }) {
  const [SOs, setSOs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const nowDate = Number(date);
      const endThreeMonthDate = Number(date.setDate(date.getDate() - 90));
      try {
        const resp = await get(
          quote
            ? `/so?mindate=${endThreeMonthDate}&maxdate=${nowDate}&pageSize=10000`
            : `/so?mindate=${endThreeMonthDate}&maxdate=${nowDate}&pageSize=10000`
        );
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
  const [chartData, setChartData] = useState<any[]>([]);
  const [SOModal, setSOModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    const generate = async () => {
      try {
        const rawData = await post("/report", {
          model: "units",
          field: "item.no",
          beforePopulations: [{ localField: "ItemId", from: "items", as: "item" }],
          match: { "item.class": "device" },
        });
        setChartData(rawData.slice(1, 30).map((i: any) => ({ name: i._id[0], count: i.count })));
      } catch (error) {
        console.log(error);
      }
    };

    generate();
  }, []);

  return (
    <>
      <PieChart
        legend
        data={chartData}
        dataKey="count"
        height={250}
        onClick={(d: any) => {
          setSelectedItem(d);
          setSOModal(true);
        }}
      />
      {selectedItem && (
        <SOTableModal
          open={SOModal}
          onClose={() => {
            setSOModal(false);
            setSelectedItem(undefined);
          }}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
}

export function ClientPie() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [SOModal, setSOModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

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

  return (
    <>
      <PieChart
        legend
        data={chartData}
        dataKey="count"
        height={250}
        onClick={(d: any) => {
          setSelectedItem(d);
          setSOModal(true);
        }}
      />
      {selectedItem && (
        <ClientOrRepSOTable
          open={SOModal}
          onClose={() => {
            setSOModal(false);
            setSelectedItem(undefined);
          }}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
}

export function SalesLocationPie() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [SOModal, setSOModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

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

  return (
    <>
      <PieChart
        legend
        data={(chartData as any) || []}
        dataKey="count"
        height={250}
        onClick={(d: any) => {
          setSelectedItem(d);
          setSOModal(true);
        }}
      />
      {selectedItem && (
        <LocationSOTable
          open={SOModal}
          onClose={() => {
            setSOModal(false);
            setSelectedItem(undefined);
          }}
          selectedItem={selectedItem}
        />
      )}
    </>
  );
}

export function SalesRepPie() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [SOModal, setSOModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

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

  return (
    <>
      <PieChart
        legend
        data={chartData}
        dataKey="count"
        height={250}
        onClick={(d: any) => {
          setSelectedItem(d);
          setSOModal(true);
        }}
      />
      {selectedItem && (
        <ClientOrRepSOTable
          open={SOModal}
          onClose={() => {
            setSOModal(false);
            setSelectedItem(undefined);
          }}
          selectedItem={selectedItem}
          rep
        />
      )}
    </>
  );
}
