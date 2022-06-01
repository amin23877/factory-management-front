import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Status({ getFieldProps }: { getFieldProps: any }) {
  const { lock } = useLock();

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <Box display="grid" gridTemplateColumns="1fr" style={{ gap: 8 }}>
        <TextField label="Department" {...getFieldProps("department")} disabled={lock} />
        <TextField label="Acct Status" {...getFieldProps("accountStatus")} disabled={lock} />
        <TextField label="Quote Status" {...getFieldProps("status")} disabled={lock} />
        <TextField
          type="datetime-local"
          label="Quote Sent Date"
          {...getFieldProps("sentDate")}
          InputLabelProps={{ shrink: true }}
          disabled={lock}
        />
        <TextField label="Freight Terms" {...getFieldProps("freightTerms")} disabled={lock} />
        <TextField label="Payment Terms" {...getFieldProps("paymentTerms")} disabled={lock} />
      </Box>
      <Box display="grid" gridTemplateColumns="1fr" style={{ gap: 8 }}>
        <Typography>Payment:</Typography>
        <FormControlLabel
          label="Deposit Required"
          control={<Checkbox disabled={lock} />}
          {...getFieldProps("depositRequired")}
          disabled={lock}
        />
        <TextField type="number" label="Deposit Percent %" {...getFieldProps("depositPercent")} disabled={lock} />
        <TextField type="number" label="Deposit Amount %" {...getFieldProps("deposit")} disabled={lock} />
        <TextField
          type="datetime-local"
          label="Estimated Ship Date"
          {...getFieldProps("estimatedShipDate")}
          InputLabelProps={{ shrink: true }}
          disabled={lock}
        />
        <TextField label="Checked By" {...getFieldProps("checkedBy")} disabled={lock} />
      </Box>
    </Box>
  );
}
