import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";

export default function Metrics({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <TextField label="Commission Label" {...getFieldProps("commissionLabel")} />
      <TextField type="number" label="Regular Commission %" {...getFieldProps("regularCommissionPercentage")} />
      <TextField type="number" label="Regular Commission" {...getFieldProps("regularCommission")} />
      <TextField type="number" label="Overage Commission" {...getFieldProps("overageCommission")} />
    </Box>
  );
}
