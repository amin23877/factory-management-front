import React from "react";

import DataGrid from "app/NewDataGrid";

import { ITicket } from "api/ticket";

const cols = [
  { name: "no", header: "ID", minWidth: 200 },
  { name: "name", header: "Name", flex: 1 },
  {
    name: "type",
    header: "Type",
    minWidth: 200,
  },
  {
    name: "class",
    header: "Class",
    minWidth: 200,
  },
  { name: "price", header: "Price", type: "number", width: 150 },
];

export default function Table({ onRowSelected }: { onRowSelected: (row: ITicket) => void }) {
  return <DataGrid columns={cols} url="/service" onRowSelected={onRowSelected} setUrlFilters />;
}
