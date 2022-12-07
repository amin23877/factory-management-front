import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";

export default function Status({ getFieldProps, add }: { getFieldProps: any; add?: boolean }) {
  const { lock } = useLock();

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <Box display="grid" gridTemplateColumns="1fr" style={{ gap: 8 }}>
        <TextField label="Department" {...getFieldProps("department")} disabled={!add && lock} />
        <TextField label="Acct Status" {...getFieldProps("accountStatus")} disabled={!add && lock} />
        <TextField label="Quote Status" {...getFieldProps("status")} disabled={!add && lock} />
        <TextField
          type="datetime-local"
          label="Quote Sent Date"
          {...getFieldProps("sentDate")}
          InputLabelProps={{ shrink: true }}
          disabled={!add && lock}
        />
        <TextField label="Freight Terms" {...getFieldProps("freightTerms")} disabled={!add && lock} />
        <TextField label="Payment Terms" {...getFieldProps("paymentTerms")} disabled={!add && lock} />
      </Box>
      <Box display="grid" gridTemplateColumns="1fr" style={{ gap: 8 }}>
        <Typography>Payment:</Typography>
        <FormControlLabel
          label="Deposit Required"
          control={<Checkbox disabled={!add && lock} />}
          {...getFieldProps("depositRequired")}
          disabled={!add && lock}
        />
        <TextField
          type="number"
          label="Deposit Percent %"
          {...getFieldProps("depositPercent")}
          disabled={!add && lock}
        />
        <TextField type="number" label="Deposit Amount %" {...getFieldProps("deposit")} disabled={!add && lock} />
        <TextField
          type="datetime-local"
          label="Estimated Ship Date"
          {...getFieldProps("estimatedShipDate")}
          InputLabelProps={{ shrink: true }}
          disabled={!add && lock}
        />
        <TextField label="Checked By" {...getFieldProps("checkedBy")} disabled={!add && lock} />
      </Box>
    </Box>
  );
}
