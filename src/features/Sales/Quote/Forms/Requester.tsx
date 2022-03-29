import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";

export default function Requester({ getFieldProps }: { getFieldProps: any }) {
  // TODO: Requester is Rep's Contact

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <TextField disabled label="Requester" />
      <TextField disabled label="Email" />
      <TextField disabled label="Phone" />
      <TextField disabled label="Fax" />
    </Box>
  );
}
