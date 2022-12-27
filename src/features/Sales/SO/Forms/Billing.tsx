import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Billing({ getFieldProps, add }: { getFieldProps: any; add?: boolean }) {
  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
      <TextField label="Billing Company" {...getFieldProps("billingCompany")} disabled={!add && lock} />
      <TextField label="Billing Attn" {...getFieldProps("billingAttn")} disabled={!add && lock} />
      <TextField label="Billing Address" {...getFieldProps("billingAddress")} disabled={!add && lock} />
      <TextField label="Billing City" {...getFieldProps("billingCity")} disabled={!add && lock} />
      <TextField label="Billing State" {...getFieldProps("billingState")} disabled={!add && lock} />
      <TextField label="Billing Zipcode" {...getFieldProps("billingZipcode")} disabled={!add && lock} />
      <TextField label="Billing Country" {...getFieldProps("billingCountry")} disabled={!add && lock} />
      <TextField label="Billing Phone" {...getFieldProps("billingPhone")} disabled={!add && lock} />
      <TextField label="Billing Fax" {...getFieldProps("billingFax")} disabled={!add && lock} />
      <TextField label="Billing Email" {...getFieldProps("billingEmail")} disabled={!add && lock} />
    </Box>
  );
}
