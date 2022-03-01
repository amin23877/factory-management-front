import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";
import TextField from "app/TextField";
import LinkSelect from "app/Inputs/LinkFields";

export default function AddServiceModal({
  open,
  deviceId,
  onClose,
  onSubmit,
}: {
  open: boolean;
  deviceId: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  return (
    <Dialog title="Add Service" open={open} onClose={onClose}>
      <Formik initialValues={{} as any} onSubmit={(data) => onSubmit({ ...data, type: "service" })}>
        {({ getFieldProps, setFieldValue, values }) => (
          <Form>
            <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
              <LinkSelect
                value={values.ServiceId}
                choseItem={values.ServiceId}
                label="Service"
                path={`/item/${deviceId}`}
                filterLabel="name"
                getOptionList={(resp) => resp?.services || []}
                getOptionLabel={(item) => item?.name || item?.no || "No-Name"}
                getOptionValue={(item) => item?.id}
                onChange={(e, nv) => {
                  setFieldValue("ServiceId", nv.id);
                  setFieldValue("ServiceObject", nv);
                }}
                url="/panel/service"
              />
              <TextField type="number" label="Quantity" {...getFieldProps("qty")} required />
              <TextField type="number" label="Price" {...getFieldProps("price")} required />
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
