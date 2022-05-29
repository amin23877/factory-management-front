import React from "react";
import { Typography } from "@material-ui/core";

import NewDataGrid from "app/NewDataGrid";
import DataGridAction from "common/DataGridAction";
import { LockProvider } from "common/Lock";

import { splitLevelName } from "logic/levels";
import { clusterType } from "api/cluster";

const columns = [
  { name: "createdAt", header: "Date", type: "date" },
  { name: "name", header: "Name", render: ({ value }: any) => splitLevelName(value) },
  { name: "valid", header: "Valid Values", render: ({ value }: any) => value.join(","), flex: 1 },
  {
    name: "actions",
    header: "",
    render: ({ data }: any) => (
      <div>
        <DataGridAction icon="edit" onClick={() => {}} />
        <DataGridAction icon="delete" onClick={() => {}} />
      </div>
    ),
  },
];

export default function Levels({ selectedRow }: { selectedRow: clusterType }) {
  return (
    <LockProvider>
      <Typography variant="h5">Levels</Typography>
      <NewDataGrid url={`/level?clusterId=${selectedRow.id}`} columns={columns} onRowSelected={() => {}} />
    </LockProvider>
  );
}
