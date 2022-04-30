import React, { useCallback, useMemo, useState } from "react";
import { useMediaQuery, makeStyles, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useSWR from "swr";

import { IUnit } from "api/units";
import { sortJobRecordsByParent } from "logic/jobrecords";
import { openRequestedSinglePopup } from "logic/window";
import { groupBy } from "logic/utils";

// import BaseDataGrid from "app/BaseDataGrid";
// import { GridColumns } from "@material-ui/data-grid";

const useStyle = makeStyles({
  root: {
    "& .InovuaReactDataGrid__column-header": {
      background: "#202731",
      color: "#fff",
    },
    "& .nested": {
      backgroundColor: "#d7d7d7 !important",
      "&:hover": {
        backgroundColor: "#c0c0c0 !important",
      },
      "&.InovuaReactDataGrid__row:not(.InovuaReactDataGrid__row--virtualize-columns)>.InovuaReactDataGrid__row-cell-wrap:hover":
        {
          backgroundColor: "#c0c0c0 !important",
        },
    },
    "& .blue": {
      backgroundColor: "#a5c2f7 !important",
      "&:hover": {
        backgroundColor: "#85b0ff !important",
      },
      "&.InovuaReactDataGrid__row:not(.InovuaReactDataGrid__row--virtualize-columns)>.InovuaReactDataGrid__row-cell-wrap:hover":
        {
          backgroundColor: "#85b0ff !important",
        },
    },
    "& .orange": {
      backgroundColor: "#ffc888 !important",
      "&:hover": {
        backgroundColor: "#ffbe73 !important",
      },
      "&.InovuaReactDataGrid__row:not(.InovuaReactDataGrid__row--virtualize-columns)>.InovuaReactDataGrid__row-cell-wrap:hover":
        {
          backgroundColor: "#ffbe73 !important",
        },
    },
  },
});

const getRowClassName = ({ jobRecords, row, unit }: { jobRecords: any[]; row: any; unit: IUnit }) => {
  if (row.parentRec) {
    const parent = jobRecords.find((j) => j._id === row.parentRec);
    if (parent && (parent.parent?.no === unit.ItemId.no || parent.parentNo === unit.ItemId.no)) {
      return "blue";
    } else {
      return "orange";
    }
  }
  return "";
};

const filterValues = [
  // { name: "Parent", render: ({ data }: any) => data?.parent?.no || data?.parentNo, width: 180, hidden: true },
  { name: "Line", type: "string", value: "", operator: "startsWith" },
  {
    name: "Component",
    type: "string",
    value: "",
    operator: "startsWith",
  },
  { name: "Component Name", type: "string", value: "", operator: "startsWith" },
  { name: "Component Location", type: "string", value: "", operator: "startsWith" },
  { name: "UM", type: "string", value: "", operator: "startsWith" },
  { name: "QTY", type: "string", value: "", operator: "startsWith" },
  { name: "Note", type: "string", value: "", operator: "startsWith" },
];

export default function JobRecordsTable({ unit }: { unit: IUnit }) {
  const phone = useMediaQuery("(max-width:400px)");
  const history = useHistory();
  const classes = useStyle();
  const { data: jobrecords } = useSWR(`/unit/${unit.id}/jobrecords`);
  const jobRecordsGrouped = useMemo(
    () => Array.from(groupBy(jobrecords || [], (i: any) => i.parentRec || unit.ItemId.no)) || [],
    [jobrecords, unit.ItemId.no]
  );
  const mainComponents = jobRecordsGrouped?.find((g: any) => g[0] === unit.ItemId?.no);
  const jobRecordsSorted = useMemo(
    () =>
      sortJobRecordsByParent({ deviceNumber: unit.ItemId.no, jobRecords: jobrecords || [] })?.map((data) => ({
        Line: data?.line,
        Component: data?.ItemId?.no || data?.ItemNo,
        "Component Name": data?.ItemId?.name || data?.ItemName,
        "Component Location": data?.ItemId?.location,
        UM: data?.ItemId?.unitOfMeasure,
        QTY: data?.usage,
        Note: data?.note,
        ...data,
      })) || [],
    [jobrecords, unit.ItemId.no]
  );

  const componentWithChildren = useMemo(() => {
    const indexes = jobRecordsSorted?.map((j, i) => j?.parent?.no === unit.ItemId.no && i).filter((i) => i !== false);
    const components = [];
    if (indexes.length > 0) {
      console.log({ indexes, jobRecordsSorted });
    }

    return [];
  }, [jobRecordsSorted, unit.ItemId.no]);

  const [expandedComponents, setExpandedComponents] = useState<string[]>([]);

  const handleRowSelect = useCallback(
    (r: any) => {
      const url = `/panel/inventory/${r?.ItemId?._id}`;
      if (r.ItemId && phone) {
        history.push(url);
      } else if (r.ItemId && !phone) {
        openRequestedSinglePopup({ url });
      }
      return;
    },
    [history, phone]
  );

  const jobrecordsCols = useMemo(
    () => [
      // { name: "Parent", render: ({ data }: any) => data?.parent?.no || data?.parentNo, width: 180, hidden: true },
      { name: "Line", width: 80 },
      {
        name: "",
        header: "   ",
        width: 50,
        render: ({ data }: any) => <button onClick={() => handleRowSelect(data)}>🔍</button>,
      },
      {
        name: "",
        header: "   ",
        width: 50,
        render: ({ data }: any) => {
          const index = mainComponents ? mainComponents[1].findIndex((c) => c._id === data._id) : -1;
          if (index > -1 && jobRecordsGrouped) {
            return (
              <button>
                <KeyboardArrowDownIcon style={{ fontSize: "1.3em" }} />
              </button>
            );
          }
          return;
        },
      },
      {
        name: "Component",
        width: 100,
      },
      {
        name: "Component Name",
        render: ({ value }: any) => (
          <Tooltip title={value}>
            <span>{String(value)}</span>
          </Tooltip>
        ),
        width: 180,
      },
      { name: "Component Location", width: 180 },
      { name: "UM", width: 80 },
      { name: "QTY", width: 80 },
      {
        name: "",
        header: "   ",
        width: 50,
        render: ({ data }: any) => <button>✏</button>,
      },
      {
        name: "",
        header: "   ",
        width: 50,
        render: ({ data }: any) => <button>❌</button>,
      },
      { name: "Note", width: 200 },
    ],
    [handleRowSelect, mainComponents]
  );

  return (
    <div style={{ display: "flex", height: "68vh" }}>
      <ReactDataGrid
        className={classes.root}
        columns={jobrecordsCols}
        dataSource={jobRecordsSorted}
        rowClassName={({ data }) => getRowClassName({ row: data, jobRecords: jobRecordsSorted, unit })}
        defaultFilterValue={filterValues}
        pagination
      />
    </div>
    // <BaseDataGrid
    //   cols={jobrecordsCols}
    //   rows={jobRecordsSorted?.map((j: any, i: any) => ({ ...j, id: i })) || []}
    //   getRowClassName={({ row }) => getRowClassName({ row, jobRecords: jobRecordsSorted, unit })}
    //   onRowSelected={handleRowSelect}
    //   height="67.3vh"
    // />
  );
}
