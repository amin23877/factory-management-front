import React from "react";
import Box from "@material-ui/core/Box";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";
import { useLock } from "common/Lock";

function formatDateValue(v: any) {
  if (v) {
    return new Date(v).toISOString().slice(0, 10);
  }
  return null;
}

export default function Approvals({ getFieldProps, values }: { getFieldProps: any; values?: any }) {
  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridTemplateRows="repeat(4, 1fr)" gridGap={8}>
      <TextField label="Customer PO#" {...getFieldProps("customerPONumber")} disabled={lock} />
      <TextField
        label="PO Received Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.poReceivedDate)}
        disabled={lock}
      />
      <AsyncCombo
        label="PO Received By"
        filterBy="username"
        getOptionLabel={(o) => o?.username}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/employee"
        value={values?.poReceivedBy}
        disabled={lock}
      />
      <AsyncCombo
        label="SO Issued By"
        filterBy="username"
        getOptionLabel={(o) => o?.username}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/employee"
        value={values?.soIssuedBy}
        disabled={lock}
      />
      <TextField label="status" {...getFieldProps("status")} disabled={lock} />
      <TextField
        label="Estimated Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.estimatedShipDate)}
        disabled={lock}
      />
      <TextField
        label="Original Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.originalShipDate)}
        disabled={lock}
      />
      <TextField
        label="Actual Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.actualShipDate)}
        disabled={lock}
      />
      <TextField
        label="Released Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.releasedToProductionDate)}
        disabled={lock}
      />
      <TextField
        label="To Be InvoicedDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formatDateValue(values?.toBeInvoicedDate)}
        disabled={lock}
      />
      <FormControlLabel label="Expedite" control={<Checkbox />} {...getFieldProps("expedite")} disabled={lock} />
    </Box>
  );
}
