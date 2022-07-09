import React from "react";
// import { DataGrid, GridColDef, GridToolbar } from "@material-ui/data-grid";

import DataGrid from "app/NewDataGrid";
// import { useDataGridData } from "components/Datagrid/hooks";

const cols = [
  {
    name: "number",
    minWidth: 100,
    header: "Customer NO.",
  },
  {
    name: "name",
    minWidth: 120,
    header: "Name",
  },
  {
    name: "location",
    minWidth: 120,
    header: "Location",
  },
  {
    name: "size",
    minWidth: 120,
    header: "Size",
  },
  {
    name: "website",
    minWidth: 120,
    header: "Website",
  },
  // {
  //   name: "state",
  //   minWidth: 120,
  //   header: "State",
  // },
  // {
  //   name: "city",
  //   minWidth: 120,
  //   header: "City",
  // },
  // {
  //   name: "zipcode",
  //   header: "Zip Code",
  //   width: 90,
  // },
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
    name: "fax",
    header: "Fax",
    minWidth: 130,
  },
  {
    name: "phone",
    header: "Phone",
    minWidth: 150,
  },
  {
    name: "ext",
    header: "Ext",
    minWidth: 130,
  },
  {
    name: "type",
    header: "Type",
    width: 100,
  },
  {
    name: "approved",
    header: "Approved",
    width: 100,
    type: "boolean",
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
