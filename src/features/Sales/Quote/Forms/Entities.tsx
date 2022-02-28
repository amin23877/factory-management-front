import React from "react";
import { Box, Typography } from "@material-ui/core";

import RepAgency from "./RepAgency";
import Requester from "./Requester";
import Client from "./Client";

export default function Entities({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
      <Box py={1}>
        <Typography style={{ marginBottom: 5 }}>Rep/Agency</Typography>
        <RepAgency getFieldProps={getFieldProps} />
        <Typography style={{ marginTop: 10, marginBottom: 5 }}>Requester</Typography>
        <Requester getFieldProps={getFieldProps} />
      </Box>
      <Box py={1}>
        <Typography style={{ marginBottom: 5 }}>Client</Typography>
        <Client getFieldProps={getFieldProps} />
      </Box>
    </Box>
  );
}
