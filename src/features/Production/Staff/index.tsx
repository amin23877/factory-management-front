import React from "react";
import { BasePaper } from "../../../app/Paper";
import DataGrid from "../../../app/NewDataGrid";

function Index() {
  const cols = [
    { name: "Name", render: ({ data }: any) => data?.UnitId?.assignee?.firstName, flex: 1 },
    { name: "Last Name", render: ({ data }: any) => data?.UnitId?.assignee?.lastName, flex: 1 },
    { name: "Role", render: ({ data }: any) => data?.UnitId?.assignee?.position, flex: 1 },
    {
      name: "Task",
      render: ({ data }: any) => data?.EngEvalTaskId?.id || data?.EngManTaskId?.id || data?.EngTestTaskId?.id,
      flex: 1,
    },
    {
      name: "assginDate",
      header: "Assigned Date",
      flex: 1,
      type: "date",
    },
  ];

  return (
    <BasePaper>
      <DataGrid columns={cols} url="/prodtask" onRowSelected={(d) => {}} />
    </BasePaper>
  );
}

export default Index;
