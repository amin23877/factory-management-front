import React from "react";
import { Box, Typography } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Addresses({ getFieldProps, add }: { getFieldProps: any; add?: boolean }) {
  const { lock } = useLock();

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
        <Typography style={{ gridColumn: "span 2" }}>Billing:</Typography>
        <TextField label="Billing Company" {...getFieldProps("billingCompany")} disabled={!add && lock} />
        <TextField label="Billing Attn" {...getFieldProps("billingAttn")} disabled={!add && lock} />
        <TextField label="Billing City" {...getFieldProps("billingCity")} disabled={!add && lock} />
        <TextField label="Billing State" {...getFieldProps("billingState")} disabled={!add && lock} />
        <TextField label="Billing Zip" {...getFieldProps("billingZip")} disabled={!add && lock} />
        <TextField label="Billing Country" {...getFieldProps("billingCountry")} disabled={!add && lock} />
        <TextField label="Billing Account" {...getFieldProps("billingAccount")} disabled={!add && lock} />
        <TextField label="Billing Phone" {...getFieldProps("billingPhone")} disabled={!add && lock} />
        <TextField
          label="Billing Email"
          {...getFieldProps("billingEmail")}
          style={{ gridColumn: "span 2" }}
          disabled={!add && lock}
        />
        <TextField
          label="Billing Address"
          {...getFieldProps("billingAddress")}
          multiline
          rows={2}
          style={{ gridColumn: "span 2" }}
          disabled={!add && lock}
        />
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
        <Typography style={{ gridColumn: "span 2" }}>Shipping:</Typography>
        <TextField label="Shipping Company" {...getFieldProps("shippingCompany")} disabled={!add && lock} />
        <TextField label="Shipping Attn" {...getFieldProps("shippingAttn")} disabled={!add && lock} />
        <TextField label="Shipping City" {...getFieldProps("shippingCity")} disabled={!add && lock} />
        <TextField label="Shipping State" {...getFieldProps("shippingState")} disabled={!add && lock} />
        <TextField label="Shipping Zip" {...getFieldProps("shippingZip")} disabled={!add && lock} />
        <TextField label="Shipping Country" {...getFieldProps("shippingCountry")} disabled={!add && lock} />
        <TextField label="Shipping Account" {...getFieldProps("shippingAccount")} disabled={!add && lock} />
        <TextField label="Shipping Phone" {...getFieldProps("shippingPhone")} disabled={!add && lock} />
        <TextField
          label="Shipping Email"
          {...getFieldProps("shippingEmail")}
          style={{ gridColumn: "span 2" }}
          disabled={!add && lock}
        />
        <TextField
          label="Shipping Address"
          {...getFieldProps("shippingAddress")}
          multiline
          rows={2}
          style={{ gridColumn: "span 2" }}
          disabled={!add && lock}
        />
      </Box>
    </Box>
  );
}
