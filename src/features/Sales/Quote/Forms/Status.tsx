import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@material-ui/core";

import TextField from "app/TextField";

export default function Status({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <Box display="grid" gridTemplateColumns="1fr" style={{ gap: 8 }}>
        <TextField label="Department" {...getFieldProps("department")} />
        <TextField label="Acct Status" {...getFieldProps("accountStatus")} />
        <TextField label="Quote Status" {...getFieldProps("status")} />
        <TextField
          type="datetime-local"
          label="Quote Sent Date"
          {...getFieldProps("sentDate")}
          InputLabelProps={{ shrink: true }}
        />
        <TextField label="Freight Terms" {...getFieldProps("freightTerms")} />
        <TextField label="Payment Terms" {...getFieldProps("paymentTerms")} />
      </Box>
      <Box display="grid" gridTemplateColumns="1fr" style={{ gap: 8 }}>
        <Typography>Payment:</Typography>
        <FormControlLabel label="Deposit Required" control={<Checkbox />} {...getFieldProps("depositRequired")} />
        <TextField type="number" label="Deposit Percent %" {...getFieldProps("depositPercent")} />
        <TextField type="number" label="Deposit Amount %" {...getFieldProps("deposit")} />
        <TextField
          type="datetime-local"
          label="Estimated Ship Date"
          {...getFieldProps("estimatedShipDate")}
          InputLabelProps={{ shrink: true }}
        />
        <TextField label="Checked By" {...getFieldProps("checkedBy")} />
      </Box>
    </Box>
  );
}
