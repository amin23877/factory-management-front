import React from "react";
import { makeStyles } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

export const useDataGridStyles = makeStyles({
  root: {
    backgroundColor: "#f9f9f9",
    border: "none",

    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: "#202731",
      color: "#fff",
      // borderRadius: " 10px 10px 0 0",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
      width: 0,
      height: 0,
      opacity: 0,
    },
    "& .Mui-selected": {
      boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
      backgroundColor: "#fff !important",
    },
    "& .MuiDataGrid-sortIcon": {
      fill: "white",
    },
  },
});

interface IBaseDataGrid {
  onRowSelected?: (row: any) => void;
  rows: any[];
  cols: any[];
  height?: number | string;
  loading?: boolean;
  pagination?: boolean;
  filter?: boolean;
}

export default function BaseDataGrid({ onRowSelected, rows, cols, height, pagination, filter }: IBaseDataGrid) {
  const classes = useDataGridStyles();

  return (
    <div
      style={{
        flexGrow: 1,
        height: height || 450,
      }}
    >
      <DataGrid
        density="compact"
        components={!filter ? {} : { Toolbar: GridToolbar }}
        className={classes.root}
        onRowSelected={(r) => {
          onRowSelected && onRowSelected(r.data);
        }}
        columns={cols}
        rows={rows && rows.length ? rows : []}
        hideFooter={pagination}
      />
    </div>
  );
}
