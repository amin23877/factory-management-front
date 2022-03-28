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
                {/* <LinkField
                  label="PO"
                  filterLabel="number"
                  getOptionLabel={(i) => i.number || "No-Number"}
                  getOptionList={(r) => r?.result || []}
                  getOptionValue={(i) => i.id}
                  path="/po"
                  choseItem={values.POId}
                  value={values.POId}
                  onChange={(e, nv) => {
                    setFieldValue("POId", nv.id);
                  }}
                /> */}
                {/* <LinkField
                  placeholder="Item"
                  value={values.POLineItemId}
                  choseItem={values.POLineItemId}
                  label="Item"
                  path="/item"
                  filterLabel="no"
                  getOptionList={(resp) => resp?.result}
                  getOptionLabel={(item) => item?.no || item?.name || "No-Name"}
                  getOptionValue={(item) => item?.id}
                  onChange={(e, nv) => {
                    setFieldValue("POLineItemId", nv.id);
                  }}
                  url="/panel/engineering"
                /> */}
                {/* TODO: Fix this link select with unpaginated api, local search and deep linked accessor */}
                <LinkField
                  url="/panel/inventory"
                  label="PO Line Item"
                  filterLabel="no"
                  choseItem={values.POLineItemId}
                  value={values.POLineItemId}
                  getOptionLabel={(i) => i?.ItemId?.no || i?.ItemId?.name || "No-Number"}
                  getOptionList={(r) => r?.result || []}
                  getOptionValue={(i) => i?.id}
                  path={`/polineitem?POId=${POId}`}
                  onChange={(e, nv) => {
                    setFieldValue("POLineItemId", nv.id);
                  }}
                  // disabled={!values.POId || values.POId === ""}
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
