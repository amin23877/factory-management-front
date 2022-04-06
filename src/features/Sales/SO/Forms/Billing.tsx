import React from "react";
import { Box } from "@material-ui/core";
import TextField from "app/TextField";

export default function Billing({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" style={{ gap: 8 }}>
      <TextField label="Billing Company" {...getFieldProps("billingCompany")} />
      <TextField label="Billing Attn" {...getFieldProps("billingAttn")} />
      <TextField label="Billing Address" {...getFieldProps("billingAddress")} />
      <TextField label="Billing City" {...getFieldProps("billingCity")} />
      <TextField label="Billing State" {...getFieldProps("billingState")} />
      <TextField label="Billing Zipcode" {...getFieldProps("billingZipcode")} />
      <TextField label="Billing Country" {...getFieldProps("billingCountry")} />
      <TextField label="Billing Phone" {...getFieldProps("billingPhone")} />
      <TextField label="Billing Fax" {...getFieldProps("billingFax")} />
      <TextField label="Billing Email" {...getFieldProps("billingEmail")} />
    </Box>
  );
}
