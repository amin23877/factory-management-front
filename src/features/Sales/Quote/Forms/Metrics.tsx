import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Metrics({ values, getFieldProps, add }: { values: any; getFieldProps: any; add?: boolean }) {
  const { lock } = useLock();

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <TextField label="Commission Label" value={values?.RepId?.commissionLabel} disabled={!add && lock} />
      <TextField
        type="number"
        label="Regular Commission %"
        value={values?.RepId?.regularCommissionPercentage}
        disabled={!add && lock}
      />
      <TextField
        type="number"
        label="Regular Commission"
        value={values?.RepId?.regularCommission}
        disabled={!add && lock}
      />
      <TextField
        type="number"
        label="Overage Commission"
        value={values?.RepId?.overageCommission}
        disabled={!add && lock}
      />
    </Box>
  );
}
