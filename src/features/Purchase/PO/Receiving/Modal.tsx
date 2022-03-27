import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import LinkField from "app/Inputs/LinkFields";

import { createReceive, deleteReceive, receiveType, updateReceive } from "api/receive";
import { getModifiedValues } from "logic/utils";

export default function Modal({
  open,
  initialValues,
  onClose,
  onDone,
}: {
  initialValues?: receiveType;
  open: boolean;
  onClose: () => void;
  onDone?: () => void;
}) {
  const handleSubmit = async (data: any) => {
    try {
      if (initialValues && initialValues.id) {
        const reqData = getModifiedValues(data, initialValues);
        // await updateReceive(initialValues.id, reqData);
        onDone && onDone();
        onClose();

        console.log({ data: reqData });
      } else {
        // await createReceive(data);
        onDone && onDone();
        onClose();

        console.log({ data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (initialValues && initialValues.id) {
        await deleteReceive(initialValues.id);
        onDone && onDone();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog title="Add Receiving" open={open} onClose={onClose}>
      <Box m={1}>
        <Formik initialValues={initialValues || ({} as receiveType)} onSubmit={handleSubmit}>
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
                {initialValues && initialValues.id ? (
                  <Button kind="add" type="submit">
                    Submit
                  </Button>
                ) : (
                  <>
                    <Button kind="edit" type="submit">
                      Save
                    </Button>
                    <Button kind="delete" onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
