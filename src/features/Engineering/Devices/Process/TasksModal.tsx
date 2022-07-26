import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { IProcess } from "api/process";
import BaseDataGrid from "app/BaseDataGrid";
import Button from "app/Button";

import SubProcessModal from "./AddTaskModal";
import Dialog from "app/Dialog";
import useSWR, { mutate } from "swr";

interface IEditTaskModal {
  open: boolean;
  ItemId: string;
  process: IProcess;
  onClose: () => void;
  type: string;
}

export default function TasksModal({ open, onClose, ItemId, process, type }: IEditTaskModal) {
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [processTasks, setProcessTasks] = useState();
  const cols: GridColumns = [
    { field: "order", headerName: "Order", valueFormatter: ({ row }) => row?.majorStep + "." + row?.minorStep },
    { field: "title", headerName: "Title", valueFormatter: ({ row }) => row?.task?.title, flex: 1 },
    {
      field: "instruction",
      headerName: "Instruction",
      flex: 2,
      valueFormatter: ({ row }) => row?.task?.instruction,
    },
  ];
  const { data: tasks } = useSWR(`/process/${process.id}`);
  useEffect(() => {
    if (tasks) {
      const temp = tasks?.tasks.slice();
      temp.map((el: any, idx: number) => (el.id = idx));
      setProcessTasks(temp);
    }
  }, [tasks]);
  return (
    <>
      <Dialog title={"Process Tasks"} open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <Box display="grid" gridTemplateColumns={"1fr"} gridGap={10}>
          <Box>
            <Button onClick={() => setAddTask(true)} kind="add" style={{ marginBottom: "10px" }}>
              Add Task
            </Button>
            <BaseDataGrid
              rows={processTasks || []}
              cols={cols}
              onRowSelected={(d) => {
                setEditTask(true);
                setSelectedTask(d);
              }}
            />
          </Box>
        </Box>
      </Dialog>
      <SubProcessModal
        open={addTask}
        onClose={() => {
          mutate(`/process/${process.id}`);
          setAddTask(false);
        }}
        ProcessId={process.id}
        ItemId={ItemId}
        type={type}
      />
      {selectedTask && (
        <SubProcessModal
          open={editTask}
          onClose={() => {
            mutate(`/process/${process.id}`);
            setAddTask(false);
          }}
          ProcessId={process.id}
          ItemId={ItemId}
          type={type}
          task={selectedTask}
        />
      )}
    </>
  );
}
