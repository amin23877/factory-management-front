import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";
import TextField from "app/TextField";
import LinkSelect from "app/Inputs/LinkFields";

export default function AddOptionModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  return (
    <Dialog title="Add Option" open={open} onClose={onClose}>
      <Formik initialValues={{} as any} onSubmit={(data) => onSubmit({ ...data, type: "option" })}>
        {({ getFieldProps, setFieldValue, values }) => (
          <Form>
            <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
              <LinkSelect
                value={values.ItemId}
                choseItem={values.ItemId}
                label="Option"
                path="/item?option=true"
                filterLabel="name"
                getOptionList={(resp) => resp?.result || []}
                getOptionLabel={(item) => item?.name || item?.no || "No-Name"}
                getOptionValue={(item) => item?.id}
                onChange={(e, nv) => {
                  setFieldValue("ItemId", nv.id);
                  setFieldValue("ItemObject", nv);
                  setFieldValue("price", nv.retailPrice);
                }}
                url="/panel/item"
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
