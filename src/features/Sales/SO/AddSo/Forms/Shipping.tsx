import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";

export default function ShippingForm({
  handleChange,
  handleBlur,
  values,
  setFieldValue,
  getFieldProps,
}: {
  values: any;
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
  setFieldValue: any;
  getFieldProps: any;
}) {
  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
      <TextField
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        label="Estimated Ship Date"
        {...getFieldProps("estimatedShipDate")}
      />
      <TextField
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        label="Original Ship Date"
        {...getFieldProps("orgShipDate")}
      />
      <TextField
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        label="Actual Ship Date"
        {...getFieldProps("actualShipDate")}
      />
      <TextField value={values.carrier} name="carrier" label="Carrier" onChange={handleChange} onBlur={handleBlur} />
      <TextField
        value={values.freightTerm}
        name="freightTerm"
        label="Freight Terms"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Box>
  );
}
