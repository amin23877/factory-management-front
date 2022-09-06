import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Shipping({ getFieldProps }: { getFieldProps: any }) {
  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
      <TextField label="Shipping Company" {...getFieldProps("shippingCompany")} disabled={lock} />
      <TextField label="Shipping Attn" {...getFieldProps("shippingAttn")} disabled={lock} />
      <TextField label="Shipping Address" {...getFieldProps("shippingAddress")} disabled={lock} />
      <TextField label="Shipping City" {...getFieldProps("shippingCity")} disabled={lock} />
      <TextField label="Shipping State" {...getFieldProps("shippingState")} disabled={lock} />
      <TextField label="Shipping Zipcode" {...getFieldProps("shippingZipcode")} disabled={lock} />
      <TextField label="Shipping Country" {...getFieldProps("shippingCountry")} disabled={lock} />
      <TextField label="Shipping Phone" {...getFieldProps("shippingPhone")} disabled={lock} />
      <TextField label="Shipping Fax" {...getFieldProps("shippingFax")} disabled={lock} />
      <TextField label="Shipping Email" {...getFieldProps("shippingEmail")} disabled={lock} />
      <FormControlLabel
        label="Shipping Will Call"
        control={<Checkbox />}
        {...getFieldProps("shippingWillCall")}
        disabled={lock}
      />
    </Box>
  );
}
