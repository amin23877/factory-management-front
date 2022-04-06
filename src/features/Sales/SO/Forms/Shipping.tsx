import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import TextField from "app/TextField";

export default function Shipping({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
      <TextField label="Shipping Company" {...getFieldProps("shippingCompany")} />
      <TextField label="Shipping Attn" {...getFieldProps("shippingAttn")} />
      <TextField label="Shipping Address" {...getFieldProps("shippingAddress")} />
      <TextField label="Shipping City" {...getFieldProps("shippingCity")} />
      <TextField label="Shipping State" {...getFieldProps("shippingState")} />
      <TextField label="Shipping Zipcode" {...getFieldProps("shippingZipcode")} />
      <TextField label="Shipping Country" {...getFieldProps("shippingCountry")} />
      <TextField label="Shipping Phone" {...getFieldProps("shippingPhone")} />
      <TextField label="Shipping Fax" {...getFieldProps("shippingFax")} />
      <TextField label="Shipping Email" {...getFieldProps("shippingEmail")} />
      <FormControlLabel label="Shipping Will Call" control={<Checkbox />} {...getFieldProps("shippingWillCall")} />
    </Box>
  );
}
