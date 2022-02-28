import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";

export default function Requester({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={5}>
      <TextField label="Requester" />
      <TextField label="Email" />
      <TextField label="Phone" />
      <TextField label="Fax" />
    </Box>
  );
}
