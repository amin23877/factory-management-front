import React, { useMemo } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";

import { IUnit } from "api/units";
import { sortJobRecordsByParent } from "logic/jobrecords";
import { openRequestedSinglePopup } from "logic/window";

import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";
import { useMediaQuery } from "@material-ui/core";

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

export default function JobRecordsTable({ unit }: { unit: IUnit }) {
  const phone = useMediaQuery("(max-width:400px)");
  const history = useHistory();
  const { data: jobrecords } = useSWR(`/unit/${unit.id}/jobrecords`);
  const jobRecordsSorted = sortJobRecordsByParent({ deviceNumber: unit.ItemId.no, jobRecords: jobrecords || [] }) || [];

  const jobrecordsCols = useMemo<GridColumns>(
    () => [
      { field: "Parent", valueFormatter: ({ row }) => row?.parent?.no || row?.parentNo, width: 180, hide: true },
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

  const handleRowSelect = (r: any) => {
    const url = `/panel/inventory/${r?.ItemId?._id}`;
    if (r.ItemId && phone) {
      history.push(url);
    } else if (r.ItemId && !phone) {
      openRequestedSinglePopup({ url });
    }
    return;
  };

  return (
    <BaseDataGrid
      cols={jobrecordsCols}
      rows={jobRecordsSorted?.map((j: any, i: any) => ({ ...j, id: i })) || []}
      getRowClassName={({ row }) => getRowClassName({ row, jobRecords: jobRecordsSorted, unit })}
      onRowSelected={handleRowSelect}
      height="67.3vh"
    />
  );
}
