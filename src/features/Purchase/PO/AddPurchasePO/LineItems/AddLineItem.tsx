import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";
import Button from "app/Button";
import { lineItemType } from ".";

export default function AddLineItem({
  open,
  vendorId,
  onClose,
  onAdd,
}: {
  open: boolean;
  vendorId: string;
  onClose: () => void;
  onAdd: (line: lineItemType) => void;
}) {
  return (
    <Dialog title="Add Line Item" open={open} onClose={onClose}>
      <Box>
        <Formik
          initialValues={{} as any}
          onSubmit={(d) => {
            onAdd({ ...d, vendorETA: Number(new Date(d.vendorETA)) });
          }}
        >
          {({ getFieldProps, setFieldValue, values }) => (
            <Form>
              <Box display="flex" flexDirection="column" style={{ gap: 10 }}>
                <LinkField
                  filterLabel="no"
                  getOptionLabel={(item) => item?.ItemId?.no || item?.ItemId?.name || "No-Number"}
                  getOptionList={(resp) => resp || []}
                  getOptionValue={(item) => item._id}
                  path={`/vendor/${vendorId}/items`}
                  value={values.ItemId}
                  choseItem={values.ItemObject}
                  onChange={(e, nv) => {
                    setFieldValue("ItemId", nv?.ItemId?._id);
                    setFieldValue("ItemObject", nv?.ItemId);
                  }}
                />
                <TextField type="number" label="Quantity" {...getFieldProps("quantity")} />
                <TextField type="number" label="Cost" {...getFieldProps("cost")} />
                <TextField
                  type="datetime-local"
                  label="Vendor ETA"
                  {...getFieldProps("vendorETA")}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField label="Notes" {...getFieldProps("notes")} multiline rows={3} />
                <FormControlLabel label="Tax" control={<Checkbox />} {...getFieldProps("tax")} />
                <Button type="submit" kind="add">
                  Add
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
