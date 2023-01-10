import React from "react";
import { Box } from "@material-ui/core";
import { changeProcess, deleteProcess, IProcess } from "api/process";
import Button from "app/Button";
import Toast from "app/Toast";
import Confirm from "common/Confirm";
import { Formik, Form } from "formik";
import { mutate } from "swr";
import { General } from "./Forms";
import Dialog from "app/Dialog";

interface IEditTaskModal {
  open: boolean;
  ItemId: string;
  process: IProcess;
  onClose: () => void;
  type: string;
}

export default function EditProcessModal({ open, onClose, ItemId, process, type }: IEditTaskModal) {
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
      text: `you are going to delete a Process!`,
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
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
