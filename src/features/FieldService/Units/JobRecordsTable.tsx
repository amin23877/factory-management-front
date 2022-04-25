import React, { useMemo } from "react";
// import { makeStyles } from "@material-ui/core";
// import ReactDataGrid from "@inovua/reactdatagrid-community";
import useSWR from "swr";

import { IUnit } from "api/units";
import { sortJobRecordsByParent } from "logic/jobrecords";

// import "@inovua/reactdatagrid-community/index.css";
import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";

// const useStyle = makeStyles({
//   root: {
//     "& .InovuaReactDataGrid__column-header": {
//       background: "#202731",
//       color: "#fff",
//     },
//   },
// });

// const columns = [
//   { name: "line", header: "Line", width: 80, type: "string" },
//   {
//     name: "component",
//     header: "Component",
//     render: ({ data }: any) => data?.ItemId?.no || data?.ItemNo,
//     width: 180,
//   },
//   {
//     name: "component_name",
//     header: "Component Name",
//     render: ({ data }: any) => data?.ItemId?.name || data?.ItemName,
//     width: 180,
//   },
//   {
//     name: "component_location",
//     header: "Component Location",
//     render: ({ data }: any) => data?.ItemId?.location,
//     width: 180,
//   },
//   { name: "um", header: "UM", render: ({ data }: any) => data?.ItemId?.unitOfMeasure, width: 120 },
//   { name: "qty", header: "QTY", render: ({ data }: any) => data?.usage, width: 120 },
//   { name: "note", header: "Note", render: ({ data }: any) => data?.note, width: 200 },
// ];

// const filterValues = [
//   { name: "line", operator: "startsWith", type: "string", value: "" },
//   { name: "component", operator: "startsWith", type: "string", value: "" },
//   { name: "component_name", operator: "startsWith", type: "string", value: "" },
//   { name: "component_location", operator: "startsWith", type: "string", value: "" },
//   { name: "um", operator: "startsWith", type: "string", value: "" },
//   { name: "qty", operator: "startsWith", type: "string", value: "" },
//   { name: "note", operator: "startsWith", type: "string", value: "" },
// ];

const getRowClassNameOld = ({ row, unit }: any) => {
  const rowParent = row?.parent?.no || row?.parentNo || "";
  if (rowParent !== unit?.ItemId?.no) {
    return "nested";
  }
  return "";
};

const getRowClassName = ({ groups, row, unit }: { groups: any[]; row: any; unit: IUnit }) => {
  const deviceNo = unit?.ItemId?.no;
  const rowParent = row?.parent?.no || row?.parentNo || "";
  const groupNumbers = groups.filter((g) => g[0] !== deviceNo).map((g: any) => g[0]) || [];
  const mainComponents = groups.find((g) => g[0] === deviceNo)[1].map((c: any) => c?.ItemId?.no || c?.ItemNo) || [];

  if (groupNumbers.includes(row?.ItemId?.no || row?.ItemNo)) {
    return "";
  }
  return "nested";
  // if (rowParent === unit?.ItemId?.no) {
  //   // Main Component
  //   return "white";
  // }
  // if (mainComponents.includes(rowParent)) {
  //   // Main Component Children
  //   return "nested";
  // }

  // return "blue";
};

export default function JobRecordsTable({ unit }: { unit: IUnit }) {
  //   const classes = useStyle();
  const { data: jobrecords } = useSWR(`/unit/${unit.id}/jobrecords`);
  const jobRecordsSorted = sortJobRecordsByParent({ deviceNumber: unit.ItemId.no, jobRecords: jobrecords || [] }) || [];

  const jobrecordsCols = useMemo<GridColumns>(
    () => [
      { field: "Line", width: 80 },
      {
        field: "Component",
        valueFormatter: ({ row }) => row?.ItemId?.no || row?.ItemNo,
        width: 180,
      },
      { field: "Component Name", valueFormatter: ({ row }) => row?.ItemId?.name || row?.ItemName, width: 180 },
      { field: "Component Location", valueFormatter: ({ row }) => row?.ItemId?.location, width: 180 },
      { field: "UM", valueFormatter: ({ row }) => row?.ItemId?.unitOfMeasure, width: 120 },
      { field: "QTY", valueFormatter: ({ row }) => row?.usage, width: 120 },
      { field: "Note", valueFormatter: ({ row }) => row?.note, width: 200 },
    ],
    []
  );

  return (
    <BaseDataGrid
      cols={jobrecordsCols}
      rows={jobRecordsSorted?.all?.map((j: any, i: any) => ({ ...j, id: i })) || []}
      // getRowClassName={({ row }) =>
      //   getRowClassName(jobRecordsSorted.grouped || [], unit.ItemId.no, row?.parent?.no || row?.parentNo)
      // }
      getRowClassName={({ row }) => getRowClassName({ groups: jobRecordsSorted?.grouped || [], unit, row })}
      onRowSelected={(r) => {}}
      height="67.3vh"
    />
    // <ReactDataGrid
    //   className={classes.root}
    //   style={{ height: "500px" }}
    //   columns={columns}
    //   dataSource={jobRecordsSorted?.all || []}
    //   defaultFilterValue={filterValues}
    //   pagination
    // />
  );
}
