import React from "react";
import Box from "@material-ui/core/Box";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";
import { useLock } from "common/Lock";
import { formatDateValue } from "logic/date";

export default function Approvals({ getFieldProps, values, add }: { getFieldProps: any; values?: any; add?: boolean }) {
  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridTemplateRows="repeat(4, 1fr)" gridGap={8}>
      <TextField label="Customer PO#" {...getFieldProps("customerPONumber")} disabled={!add && lock} />
      <TextField
        label="PO Received Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.poReceivedDate)}
        disabled={!add && lock}
      />
      <AsyncCombo
        label="PO Received By"
        filterBy="username"
        getOptionLabel={(o) => o?.username}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/employee"
        value={values?.poReceivedBy}
        disabled={!add && lock}
      />
      <AsyncCombo
        label="SO Issued By"
        filterBy="username"
        getOptionLabel={(o) => o?.username}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/employee"
        value={values?.soIssuedBy}
        disabled={!add && lock}
      />
      <TextField label="status" {...getFieldProps("status")} disabled={!add && lock} />
      <TextField
        label="Estimated Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.estimatedShipDate)}
        disabled={!add && lock}
      />
      <TextField
        label="Original Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.originalShipDate)}
        disabled={!add && lock}
      />
      <TextField
        label="Actual Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.actualShipDate)}
        disabled={!add && lock}
      />
      <TextField
        label="Released Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.releasedToProductionDate)}
        disabled={!add && lock}
      />
      <TextField
        label="To Be InvoicedDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.toBeInvoicedDate)}
        disabled={!add && lock}
      />
      <FormControlLabel
        label="Expedite"
        control={<Checkbox />}
        {...getFieldProps("expedite")}
        disabled={!add && lock}
      />
    </Box>
  );
}
