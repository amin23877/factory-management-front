import React from "react";
import NewDataGrid from "app/NewDataGrid";
import { ClearRounded, CheckRounded } from "@material-ui/icons";

const columns = [
  { name: "type", header: "Type", maxWidth: 100 },
  { name: "employee", header: "Employee", render: ({ data }: any) => data?.EmployeeId?.username, width: 120 },
  { name: "createdAt", header: "Date", type: "date", maxWidth: 120 },
  { name: "change", header: "Change", render: ({ data }: any) => Object.keys(data?.change || {})[0] || "" },
  {
    name: "before",
    header: "Before",
    type: "string",
    render: ({ data }: any) => {
      if (typeof data.change?.before === "boolean") {
        return data.change?.before ? <CheckRounded /> : <ClearRounded />;
      }
      return <span>{`${data.change.before}`}</span>;
    },
  },
  {
    name: "after",
    header: "After",
    render: ({ data }: any) => {
      if (typeof data.change?.after === "boolean") {
        return data.change?.after ? <CheckRounded /> : <ClearRounded />;
      }
      return <span>{`${data.change?.after}`}</span>;
    },
  },
];

export default function AuditTable({ itemId }: { itemId: string }) {
  return <NewDataGrid url={`/audit?docId=${itemId}`} columns={columns} onRowSelected={() => {}} />;
}
