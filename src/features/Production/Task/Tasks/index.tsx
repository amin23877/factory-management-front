import React from "react";

import { formatTimestampToDate } from "logic/date";
import DataGrid from "app/NewDataGrid";

function Table() {
  const tasksCols = [
    {
      name: "assginDate",
      header: "Date Assigned",
      minWidth: 120,
      type: "date",
    },
    {
      name: "Task Number",
      render: ({ data }: any) => data?.EngEvalTaskId?.id || data?.EngManTaskId?.id || data?.EngTestTaskId?.id,
      minWidth: 120,
    },
    {
      name: "Task Name",
      render: ({ data }: any) => data?.EngEvalTaskId?.name || data?.EngManTaskId?.name || data?.EngTestTaskId?.name,
      minWidth: 120,
    },
    {
      name: "Task Description",
      render: ({ data }: any) =>
        data?.EngEvalTaskId?.description || data?.EngManTaskId?.description || data?.EngTestTaskId?.description,
      minWidth: 130,
    },
    { name: "Unit", render: ({ data }: any) => data?.UnitId?.number, minWidth: 100 },
    { name: "Assign", render: ({ data }: any) => data?.UnitId?.assignee?.username, minWidth: 100 },
    { name: "Device", render: ({ data }: any) => data?.UnitId?.ItemId?.no, minWidth: 110 },
    { name: "SO NO.", render: ({ data }: any) => data?.UnitId?.LineItemRecordId?.SOId?.number, minWidth: 100 },
    {
      name: "Est. Ship Date",
      render: ({ data }: any) => formatTimestampToDate(data?.UnitId?.LineItemRecordId?.SOId?.estimatedShipDate),
      minWidth: 130,
    },
    { name: "Production Status", render: ({ data }: any) => data?.UnitId?.productionStatus, minWidth: 140 },
    { name: "Package", headerName: "Package", minWidth: 100 }, // touch later
    { name: "Status", render: ({ data }: any) => data?.UnitId?.status, minWidth: 100 },
    { name: "Time Left", render: ({ data }: any) => data?.UnitId?.timeLeft, minWidth: 120 },
  ];

  return (
    <>
      <DataGrid columns={tasksCols} url="/prodTask" onRowSelected={() => {}} setUrlFilters />
    </>
  );
}

export default Table;
