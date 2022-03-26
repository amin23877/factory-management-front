import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import LinkField from "app/Inputs/LinkFields";

import { receiveType } from "api/receive";

export default function Modal({
  open,
  initialValues,
  onClose,
}: {
  initialValues?: receiveType;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog title="Add Receiving" open={open} onClose={onClose}>
      <Box m={1}>
        <Formik initialValues={initialValues || ({} as receiveType)} onSubmit={() => {}}>
          {({ getFieldProps, values, setFieldValue }) => (
            <Form>
              <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
                <LinkField
                  label="PO"
                  filterLabel="number"
                  getOptionLabel={(i) => i.number || "No-Number"}
                  getOptionList={(r) => r?.result || []}
                  getOptionValue={(i) => i.id}
                  path="/po"
                  choseItem={values.POId}
                  value={values.POId}
                  onChange={(e, nv) => setFieldValue("POId", nv.id)}
                />
                <LinkField
                  label="PO Line Item"
                  filterLabel="number"
                  getOptionLabel={(i) => i?.ItemId?.number || i?.ItemId?.name || "No-Number"}
                  getOptionList={(r) => r?.result || []}
                  getOptionValue={(i) => i.id}
                  path="/po"
                  choseItem={values.POLineItemId}
                  value={values.POLineItemId}
                  onChange={(e, nv) => setFieldValue("POLineItemId", nv.id)}
                />
                <TextField label="Quantity" {...getFieldProps("quantity")} />
                <Button kind="add" type="submit">
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
