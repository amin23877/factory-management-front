import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { renameColumn } from "api/matrix";

const schema = Yup.object().shape({
  newName: Yup.string().required(),
});
function RenamePart({
  initialValue,
  open,
  onClose,
  onDone,
  newColumns,
}: {
  open: boolean;
  initialValue: { formerName: string; newName: string };
  onClose: () => void;
  onDone: any;
  newColumns: any;
}) {
  const handleSubmit = (d: any, { setSubmitting }: { setSubmitting: any }) => {
    setSubmitting(true);
    newColumns.map(async (i: any) => {
      if (i.name === initialValue.formerName) {
        await renameColumn(i.id, d.newName);
        onDone();
        onClose();
      }
      return 0;
    });
    setSubmitting(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} title="Edit column">
        <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                <TextField
                  disabled
                  name="formerName"
                  placeholder="formerName"
                  label="formerName"
                  value={values.formerName}
                />
                <TextField
                  name="newName"
                  placeholder="newName"
                  label="newName"
                  value={values.newName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.newName)}
                />
                <Button kind="add" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default RenamePart;
