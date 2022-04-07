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
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("poReceivedDate")}
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
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("estimatedShipDate")}
      />
      <TextField
        label="Original Ship Date"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("originalShipDate")}
      />
      <TextField
        label="Actual Ship Date"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("actualShipDate")}
      />
      <TextField
        label="Released To Production Date"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("releasedToProductionDate")}
      />
      <TextField
        label="To Be InvoicedDate"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("toBeInvoicedDate")}
      />
      <FormControlLabel label="Expedite" control={<Checkbox />} {...getFieldProps("expedite")} />
    </Box>
  );
}
