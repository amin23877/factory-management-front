import React from "react";
import { Typography, Button } from "@material-ui/core";
import { EditRounded } from "@material-ui/icons";
import { IMatrix } from "../api/matrix";
import DataGridAction from "common/DataGridAction";
import { openRequestedSinglePopup } from "./window";

const defaultColumns = ["Device Number", "Device Description"];
const excludeColumns = ["fakeName"];

export const generateRows = ({ levels, tableData }: { tableData: IMatrix; levels: string[] }) => {
  return tableData.map((td, i) => {
    let tdLevels: any = {},
      tdParts: any = [],
      parts: any = [];
    levels.forEach((l) => {
      tdLevels[l] = td[l];
    });
    parts = td.device?.recs || [];
    parts.forEach((p: any) => {
      tdParts[p.name] = p?.ItemId?.no || p?.ItemNo || "";
    });

    return {
      id: i,
      ...tdLevels,
      ...tdParts,
      parts,
      DeviceId: (td.device as any)?._id || td.device?.id,
      "Device Number": td.device?.no || td?.fakeName,
      "Device Description": td.device?.name,
    };
  });
};

export const generateDataGridColumns = (
  columns: string[],
  onRename: (header: string) => void,
  onAddDevice: (d: any) => void
) => {
  const dtCols: any = [];

  columns.forEach((c) => {
    if (defaultColumns.includes(c) && c === "Device Number") {
      dtCols.push({
        name: c,
        defaultWidth: 240,
        editable: false,
        header: <Typography variant="caption">{c}</Typography>,
        render: ({ value, data }: any) => (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>{value}</span>
            {data?.DeviceId ? (
              <div style={{ height: 22 }}>
                <DataGridAction
                  icon="view"
                  controlledLock={false}
                  onClick={() => openRequestedSinglePopup({ url: `/panel/inventory/${data?.DeviceId}` })}
                />
              </div>
            ) : (
              <DataGridAction icon="add" controlledLock={false} onClick={() => onAddDevice(data)} />
            )}
          </div>
        ),
      });
    } else if (defaultColumns.includes(c) && c !== "Device Number") {
      dtCols.push({
        name: c,
        minWidth: 150,
        editable: false,
        header: <Typography variant="caption">{c}</Typography>,
      });
    } else {
      dtCols.push({
        name: c,
        minWidth: 180,
        editable: false,
        sortable: false,
        header: (
          <div style={{ width: 80, display: "flex", alignItems: "center" }}>
            <Typography variant="caption">{c}</Typography>
            <Button size="small" onClick={() => onRename(c)}>
              <EditRounded htmlColor="white" fontSize="small" />
            </Button>
          </div>
        ),
      });
    }
  });

  return dtCols;
};

export const generateDataGridFilterValues = (columns: string[]) => {
  const dtFilterValues: any = [];

  columns.forEach((c) => {
    dtFilterValues.push({ name: c, operator: "startsWith", type: "string", value: "" });
  });

  return dtFilterValues;
};

export const extractColumns = ({
  tableData,
  levels,
  parts,
}: {
  tableData: IMatrix;
  levels?: string[];
  parts?: string[];
}) => {
  const cols = new Set<string>();
  defaultColumns.forEach(cols.add, cols);

  if (levels) {
    levels.forEach((l) => cols.add(l));
  }
  if (parts) {
    parts.forEach((p) => cols.add(p));
  }
  excludeColumns.forEach(cols.delete, cols);

  return Array.from(cols);
};

export const extractLevels = (tableData: IMatrix) => {
  const levels = new Set<string>();
  tableData[0] && Object.keys(tableData[0]).forEach((k) => k !== "device" && levels.add(k));

  return Array.from(levels);
};

export const extractPartNames = (tableData: any[]) => {
  const parts = new Set<string>();
  const data = tableData.map((item) => ({ ...(item?.device?.recs || []) }));

  data.forEach((data: any) => Object.keys(data).forEach((r: any) => parts.add(data[r].name || "No-Name")));
  return Array.from(parts);
};
