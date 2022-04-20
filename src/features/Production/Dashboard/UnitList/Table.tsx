import React, { useState, useMemo, useEffect } from "react";
import { Box } from "@material-ui/core";
import { addDays } from "date-fns";

import Button from "app/Button";

import { formatTimestampToDate } from "logic/date";
import { get } from "api";
import { IUnit } from "api/units";
import DataGrid from "app/NewDataGrid";

const dateStringToUnix = (date: Date) => {
  return String(Math.round(new Date(date).getTime() / 1));
};

const sWeek = dateStringToUnix(new Date());
const sWeek1 = dateStringToUnix(addDays(new Date(), 7));
const sWeek2 = dateStringToUnix(addDays(new Date(), 7 * 2));
const sWeek3 = dateStringToUnix(addDays(new Date(), 7 * 3));
const sWeek4 = dateStringToUnix(addDays(new Date(), 7 * 4));

function Table({ onRowSelected }: { onRowSelected: (row: IUnit) => void }) {
  const [topDateFilter, setTopDateFilter] = useState<"week" | "week2" | "week3" | "week4">();
  const [finish, setFinish] = useState<string>();
  const [start, setStart] = useState<string>();
  const [week, setWeek] = useState<any>();
  const [week2, setWeek2] = useState<any>();
  const [week3, setWeek3] = useState<any>();
  const [week4, setWeek4] = useState<any>();

  const getWeeks = async () => {
    const resp = await get(`/unit?finish=${sWeek1}&start=${sWeek}`);
    if (resp) {
      setWeek(resp);
    }
    const resp2 = await get(`/unit?finish=${sWeek2}&start=${sWeek1}`);
    if (resp2) {
      setWeek2(resp2);
    }
    const resp3 = await get(`/unit?finish=${sWeek3}&start=${sWeek2}`);
    if (resp3) {
      setWeek3(resp3);
    }
    const resp4 = await get(`/unit?finish=${sWeek4}&start=${sWeek3}`);
    if (resp4) {
      setWeek4(resp4);
    }
  };
  useEffect(() => {
    getWeeks();
  }, []);

  const unitCols = useMemo(() => {
    const cols = [
      {
        name: "EST. Ship Date",
        render: ({ data }: any) => formatTimestampToDate(data?.SOId?.estimatedShipDate),
        minWidth: 130,
      },
      {
        name: "SO NO.",
        header: "SO NO.",
        minWidth: 90,
        render: ({ data }: any) => data?.SOId?.number,
      },
      { name: "Assign", minWidth: 100, render: ({ data }: any) => data?.assignee?.username },
      { name: "number", header: "Unit", minWidth: 100 },
      {
        name: "Device",
        header: "Device",
        minWidth: 200,
        render: ({ data }: any) => data?.ItemId?.no,
      },
      { name: "Client", header: "Client", minWidth: 110, render: ({ data }: any) => data?.SOid?.ClientId?.name },
      { name: "Rep", header: "Rep", minWidth: 110, render: ({ data }: any) => data?.RepId?.name },
      { name: "productionStatus", header: "Production Status", minWidth: 140 },
      { name: "Package", header: "Package", minWidth: 100 }, // touch later
      { name: "status", header: "Status", minWidth: 100 },
      { name: "Time Left", header: "Time Left", minWidth: 100 }, // touch later
    ];

    return cols;
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" my={1} gridGap={10} flexWrap="wrap" style={{ maxWidth: "90vw" }}>
        <Button
          color={topDateFilter === "week" ? "primary" : "default"}
          variant="contained"
          onClick={() => {
            setTopDateFilter("week");
            setFinish(sWeek1);
            setStart(sWeek);
          }}
        >
          {week ? week?.totalCount : "1"} Units Due this Week
        </Button>
        <Button
          color={topDateFilter === "week2" ? "primary" : "default"}
          variant="contained"
          onClick={() => {
            setTopDateFilter("week2");
            setFinish(sWeek2);
            setStart(sWeek1);
          }}
        >
          {week2 ? week2.totalCount : ""} Units Due Week 2
        </Button>
        <Button
          color={topDateFilter === "week3" ? "primary" : "default"}
          variant="contained"
          onClick={() => {
            setTopDateFilter("week3");
            setFinish(sWeek3);
            setStart(sWeek2);
          }}
        >
          {week3 ? week3.totalCount : ""} Units Due Week 3
        </Button>
        <Button
          color={topDateFilter === "week4" ? "primary" : "default"}
          variant="contained"
          onClick={() => {
            setTopDateFilter("week4");
            setFinish(sWeek4);
            setStart(sWeek3);
          }}
        >
          {week4 ? week4.totalCount : ""} Units Due Week 4
        </Button>
        <Button
          onClick={() => {
            setTopDateFilter(undefined);
            setFinish(undefined);
            setStart(undefined);
          }}
        >
          clear
        </Button>
        <div style={{ marginLeft: "auto" }} />
      </Box>
      <DataGrid columns={unitCols} url="/unit?status=In Production" onRowSelected={onRowSelected} />
    </>
  );
}

export default Table;
