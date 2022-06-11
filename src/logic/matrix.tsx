import React from "react";
import { Typography, Button } from "@material-ui/core";
import { EditRounded } from "@material-ui/icons";
import { IMatrix } from "../api/matrix";

export const generateRows = ({ levels, tableData }: { tableData: IMatrix; levels: string[] }) => {
  return tableData.map((td, i) => {
    let tdLevels: any = {},
      tdParts: any = [],
      parts: any = [];
    levels.forEach((l) => {
      tdLevels[l] = td[l];
    });
    parts = [];
    // parts = td.device?.recs
    //   ? td.device.recs.map((rec: any, j: any) => ({ ...rec, name: rec?.name || `Part-${j}` }))
    //   : [];
    parts.forEach((p: any) => {
      tdParts[p.name] = p;
    });

    return {
      id: i,
      ...tdLevels,
      ...tdParts,
      parts,
      DeviceId: (td.device as any)?._id || td.device?.id,
      "Device Number": td.device?.no,
    };
  });
};

export const generateDataGridColumns = (columns: string[], onRename: (header: string) => void) => {
  const dtCols: any = [];
  const levels = ["Device Number", "power", "input", "output", "runtime"];

  columns.forEach((c) => {
    if (!levels.includes(c)) {
      dtCols.push({
        name: c,
        render: ({ data }: any) => data[c]?.ItemId?.no,
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
    } else {
      dtCols.push({
        name: c,
        minWidth: 150,
        editable: false,
        header: <Typography variant="caption">{c}</Typography>,
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

export const extractColumns = ({ tableData, levels }: { tableData: IMatrix; levels?: string[] }) => {
  const cols = new Set<string>();
  cols.add("Device Number");
  if (levels) {
    levels.forEach((l) => cols.add(l));
  }
  const hasDevice = tableData.filter((td) => td.device);
  hasDevice.forEach((td) => {
    // td.device?.recs?.forEach((rec: any, i: any) => {
    //   if (rec?.name) {
    //     cols.add(rec?.name);
    //   }
    // });
  });

  return Array.from(cols);
};

export const extractLevels = (tableData: IMatrix) => {
  const levels = new Set<string>();
  tableData[0] && Object.keys(tableData[0]).forEach((k) => k !== "device" && levels.add(k));

  return Array.from(levels);
};

export const extractPartNames = (tableData: any[]) => {
  const parts = new Set<string>();

  const datas = tableData.map((item) => ({ ...item.recs }));
  // const datas = tableData.map((item) => ({ ...item.data }));

  datas.forEach((data: any) => Object.keys(data).forEach((r: any) => parts.add(data[r].name)));
  return Array.from(parts);
};
