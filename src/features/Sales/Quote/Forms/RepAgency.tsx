import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";

export default function RepAgency({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={5}>
      <TextField label="Rep/Agency" {...getFieldProps("rep")} />
      <TextField label="Address" />
      <TextField label="City" />
      <TextField label="Street" />
      <TextField label="ZIP" />
    </Box>
  );
}
