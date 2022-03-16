import React from "react";
// import { DataGrid, GridColDef, GridToolbar } from "@material-ui/data-grid";

import DataGrid from "app/NewDataGrid";
// import { useDataGridData } from "components/Datagrid/hooks";

const cols = [
  {
    name: "number",
    width: 90,
    header: "ID",
  },
  {
    name: "name",
    minWidth: 120,
    header: "Name",
  },
  {
    name: "state",
    minWidth: 120,
    header: "State",
  },
  {
    name: "city",
    minWidth: 120,
    header: "City",
  },
  {
    name: "zipcode",
    header: "Zip Code",
    width: 90,
  },
  // {
  //     name: "productLine",
  //     minWidth: 120,
  //     header: "Product Line",
  // },
  // {
  //     name: "supportStaff",
  //     minWidth: 120,
  //     header: "Support Staff",
  //     render: ({ data }: any) => data?.supportStaff?.username,
  // },
  {
    name: "contact",
    header: "Main Contact",
    minWidth: 130,
    render: ({ data }: any) => data?.contact?.firstName,
    hide: true,
  },

  {
    name: "phone",
    header: "Phone",
    minWidth: 150,
  },
  {
    name: "email",
    header: "Email",
    minWidth: 150,
    hide: true,
  },
  {
    name: "Type",
    width: 100,
    render: ({ data }: any) => data?.CustomerTypeId?.name,
  },
  {
    name: "status",
    width: 100,
    header: "Status",
  },
];

export default function CustomerDataGrid({
  url,
  onRowSelected,
  params,
}: {
  params?: { [key: string]: any };
  url: string;
  onRowSelected: (row: any) => void;
}) {
  return (
    <DataGrid
      onRowSelected={(r) => {
        onRowSelected && onRowSelected(r);
      }}
      columns={cols}
      url={url}
      initParams={params}
    />
  );
}
