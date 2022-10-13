import React from "react";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import Toast from "app/Toast";
import Button from "app/Button";

import { mutate } from "swr";
import { General } from "./Forms";
import { Box } from "@material-ui/core";
import { createProcess, IProcess } from "api/process";
import { capitalizeFirstLetter } from "logic/utils";

export default function AddProcessModal({
  open,
  onClose,
  type,
  ItemId,
}: {
  open: boolean;
  onClose: () => void;
  type: string;
  ItemId: string;
}) {
  const handleSubmit = async (data: any) => {
    try {
      await createProcess({ ...data, type, ItemId });
      Toast("Process added successfully", "success");
      mutate(`/process?ItemId=${ItemId}&type=${type}`);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      title={`Add New ${capitalizeFirstLetter(type)} Process`}
    >
      <Formik initialValues={{} as IProcess} onSubmit={handleSubmit}>
        {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Box>
              <General
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                itemId={ItemId}
              />
            </Box>
            <Box display={"flex"} justifyContent="center" mt={5} width="100%">
              <Button type="submit" kind="add">
                {" "}
                Submit{" "}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
