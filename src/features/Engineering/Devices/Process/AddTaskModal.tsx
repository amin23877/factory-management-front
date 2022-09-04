import React, { useEffect, useMemo, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { CheckRounded, ClearRounded, DeleteRounded } from "@material-ui/icons";
import { DataGrid, GridColumns } from "@material-ui/data-grid";

import Dialog from "app/Dialog";
import Button from "app/Button";

import Toast from "app/Toast";
import useSWR, { mutate } from "swr";
import { createSubProcess, deleteSubProcess, IProcess, ITask } from "api/process";
import Confirm from "common/Confirm";
import { Form, Formik } from "formik";
import { SubProcess } from "./Forms";
import { capitalizeFirstLetter } from "logic/utils";
import TextField from "app/TextField";
import { get } from "api";
import { ITaskList } from "api/taskList";

export default function AddTaskModal({
  open,
  onClose,
  ProcessId,
  type,
}: {
  open: boolean;
  onClose: () => void;
  ProcessId: string;
  type: string;
}) {
  const [addTask, setAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask>();

  const [taskTitle, setTaskTitle] = useState<string>();
  const [taskInstructions, setTaskInstructions] = useState<string>();
  const [keywords, setKeywords] = useState<string>();
  const [page, setPage] = useState(1);
  const [taskList, setTaskList] = useState<{ data: ITaskList[]; count: number }>({ data: [], count: 0 });

  const { data: tasks } = useSWR<IProcess>(`/process/${ProcessId}`);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const green = {
    color: "#12AE25",
    width: "100%",
    display: "flex",
    justifyContent: "center ",
    alignItems: "center",
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const red = { color: "#F53636", width: "100%", display: "flex", justifyContent: "center ", alignItems: "center" };

  const handleSubmit = (values: ITask, { setSubmitting }: any) => {
    if (selectedTask) {
      createSubProcess(ProcessId, selectedTask.id as string, values)
        .then((d) => {
          mutate(`/process/${ProcessId}`);
          setAddTask(false);
          setSelectedTask(undefined);
        })
        .catch((e) => console.log(e))
        .finally(() => setSubmitting(false));
    }
  };

  const handleDelete = (i: ITask) => {
    Confirm({
      text: `you are going to delete a Task with title ${i.TaskId?.title}`,
      onConfirm: async () => {
        try {
          if (ProcessId) {
            await deleteSubProcess(ProcessId, i?.majorStep, i?.minorStep);
            Toast("task deleted", "success");
          }
        } catch (error) {
          console.log(error);
        } finally {
          mutate(`/process/${ProcessId}`);
        }
      },
    });
  };

  useEffect(() => {
    const t = setTimeout(() => {
      const params = {
        containtitle: taskTitle,
        startsWithinstruction: taskInstructions,
        containinstruction: keywords,
        page,
      };
      get("/task", { params })
        .then((d) => {
          setTaskList({ data: d.result || [], count: d.total || 0 });
        })
        .catch((e) => console.log(e));
    }, 250);

    return () => clearTimeout(t);
  }, [taskTitle, taskInstructions, keywords, page]);

  const cols = useMemo<GridColumns>(
    () => [
      {
        headerName: "Title",
        field: "title",
        width: 140,
        renderCell: (p: any) => (
          <Tooltip title={String(p.value)}>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>
              {String(p.value)}
            </span>
          </Tooltip>
        ),
      },
      {
        headerName: "B.T.S",
        field: "builtToStock",
        width: 100,
        renderCell: (p: any) => (
          <Tooltip title={String(p.value)}>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: 60 }}>
              {p.value ? (
                <div style={green}>
                  <CheckRounded />
                </div>
              ) : (
                <div style={red}>
                  <ClearRounded />
                </div>
              )}
            </span>
          </Tooltip>
        ),
      },
      {
        field: "instruction",
        headerName: "Instruction",
        flex: 1,
        renderCell: (p: any) => (
          <Box display="flex" alignItems="center" flex={1}>
            <Tooltip title={String(p.value)} style={{ flexGrow: 1 }}>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>
                {String(p.value)}
              </span>
            </Tooltip>
            <Button
              color="secondary"
              variant="contained"
              style={{ marginLeft: "auto" }}
              onClick={() => {
                setAddTask(true);
                setSelectedTask(p.row);
              }}
            >
              Add
            </Button>
          </Box>
        ),
      },
    ],
    [green, red]
  );

  return (
    <Dialog
      title={`Add / Edit ${capitalizeFirstLetter(type)} Tasks`}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
    >
      {selectedTask && (
        <Dialog
          title={"Set Step"}
          open={addTask}
          onClose={() => {
            setAddTask(false);
            setSelectedTask(undefined);
          }}
          fullWidth
          maxWidth="xs"
        >
          <Formik initialValues={{} as ITask} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting, errors, touched }) => (
              <Form>
                <SubProcess
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
                <Box width="100%" m={1} display="flex" justifyContent={"center"}>
                  <Button type="submit" disabled={isSubmitting} kind={"add"} style={{ alignSelf: "center" }}>
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Dialog>
      )}
      <Box style={{ margin: "0.5em 2em", gap: 8 }} display="flex" height="75vh">
        <Box flex={3}>
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" style={{ gap: 8 }} mb={2}>
            <TextField style={{ flex: 1 }} label="Task Title" onChange={(e) => setTaskTitle(e.target.value)} />
            <TextField
              style={{ flex: 1 }}
              label="Task Instructions"
              onChange={(e) => setTaskInstructions(e.target.value)}
            />
            <TextField style={{ flex: 1 }} label="Keywords" onChange={(e) => setKeywords(e.target.value)} />
          </Box>
          <div style={{ height: "90%" }}>
            <DataGrid
              columns={cols}
              rows={taskList.data || []}
              pagination
              paginationMode="server"
              rowCount={taskList.count || 0}
              onPageChange={({ page }) => setPage(page + 1)}
            />
          </div>
        </Box>
        <Box flex={2}>
          <Paper style={{ height: "calc(100vh - 193px)" }}>
            <Typography variant="h6" style={{ padding: 8, paddingTop: 16 }}>
              Selected Tasks
            </Typography>
            <List style={{ height: "80%", overflow: "auto" }}>
              {tasks?.tasks &&
                tasks?.tasks.map((i, idx) => (
                  <ListItem key={i.id} style={{ padding: "0px 16px", background: idx % 2 === 0 ? "white" : "#e3e3e3" }}>
                    <Box display={"flex"} justifyContent="space-between" alignItems="center" width={"100%"}>
                      <ListItemText
                        primary={i.majorStep + "." + i.minorStep + " " + i.task?.title}
                        secondary={i.task?.instruction}
                        style={{ flex: 1 }}
                      />

                      {/* <ListItemSecondaryAction> */}
                      <Box display="flex" alignItems="center">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleDelete(i);
                          }}
                        >
                          <DeleteRounded />
                        </IconButton>
                      </Box>
                      {/* </ListItemSecondaryAction> */}
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Dialog>
  );
}
