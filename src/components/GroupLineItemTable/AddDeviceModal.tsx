import React from "react";
import { Box, Checkbox, FormControlLabel, MenuItem } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR from "swr";

import Dialog from "app/Dialog";
import Button from "app/Button";
import TextField from "app/TextField";

import { IItem } from "api/items";

export default function AddDeviceModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const { data: items } = useSWR<{ result: IItem[]; total: number }>("/item?device=true");

  return (
    <Dialog title="Add Device" open={open} onClose={onClose}>
      <Formik initialValues={{}} onSubmit={(data) => onSubmit({ ...data, type: "device" })}>
        {({ getFieldProps, setFieldValue }) => (
          <Form>
            <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
              <TextField
                label="Device"
                select
                onChange={(e) => {
                  setFieldValue("ItemId", (e.target.value as any).id);
                  setFieldValue("ItemObject", e.target.value);
                  if (e.target.value && (e.target.value as any).isUnit) {
                    setFieldValue("unit", (e.target.value as any).isUnit);
                    setFieldValue("standardWarranty", true);
                  }
                }}
                required
              >
                {items &&
                  items.result &&
                  items.result.map((item) => (
                    <MenuItem key={item.id} value={item as any}>
                      {item.no || item.name || "No-Name"}
                    </MenuItem>
                  ))}
              </TextField>
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
