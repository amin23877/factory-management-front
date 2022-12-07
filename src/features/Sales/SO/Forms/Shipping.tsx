import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Shipping({ getFieldProps, add }: { getFieldProps: any; add?: boolean }) {
  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
      <TextField label="Shipping Company" {...getFieldProps("shippingCompany")} disabled={!add && lock} />
      <TextField label="Shipping Attn" {...getFieldProps("shippingAttn")} disabled={!add && lock} />
      <TextField label="Shipping Address" {...getFieldProps("shippingAddress")} disabled={!add && lock} />
      <TextField label="Shipping City" {...getFieldProps("shippingCity")} disabled={!add && lock} />
      <TextField label="Shipping State" {...getFieldProps("shippingState")} disabled={!add && lock} />
      <TextField label="Shipping Zipcode" {...getFieldProps("shippingZipcode")} disabled={!add && lock} />
      <TextField label="Shipping Country" {...getFieldProps("shippingCountry")} disabled={!add && lock} />
      <TextField label="Shipping Phone" {...getFieldProps("shippingPhone")} disabled={!add && lock} />
      <TextField label="Shipping Fax" {...getFieldProps("shippingFax")} disabled={!add && lock} />
      <TextField label="Shipping Email" {...getFieldProps("shippingEmail")} disabled={!add && lock} />
      <FormControlLabel
        label="Shipping Will Call"
        control={<Checkbox />}
        {...getFieldProps("shippingWillCall")}
        disabled={!add && lock}
      />
    </Box>
  );
}
