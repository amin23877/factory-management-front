import React from "react";
import Box from "@material-ui/core/Box";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import TextField from "app/TextField";

export default function Approvals({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={4}>
      <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
        <TextField label="Customer PO#" {...getFieldProps("customerPONumber")} />
        <TextField
          label="PO Received Date"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          {...getFieldProps("poReceivedDate")}
        />
        <TextField label="PO Received By" {...getFieldProps("poReceivedBy")} />
        <TextField label="SO Issued By" {...getFieldProps("soIssuedBy")} />
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
      </Box>
      <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
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
    </Box>
  );
}
