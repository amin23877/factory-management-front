import React from "react";
import { Box, Typography } from "@material-ui/core";

import RepAgency from "./RepAgency";
import Requester from "./Requester";
import Client from "./Client";

export default function Entities({
  values,
  setFieldValue,
  getFieldProps,
}: {
  getFieldProps: any;
  values: any;
  setFieldValue: any;
}) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
      <Box py={1}>
        <Typography style={{ marginBottom: 5 }}>Rep/Agency</Typography>
        <RepAgency values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} />
        <Typography style={{ marginTop: 10, marginBottom: 5 }}>Requester</Typography>
        <Requester values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} />
      </Box>
      <Box py={1}>
        <Typography style={{ marginBottom: 5 }}>Client</Typography>
        <Client getFieldProps={getFieldProps} values={values} setFieldValue={setFieldValue} />
      </Box>
    </Box>
  );
}
