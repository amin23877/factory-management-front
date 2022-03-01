import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";
import TextField from "app/TextField";
import LinkSelect from "app/Inputs/LinkFields";

export default function AddDeviceModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  return (
    <Dialog title="Add Device" open={open} onClose={onClose}>
      <Formik initialValues={{} as any} onSubmit={(data) => onSubmit({ ...data, type: "device" })}>
        {({ getFieldProps, setFieldValue, values }) => (
          <Form>
            <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
              <LinkSelect
                value={values.ItemId}
                choseItem={values.ItemId}
                label="Item"
                path="/item"
                filterLabel="no"
                getOptionList={(resp) => resp?.result}
                getOptionLabel={(item) => item?.no || item?.name || "No-Name"}
                getOptionValue={(item) => item?.id}
                onChange={(e, nv) => {
                  console.log({ nv });
                  setFieldValue("ItemId", nv.id);
                  setFieldValue("ItemObject", nv);
                  if (nv.isUnit) {
                    setFieldValue("unit", nv.isUnit);
                    setFieldValue("standardWarranty", true);
                  }
                }}
                url="/panel/engineering"
              />
              <TextField type="number" label="Quantity" {...getFieldProps("qty")} required />
              <TextField type="number" label="Price" {...getFieldProps("price")} required />
              <FormControlLabel label="Unit" control={<Checkbox />} {...getFieldProps("unit")} />
              <FormControlLabel
                label="Standard Warranty"
                control={<Checkbox />}
                {...getFieldProps("standardWarranty")}
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
