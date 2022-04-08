import React from "react";
import Box from "@material-ui/core/Box";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";

export default function Approvals({ getFieldProps, values }: { getFieldProps: any; values?: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridTemplateRows="repeat(4, 1fr)" gridGap={8}>
      <TextField label="Customer PO#" {...getFieldProps("customerPONumber")} />
      <TextField
        label="PO Received Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={new Date(values.poReceivedDate).toISOString().slice(0, 10)}
      />
      <AsyncCombo
        label="PO Received By"
        filterBy="username"
        getOptionLabel={(o) => o?.username}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/employee"
        value={values?.poReceivedBy}
      />
      <AsyncCombo
        label="SO Issued By"
        filterBy="username"
        getOptionLabel={(o) => o?.username}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/employee"
        value={values?.soIssuedBy}
      />
      <TextField label="status" {...getFieldProps("status")} />
      <TextField
        label="Estimated Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={new Date(values?.estimatedShipDate).toISOString().slice(0, 10)}
      />
      <TextField
        label="Original Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={new Date(values?.originalShipDate).toISOString().slice(0, 10)}
      />
      <TextField
        label="Actual Ship Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={new Date(values?.actualShipDate).toISOString().slice(0, 10)}
      />
      <TextField
        label="Released To Production Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={new Date(values?.releasedToProductionDate).toISOString().slice(0, 10)}
      />
      <TextField
        label="To Be InvoicedDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={new Date(values?.toBeInvoicedDate).toISOString().slice(0, 10)}
      />
      <FormControlLabel label="Expedite" control={<Checkbox />} {...getFieldProps("expedite")} />
    </Box>
  );
}
