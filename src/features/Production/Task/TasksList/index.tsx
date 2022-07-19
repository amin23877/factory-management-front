import React from "react";

import DataGrid from "app/NewDataGrid";
import { ITaskList } from "api/taskList";

function Table({ onRowSelected }: { onRowSelected: (row: ITaskList) => void }) {
  const tasksCols = [
    {
      name: "type",
      header: "Type",
      minWidth: 120,
      type: "string",
    },
    {
      name: "title",
      header: "Title",
      minWidth: 120,
      type: "string",
    },
    {
      name: "instruction",
      header: "Instruction",
      minWidth: 120,
      flex: 1,
      type: "string",
    },
    {
      name: "relatedPart",
      header: "Related Part",
      minWidth: 120,
      type: "string",
    },
    {
      name: "builtToStock",
      header: "B.T.S",
      width: 60,
      type: "boolean",
    },
  ];

  return (
    <>
      <DataGrid columns={tasksCols} url="/task" onRowSelected={onRowSelected} />
    </>
  );
}

export default Table;
