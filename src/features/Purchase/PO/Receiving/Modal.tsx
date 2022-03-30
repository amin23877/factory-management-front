import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
// import LinkField from "app/Inputs/LinkFields";
import AsyncCombo from "common/AsyncCombo";

import { createReceive, deleteReceive, receiveType, updateReceive } from "api/receive";
import { getModifiedValues } from "logic/utils";

export default function Modal({
  open,
  POId,
  initialValues,
  onClose,
  onDone,
}: {
  open: boolean;
  POId: string;
  initialValues?: receiveType;
  onClose: () => void;
  onDone?: () => void;
}) {
  console.log({ initialValues });

  const handleSubmit = async (data: any) => {
    try {
      if (initialValues && initialValues.id) {
        const reqData = getModifiedValues(data, initialValues);
        await updateReceive(initialValues.id, reqData);
        onDone && onDone();
        onClose();
      } else {
        await createReceive(data);
        onDone && onDone();
        onClose();
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
        <Formik initialValues={initialValues || ({ POId } as receiveType)} onSubmit={handleSubmit}>
          {({ getFieldProps, values, setFieldValue }) => (
            <Form>
              <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
                <AsyncCombo
                  label="PO Line Item"
                  url={`/polineitem?POId=${POId}`}
                  valueUrl="/polineitem"
                  filterBy="ItemId.no"
                  value={values.POLineItemId}
                  getOptionLabel={(i) => i?.ItemId?.no || "No-Number"}
                  getOptionSelected={(o, v) => o.id === v.id}
                  onChange={(e, nv) => setFieldValue("POLineItemId", nv.id)}
                />
                <TextField label="Quantity" {...getFieldProps("quantity")} />
                {initialValues && initialValues.id ? (
                  <>
                    <Button kind="edit" type="submit">
                      Save
                    </Button>
                    <Button kind="delete" onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button kind="add" type="submit">
                    Submit
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
