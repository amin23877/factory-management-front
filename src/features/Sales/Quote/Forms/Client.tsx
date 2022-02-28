import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";

import TextField from "app/TextField";

export default function Client({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={5}>
      <TextField label="Client" {...getFieldProps("ClientId")} />
      <TextField label="Phone" />
      <TextField label="Ext" />
      <TextField label="Email" />
      <TextField label="Unit Pricing Level" />
      <FormControlLabel label="No Tax Client" control={<Checkbox />} />
      <TextField label="24 Hr Cont." />
      <TextField label="Email" />
      <FormControlLabel label="Call 24 hours before delivery" control={<Checkbox />} />
    </Box>
  );
}
