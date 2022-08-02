import React, { useState } from "react";
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
import { AddRounded, DeleteRounded } from "@material-ui/icons";
import DataGrid from "app/NewDataGrid";

import Dialog from "app/Dialog";
import Button from "app/Button";

import Toast from "app/Toast";
import useSWR, { mutate } from "swr";
import { createSubProcess, deleteSubProcess, IProcess, ITask } from "api/process";
import Confirm from "common/Confirm";
import { Form, Formik } from "formik";
import { SubProcess } from "./Forms";
import { capitalizeFirstLetter } from "logic/utils";

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

  const { data: tasks } = useSWR<IProcess>(`/process/${ProcessId}`);

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
      onConfirm: async () => {
        try {
          if (ProcessId) {
            await deleteSubProcess(ProcessId, i?.majorStep, i?.minorStep);
            Toast("Process deleted", "success");
          }
        } catch (error) {
          console.log(error);
        } finally {
          mutate(`/process/${ProcessId}`);
        }
      },
    });
  };
  const tasksCols = [
    {
      name: "title",
      header: "Title",
      type: "string",
    },
    {
      name: "builtToStock",
      header: "B.T.S",
      width: 60,
      type: "boolean",
    },
    {
      name: "instruction",
      header: "Instruction",
      flex: 1,
      type: "string",
      render: ({ data }: any) => {
        return (
          <Box display="flex" alignItems="center" style={{ gap: 4 }}>
            <div>
              <Tooltip title={data.instruction}>
                <span>{data.instruction}</span>
              </Tooltip>
            </div>
            <Button
              color="secondary"
              variant="contained"
              style={{ marginLeft: "auto" }}
              onClick={() => {
                setAddTask(true);
                setSelectedTask(data);
              }}
            >
              Add
            </Button>
          </Box>
        );
      },
    },
  ];

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
          <div style={{ height: "100%" }}>
            <DataGrid
              columns={tasksCols}
              url={`/task?type=${type}`}
              onRowSelected={() => {}}
              style={{ minHeight: "calc(100vh - 180px)" }}
              rowHeight={48}
            />
          </div>
        </Box>
        <Box flex={2}>
          <Paper style={{ height: "calc(100vh - 180px)" }}>
            <Typography variant="h6" style={{ padding: 8, paddingTop: 16 }}>
              Selected Tasks
            </Typography>
            <List style={{ height: "80%", overflow: "auto" }}>
              {tasks?.tasks &&
                tasks?.tasks.map((i, idx) => (
                  <ListItem key={i.id} style={{ padding: "0px 16px", background: idx % 2 === 0 ? "white" : "#e3e3e3" }}>
                    <ListItemText
                      primary={i.majorStep + "." + i.minorStep + " " + i.task?.title}
                      secondary={i.task?.instruction}
                    />
                    <ListItemSecondaryAction>
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
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Dialog>
  );
}
