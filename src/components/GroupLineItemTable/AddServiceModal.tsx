import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";
import TextField from "app/TextField";
import { CacheFieldSelect } from "app/Inputs";

export default function AddServiceModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  return (
    <Dialog title="Add Service" open={open} onClose={onClose}>
      <Formik initialValues={{}} onSubmit={(data) => onSubmit({ ...data, type: "service" })}>
        {({ getFieldProps, setFieldValue }) => (
          <Form>
            <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
              <CacheFieldSelect
                label="Service"
                url="/service"
                itemTitleField="no"
                itemValueField="id"
                getOptionList={(resp) => resp?.result || []}
                onChange={(e) => {
                  setFieldValue("ServiceId", e.target.value);
                  setFieldValue("ServiceObject", e.target.value);
                }}
                required
              />
              <TextField type="number" label="Quantity" {...getFieldProps("qty")} required />
              <TextField type="number" label="Price" {...getFieldProps("price")} required />
              <FormControlLabel label="Unit" control={<Checkbox />} {...getFieldProps("unit")} />
              <Button type="submit" kind="add">
                Add
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
