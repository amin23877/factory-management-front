import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";

import { formatTimestampToDate } from "logic/date";
import { BasePaper } from "app/Paper";
import { makeStyles } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { get } from "api";

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

function getStatus({ data }: any) {
  // On hand, On order, To purchase
  if (!data) {
    return { status: "Need To Purchase", qty: 0 };
  }
  const availableQty = Number(data.onHandQty || 0) - Number(data.allocatedQty || 0);
  if (data.quantity < availableQty) {
    return { status: "On Hand", qty: Number(data.onHandQty || 0) };
  }
  if (data.quantity < data.onOrderQty) {
    return { status: "On Order", qty: Number(data.onOrderQty || 0) };
  }
  return { status: "Need To Purchase", qty: Number(data.quantity || 0) };
}

const cols: GridColumns = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    width: 120,
    valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
  },
  { field: "so", headerName: "SO Number", width: 120 },
  { field: "unit", headerName: "Unit Number", width: 120 },
  { field: "itemNo", headerName: "Item Number", width: 120, valueFormatter: (params) => params?.row?.data?.no },
  { field: "itemName", headerName: "Item Name", width: 120, valueFormatter: (params) => params?.row?.data?.no },
  {
    field: "itemDescription",
    headerName: "Item Description",
    width: 180,
    valueFormatter: (params) => params?.row?.data?.no,
  },
  {
    field: "qtyUsed",
    headerName: "Qty Used",
    width: 120,
    valueFormatter: (params) => params?.row?.data?.quantity || 0,
  },
  { field: "status", headerName: "Status", width: 120, valueFormatter: (p) => getStatus(p?.row).status },
  { field: "statusQty", headerName: "Status Qty", width: 120, valueFormatter: (p) => getStatus(p?.row).qty },
  { field: "qtyRemain", headerName: "Qty Remain", width: 120 },
  { field: "dateExpected", headerName: "Date Expected", width: 120 },
];

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const classes = useDataGridStyles();
  const [purchasingRequiredItems, setPurchasingRequiredItems] = useState<{ result: any[]; total: number }>();
  // const { data: purchasingRequiredItems } = useSWR<{ result: any[]; total: number }>(
  //   `/notification?type=Purchasing Required&page=${page}`
  // );

  useEffect(() => {
    if (page > 0) {
      get(`/notification?type=Purchasing Required&page=${page}`)
        .then((d) => {
          setPurchasingRequiredItems(d);
        })
        .catch((e) => console.log(e));
    }
  }, [page]);

  return (
    <BasePaper>
      <Tabs textColor="primary" value={tab} onChange={(e, nv) => setTab(nv)} style={{ marginBottom: 10 }}>
        <Tab label="Purchasing Required List" />
      </Tabs>
      {/* <BaseDataGrid  cols={cols} rows={purchasingRequiredItems?.result || []} /> */}

      <div
        style={{
          flexGrow: 1,
          height: 450,
        }}
      >
        <DataGrid
          density="compact"
          components={{ Toolbar: GridToolbar }}
          className={classes.root}
          columns={cols}
          rows={purchasingRequiredItems?.result ? purchasingRequiredItems.result : []}
          pagination
          pageSize={25}
          rowsPerPageOptions={[25, 50]}
          rowCount={purchasingRequiredItems?.total || 0}
          paginationMode="server"
          onPageChange={(np) => setPage(np.page)}
          loading={!purchasingRequiredItems?.result}
        />
      </div>
    </BasePaper>
  );
}
