import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
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
      <Formik
        initialValues={{} as any}
        onSubmit={(data) => {
          console.log({ ...data, type: "device" });

          // onSubmit({ ...data, type: "device" })
        }}
      >
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
                  setFieldValue("ItemId", nv.id);
                  setFieldValue("ItemObject", nv);
                  setFieldValue("price", nv.retailPrice);
                  setFieldValue("unit", nv.isUnit);
                  setFieldValue("standardWarranty", nv.isUnit);
                }}
                url="/panel/engineering"
              />
              <TextField type="number" label="Quantity" {...getFieldProps("qty")} required />
              <Autocomplete
                freeSolo
                options={values?.ItemObject?.pricing || []}
                getOptionLabel={(r: any) => `${r?.price}`}
                inputValue={`${values?.price}`}
                onInputChange={(e, nv) => {
                  setFieldValue("price", nv);
                }}
                // value={values?.priceObject}
                // onChange={(e, nv: any) => {
                //   setFieldValue("priceObject", nv);
                // }}
                renderInput={(p) => <TextField {...p} label="Price" />}
              />
              {/* <TextField
                type="number"
                label="Price"
                {...getFieldProps("price")}
                required
                InputLabelProps={{ shrink: true }}
              /> */}
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
