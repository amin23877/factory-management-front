import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { mutate } from "swr";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import LinkField from "app/Inputs/LinkFields";

import { createVending, deleteVending, updateVending } from "api/vending";

const schema = Yup.object().shape({
  ItemId: Yup.string().required(),
  leadTime: Yup.number().required(),
});

export default function VendingModal({
  open,
  onClose,
  onDone,
  vendorId,
  initialValues,
}: {
  initialValues?: any;
  open: boolean;
  vendorId: string;
  onClose: () => void;
  onDone?: () => void;
}) {
  const handleDelete = async () => {
    try {
      if (initialValues && initialValues.id) {
        const resp = await deleteVending(initialValues?.id);
        if (resp) {
          onDone && onDone();
          onClose();
          mutate(`/vendor/${vendorId}/items`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (d: any) => {
    try {
      if (initialValues && initialValues.id) {
        const resp = await updateVending(initialValues.id, d);
        if (resp) {
          onDone && onDone();
          onClose();
          mutate(`/vendor/${vendorId}/items`);
        }
      } else {
        await createVending({ ...d, VendorId: vendorId });
        onDone && onDone();
        onClose();
        mutate(`/vendor/${vendorId}/items`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog title={initialValues?.id ? "Edit Vendor's Item" : `Add New Item to Vendor`} open={open} onClose={onClose}>
      <Box p={2}>
        <Formik initialValues={initialValues || {}} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, handleChange, handleBlur, setFieldValue, getFieldProps }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="0.5em" gridRowGap={8}>
                <LinkField
                  filterLabel="no"
                  getOptionLabel={(item) => item?.no || item?.name || "No-Number"}
                  getOptionList={(resp) => resp?.result || []}
                  getOptionValue={(item) => item.id}
                  path="/item"
                  value={values.ItemId}
                  onChange={(e, nv) => setFieldValue("ItemId", nv.id)}
                  placeholder="Item"
                />
                <TextField
                  name="vendorPartName"
                  label="Vendor Part Name"
                  value={values.vendorPartName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.vendorPartName)}
                />
                <TextField
                  name="leadTime"
                  label="Lead Time"
                  value={values.leadTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.leadTime)}
                />
                <TextField
                  name="vendorSKU"
                  label="Vendor SKU"
                  value={values.vendorSKU}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.vendorSKU)}
                  type="number"
                />
                <FormControlLabel label="Preferred" control={<Checkbox />} {...getFieldProps("preferred")} />
              </Box>
              <Box display="flex" alignItems="center">
                <Button fullWidth type="submit" kind={initialValues?.id ? "edit" : "add"} style={{ margin: "0.5em 0" }}>
                  {initialValues?.id ? "Save" : "submit"}
                </Button>
                {initialValues && initialValues.id && (
                  <Button kind="delete" style={{ margin: "0.5em" }} onClick={handleDelete}>
                    Delete
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
