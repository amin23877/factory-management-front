import { Box, Typography } from "@material-ui/core";
import TextField from "app/TextField";
import React from "react";

export default function Addresses({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
        <Typography style={{ gridColumn: "span 2" }}>Billing:</Typography>
        <TextField label="Billing Company" {...getFieldProps("billingCompany")} />
        <TextField label="Billing Attn" {...getFieldProps("billingAttn")} />
        <TextField label="Billing City" {...getFieldProps("billingCity")} />
        <TextField label="Billing State" {...getFieldProps("billingState")} />
        <TextField label="Billing Zip" {...getFieldProps("billingZip")} />
        <TextField label="Billing Country" {...getFieldProps("billingCountry")} />
        <TextField label="Billing Account" {...getFieldProps("billingAccount")} />
        <TextField label="Billing Phone" {...getFieldProps("billingPhone")} />
        <TextField label="Billing Email" {...getFieldProps("billingEmail")} style={{ gridColumn: "span 2" }} />
        <TextField
          label="Billing Address"
          {...getFieldProps("billingAddress")}
          multiline
          rows={2}
          style={{ gridColumn: "span 2" }}
        />
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
        <Typography style={{ gridColumn: "span 2" }}>Shipping:</Typography>
        <TextField label="Shipping Company" {...getFieldProps("shippingCompany")} />
        <TextField label="Shipping Attn" {...getFieldProps("shippingAttn")} />
        <TextField label="Shipping City" {...getFieldProps("shippingCity")} />
        <TextField label="Shipping State" {...getFieldProps("shippingState")} />
        <TextField label="Shipping Zip" {...getFieldProps("shippingZip")} />
        <TextField label="Shipping Country" {...getFieldProps("shippingCountry")} />
        <TextField label="Shipping Account" {...getFieldProps("shippingAccount")} />
        <TextField label="Shipping Phone" {...getFieldProps("shippingPhone")} />
        <TextField label="Shipping Email" {...getFieldProps("shippingEmail")} style={{ gridColumn: "span 2" }} />
        <TextField
          label="Shipping Address"
          {...getFieldProps("shippingAddress")}
          multiline
          rows={2}
          style={{ gridColumn: "span 2" }}
        />
      </Box>
    </Box>
  );
}
