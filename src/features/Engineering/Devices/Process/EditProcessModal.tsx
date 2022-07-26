import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { changeProcess, deleteProcess, IProcess } from "api/process";
import BaseDataGrid from "app/BaseDataGrid";
import Button from "app/Button";
import Toast from "app/Toast";
import Confirm from "common/Confirm";
import { Formik, Form } from "formik";
import { mutate } from "swr";
import { General } from "./Forms";
import SubProcessModal from "./AddTaskModal";
import Dialog from "app/Dialog";

interface IEditTaskModal {
  open: boolean;
  ItemId: string;
  process: IProcess;
  onClose: () => void;
  type: string;
}

export default function EditProcessModal({ open, onClose, ItemId, process, type }: IEditTaskModal) {
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState();

  const cols: GridColumns = [
    { field: "order", headerName: "Order", valueFormatter: ({ row }) => row?.majorStep + "." + row?.minorStep },
    { field: "title", headerName: "Title", valueFormatter: ({ row }) => row?.TaskId?.title },
    {
      field: "instructions",
      headerName: "Instructions",
      flex: 1,
      valueFormatter: ({ row }) => row?.TaskId?.instructions,
    },
  ];

  const handleSubmit = (values: IProcess, { setSubmitting }: any) => {
    changeProcess(process.id, values)
      .then((d) => {
        mutate(`/process?ItemId=${ItemId}&type=${type}`);
        onClose();
      })
      .catch((e) => console.log(e))
      .finally(() => setSubmitting(false));
  };

  const handleDelete = () => {
    Confirm({
      onConfirm: async () => {
        try {
          if (process && process.id) {
            await deleteProcess(process.id);
            Toast("Process deleted", "success");
          }
        } catch (error) {
          console.log(error);
        } finally {
          mutate(`/process?ItemId=${ItemId}&type=${type}`);
          onClose();
        }
      },
    });
  };

  return (
    <Dialog title={"Edit Process"} open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Formik initialValues={process ? process : ({} as IProcess)} onSubmit={handleSubmit}>
        {({ values, handleBlur, handleChange, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <Box m={2} display="grid" gridTemplateColumns="1fr" gridGap={10}>
              <General
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
              <Button type="submit" disabled={isSubmitting} kind={"edit"} style={{ alignSelf: "center" }}>
                Save
              </Button>
              <Button onClick={handleDelete} kind="delete" disabled={isSubmitting} style={{ alignSelf: "center" }}>
                Delete
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
