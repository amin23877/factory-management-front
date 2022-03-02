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
  deviceId?: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const getOptionList = (resp: any) => {
    if (deviceId) {
      return resp?.services || [];
    } else if (!deviceId) {
      return resp?.result || [];
    }

    return [];
  };

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
                path={deviceId ? `/item/${deviceId}` : "/service"}
                filterLabel="name"
                getOptionList={getOptionList}
                getOptionLabel={(item) => item?.name || item?.no || "No-Name"}
                getOptionValue={(item) => item?.id}
                onChange={(e, nv) => {
                  setFieldValue("ServiceId", nv.id);
                  setFieldValue("ServiceObject", nv);
                  setFieldValue("price", nv.price);
                }}
                url="/panel/service"
              />
              <TextField type="number" label="Quantity" {...getFieldProps("qty")} required />
              <TextField
                type="number"
                label="Price"
                {...getFieldProps("price")}
                required
                InputLabelProps={{ shrink: true }}
              />
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
