import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Metrics({ values, getFieldProps }: { values: any; getFieldProps: any }) {
  const { lock } = useLock();

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <TextField label="Commission Label" value={values?.RepId?.commissionLabel} disabled={lock} />
      <TextField
        type="number"
        label="Regular Commission %"
        value={values?.RepId?.regularCommissionPercentage}
        disabled={lock}
      />
      <TextField type="number" label="Regular Commission" value={values?.RepId?.regularCommission} disabled={lock} />
      <TextField type="number" label="Overage Commission" value={values?.RepId?.overageCommission} disabled={lock} />
    </Box>
  );
}
