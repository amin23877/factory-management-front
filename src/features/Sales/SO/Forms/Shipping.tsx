import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";

import TextField from "app/TextField";
import { LockButton, LockProvider, useLock } from "common/Lock";

function ShippingContent({ getFieldProps }: { getFieldProps: any }) {
  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
      <Box display="flex" alignItems="center">
        <TextField
          label="Shipping Company"
          {...getFieldProps("shippingCompany")}
          fullWidth
          style={{ marginRight: 8 }}
          disabled={lock}
        />
        <LockButton />
      </Box>
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

export default function Shipping({ getFieldProps }: { getFieldProps: any }) {
  return (
    <LockProvider>
      <ShippingContent getFieldProps={getFieldProps} />
    </LockProvider>
  );
}
