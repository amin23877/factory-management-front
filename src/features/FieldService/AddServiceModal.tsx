import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";

import { createFieldService, IFieldService } from "../../api/fieldService";
import FieldServiceForm from "./Forms";

let schema = Yup.object().shape({
  name: Yup.string().required(),
  no: Yup.string().required(),
  class: Yup.string().required(),
  type: Yup.string().required(),
  price: Yup.string().required(),
});

export default function AddServiceModal({
  open,
  onClose,
  onDone,
  device,
}: {
  open: boolean;
  onClose: () => void;
  onDone: () => void;
  device?: string;
}) {
  const handleSubmit = async (data: any) => {
    try {
      const resp = await createFieldService(data);
      if (resp) {
        onDone();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Add new field service" fullWidth maxWidth="sm">
      <Box p={2}>
        <Formik initialValues={{} as IFieldService} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, handleChange, handleBlur }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                <FieldServiceForm
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  device={device}
                />
                <Button style={{ margin: "0.5em 0", gridColumnStart: "span 2" }} type="submit" kind="add">
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
