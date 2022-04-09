import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";

export default function Metrics({ values, getFieldProps }: { values: any; getFieldProps: any }) {
  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <TextField label="Commission Label" value={values?.RepId?.commissionLabel} />
      <TextField type="number" label="Regular Commission %" value={values?.RepId?.regularCommissionPercentage} />
      <TextField type="number" label="Regular Commission" value={values?.RepId?.regularCommission} />
      <TextField type="number" label="Overage Commission" value={values?.RepId?.overageCommission} />
    </Box>
  );
}
