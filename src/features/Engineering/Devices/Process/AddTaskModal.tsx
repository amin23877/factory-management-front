import { Box } from "@material-ui/core";
import { changeSubProcess, createSubProcess, deleteSubProcess, ITask } from "api/process";
import Button from "app/Button";
import Toast from "app/Toast";
import Confirm from "common/Confirm";
import { Formik, Form } from "formik";
import React from "react";
import { mutate } from "swr";
import { SubProcess } from "./Forms";
import Dialog from "app/Dialog";

interface IEditTaskModal {
  open: boolean;
  task?: ITask;
  ProcessId: string;
  onClose: () => void;
  type: string;
  ItemId: string;
}

export default function SubProcessModal({ open, onClose, ProcessId, task, type, ItemId }: IEditTaskModal) {
  const handleSubmit = (values: ITask, { setSubmitting }: any) => {
    if (task && task.id) {
      changeSubProcess(ProcessId, task.majorStep, task.minorStep, values)
        .then((d) => {
          mutate(`/process?ItemId=${ItemId}&type=${type}`);
          onClose();
        })
        .catch((e) => console.log(e))
        .finally(() => setSubmitting(false));
    } else {
      createSubProcess(ProcessId, values.TaskId as string, values)
        .then((d) => {
          mutate(`/process?ItemId=${ItemId}&type=${type}`);
          onClose();
        })
        .catch((e) => console.log(e))
        .finally(() => setSubmitting(false));
    }
  };

  const handleDelete = () => {
    Confirm({
      onConfirm: async () => {
        try {
          if (task && ProcessId) {
            await deleteSubProcess(ProcessId, task?.majorStep, task?.minorStep);
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
      <Formik initialValues={task ? task : ({} as ITask)} onSubmit={handleSubmit}>
        {({ values, handleBlur, handleChange, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <Box display="grid" gridTemplateColumns={"1fr"} gridGap={10}>
              <Box m={2} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                <SubProcess
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  type={type}
                />
                <Box m={2} display="grid" gridTemplateColumns={task ? "1fr 1fr" : "1fr"} gridGap={10}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    kind={task ? "edit" : "add"}
                    style={{ alignSelf: "center" }}
                  >
                    Save
                  </Button>
                  {task && (
                    <Button
                      onClick={handleDelete}
                      kind="delete"
                      disabled={isSubmitting}
                      style={{ alignSelf: "center" }}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
