import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";

const schema = Yup.object().shape({
  usage: Yup.number().required(),
});
function AddUsageModal({
  open,
  onClose,
  onDone,
  prevPart,
}: {
  open: boolean;
  onClose: () => void;
  onDone: (usage: string) => void;
  prevPart: any;
}) {
  return (
    <Dialog open={open} onClose={onClose} title={prevPart ? "Edit Usage" : "Add Usage"}>
      <Formik
        initialValues={{ usage: prevPart?.usage } as { usage: string }}
        validationSchema={schema}
        onSubmit={(d) => onDone(d.usage)}
      >
        {({ values, errors, handleChange, handleBlur }) => (
          <Form>
            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
              <TextField
                name="usage"
                placeholder="usage"
                label="usage"
                value={values.usage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.usage)}
              />
              <Button kind={prevPart ? "edit" : "add"} type="submit">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default AddUsageModal;
