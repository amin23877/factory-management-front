import React, { useState } from "react";
import { Box, Tooltip, useMediaQuery } from "@material-ui/core";
import { changeSubProcess, deleteSubProcess, IProcess, ITask } from "api/process";

import Button from "app/Button";

import DataGrid from "app/NewDataGrid";

import SubProcessModal from "./AddTaskModal";
import Dialog from "app/Dialog";
import { capitalizeFirstLetter } from "logic/utils";
import { ClearRounded, SearchRounded } from "@material-ui/icons";
import Confirm from "common/Confirm";
import Toast from "app/Toast";
import { LockButton, useLock } from "common/Lock";
import { useHistory } from "react-router-dom";
import { openRequestedSinglePopup } from "logic/window";

interface IEditTaskModal {
  open: boolean;
  process: IProcess;
  onClose: () => void;
  type: string;
}

export default function TasksModal({ open, onClose, process, type }: IEditTaskModal) {
  const [addTask, setAddTask] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const { lock } = useLock();
  const history = useHistory();
  const phone = useMediaQuery("(max-width:900px)");

  const handleDelete = (i: ITask) => {
    Confirm({
      onConfirm: async () => {
        try {
          await deleteSubProcess(process.id, i?.majorStep, i?.minorStep);
          Toast("Process deleted", "success");
        } catch (error) {
          console.log(error);
        } finally {
          setRefresh((p) => p + 1);
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
      setRefresh((p) => p + 1);
    }
  };

  const cols = [
    {
      name: "order",
      header: "Order",
      render: ({ data }: any) => data?.majorStep + "." + data?.minorStep,
    },
    {
      editable: false,
      name: "title",
      header: "Title",
      render: ({ data }: any) => data?.title,
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
              <Tooltip title={data.instruction}>
                <span>{data.instruction}</span>
              </Tooltip>
            </div>
            <div style={{ flex: 1 }}></div>
            <div
              onClick={() => {
                if (phone) {
                  history.push(`/panel/production/taskList/${data.id}`);
                } else {
                  openRequestedSinglePopup({ url: `/panel/production/taskList/${data.id}` });
                }
              }}
            >
              <SearchRounded style={{ fontSize: "1.6rem", color: "#426792", cursor: "pointer" }} />
            </div>
            <div
              onClick={() => {
                if (!lock) {
                  handleDelete(data);
                }
              }}
            >
              <ClearRounded
                style={{ fontSize: "1.6rem", color: lock ? "#ccc" : "#e71414", cursor: lock ? "auto" : "pointer" }}
              />
            </div>
          </Box>
        );
      },
    },
  ];
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
            <Box display="flex" justifyContent={"space-between"} alignItems="center" width={"100%"}>
              <Button onClick={() => setAddTask(true)} kind="add" style={{ marginBottom: "10px" }} disabled={lock}>
                Add Task
              </Button>
              <LockButton />
            </Box>
            <DataGrid
              rowHeight={20}
              columns={cols}
              style={{ minHeight: "450px" }}
              editable={!lock}
              url={`/process/${process.id}/tasks`}
              onRowSelected={() => {}}
              refresh={refresh}
              onEditComplete={(params: any) => handleEdit({ data: params.data, value: params.value })}
            />
          </Box>
        </Box>
      </Dialog>
      <SubProcessModal
        open={addTask}
        onClose={() => {
          setRefresh((p) => p + 1);
          setAddTask(false);
        }}
        ProcessId={process.id}
        type={type}
      />
    </>
  );
}
