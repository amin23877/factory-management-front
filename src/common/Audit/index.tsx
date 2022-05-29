import React from "react";
import NewDataGrid from "app/NewDataGrid";
import { ClearRounded, CheckRounded } from "@material-ui/icons";

const columns = [
  { name: "type", header: "Type" },
  { name: "employee", header: "Employee" },
  { name: "createdAt", header: "Date", type: "date", flex: 1 },
  { name: "change", header: "Change", render: ({ data }: any) => Object.keys(data?.change || {})[0] || "" },
  {
    name: "before",
    header: "Before",
    type: "string",
    render: ({ data }: any) => {
      const changeKey = Object.keys(data?.change || {})[0] || "";

      if (typeof data.change[changeKey]?.before === "boolean") {
        return data.change[changeKey]?.before ? <CheckRounded /> : <ClearRounded />;
      }

      return <span>{`${data.change[changeKey]?.before}`}</span>;
    },
  },
  {
    name: "after",
    header: "After",
    render: ({ data }: any) => {
      const changeKey = Object.keys(data?.change || {})[0] || "";

      if (typeof data.change[changeKey]?.before === "boolean") {
        return data.change[changeKey]?.before ? <CheckRounded /> : <ClearRounded />;
      }

      return <span>{`${data.change[changeKey]?.before}`}</span>;
    },
  },
];

export default function AuditTable({ itemId, model }: { model: "Item" | "SO" | "PO"; itemId: string }) {
  return <NewDataGrid url={`/audit?col=${model}&docId=${itemId}`} columns={columns} onRowSelected={() => {}} />;
}
