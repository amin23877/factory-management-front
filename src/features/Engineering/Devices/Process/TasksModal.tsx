import React, { useEffect, useState } from "react";
import { Box, makeStyles, Tooltip } from "@material-ui/core";
import { changeSubProcess, deleteSubProcess, IProcess, ITask } from "api/process";

import Button from "app/Button";

import DataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

import SubProcessModal from "./AddTaskModal";
import Dialog from "app/Dialog";
import useSWR, { mutate } from "swr";
import ShowPartsModal from "./ShowPartsModal";
import { capitalizeFirstLetter } from "logic/utils";
import { DeleteRounded, SearchRounded } from "@material-ui/icons";
import Confirm from "common/Confirm";
import Toast from "app/Toast";

interface IEditTaskModal {
  open: boolean;
  ItemId: string;
  process: IProcess;
  onClose: () => void;
  type: string;
}

export default function TasksModal({ open, onClose, ItemId, process, type }: IEditTaskModal) {
  const [addTask, setAddTask] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>();
  const [processTasks, setProcessTasks] = useState<any[]>([]);

  const { data: tasks } = useSWR(`/process/${process.id}`);

  const handleDelete = (i: ITask) => {
    Confirm({
      onConfirm: async () => {
        try {
          await deleteSubProcess(process.id, i?.majorStep, i?.minorStep);
          Toast("Process deleted", "success");
        } catch (error) {
          console.log(error);
        } finally {
          mutate(`/process/${process.id}`);
        }
      },
    });
  };

  const handleEdit = async ({ data, value }: { data: any; value: string }) => {
    try {
      const temp = value.split(".");
      await changeSubProcess(process.id, data?.majorStep, data?.minorStep, {
        majorStep: temp[0],
        minorStep: temp[1],
      });
      Toast("Record updated successfully", "success");
    } catch (error) {
      console.log(error);
    } finally {
      mutate(`/process/${process.id}`);
    }
  };

  const useStyles = makeStyles({
    root: {
      "& .InovuaReactDataGrid__column-header": {
        background: "#202731",
        color: "#fff",
      },
    },
  });

  const classes = useStyles();

  const cols = [
    {
      name: "order",
      editable: true,
      header: "Order",
      render: ({ data }: any) => data?.majorStep + "." + data?.minorStep,
    },
    {
      editable: false,
      name: "title",
      header: "Title",
      render: ({ data }: any) => data?.task?.title,
      flex: 1,
    },
    {
      editable: false,

      name: "instruction",
      header: "Instruction",
      flex: 2,
      render: ({ data }: any) => {
        return (
          <Box display="flex" alignItems="center" style={{ gap: 4 }}>
            <div>
              <Tooltip title={data.task?.instruction}>
                <span>{data.task?.instruction}</span>
              </Tooltip>
            </div>
            <div style={{ flex: 1 }}></div>
            <div
              onClick={() => {
                setSelectedTask(data);
                setShowParts(true);
              }}
            >
              <SearchRounded style={{ fontSize: "1.6rem", color: "#426792", cursor: "pointer" }} />
            </div>
            {/* <div
              onClick={() => {
                if (!lock) {
                  setEditProcess(true);
                  setSelectedProcess(data);
                }
              }}
            >
              <EditRounded
                style={{ fontSize: "1.6rem", color: lock ? "#ccc" : "#426792", cursor: lock ? "auto" : "pointer" }}
              />
            </div> */}
            <div
              onClick={() => {
                handleDelete(data);
              }}
            >
              <DeleteRounded style={{ fontSize: "1.6rem", color: "#e71414", cursor: "pointer" }} />
            </div>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    if (tasks) {
      const temp = tasks?.tasks.slice();
      temp.map((el: any, idx: number) => {
        if (el._id) {
          return (el.id = el._id);
        } else {
          return (el.id = idx);
        }
      });
      setProcessTasks(temp);
    }
  }, [tasks]);

  return (
    <>
      <Dialog
        title={`${capitalizeFirstLetter(type + "")} Process Tasks`}
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
      >
        <Box display="grid" gridTemplateColumns={"1fr"} gridGap={10}>
          <Box>
            <Button onClick={() => setAddTask(true)} kind="add" style={{ marginBottom: "10px" }}>
              Add Task
            </Button>
            <DataGrid
              className={classes.root}
              rowHeight={20}
              columns={cols}
              dataSource={processTasks}
              pagination
              style={{ minHeight: "450px" }}
              defaultLimit={250}
              rowClassName={({ data }: any) => {
                if (data?.DeviceId) {
                  return "";
                }
                return "no-device";
              }}
              // @ts-ignore
              pageSizes={[50, 100, 250, 500]}
              editable={true}
              onEditComplete={(params: any) => handleEdit({ data: params.data, value: params.value })}
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
        type={type}
      />
      {selectedTask && (
        <ShowPartsModal
          open={showParts}
          onClose={() => {
            setShowParts(false);
          }}
          TaskId={selectedTask.task.id}
        />
      )}
    </>
  );
}
