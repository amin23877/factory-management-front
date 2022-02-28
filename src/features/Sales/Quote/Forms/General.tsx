import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";

export default function General({ getFieldProps }: { getFieldProps: any }) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={10}>
      <TextField
        type="datetime-local"
        label="Entry Date"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("entryDate")}
      />
      <TextField
        type="datetime-local"
        label="Entry Date"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("expireDate")}
      />
      <TextField label="Quote Number" {...getFieldProps("no")} />
      <TextField label="SO Number" {...getFieldProps("SOId")} />
      <TextField label="Project Name" {...getFieldProps("ProjectId")} />
      <TextField label="Location" {...getFieldProps("location")} />
      <TextField label="Lead Time" {...getFieldProps("leadTime")} />
      <TextField label="Sales Person" {...getFieldProps("salesperson")} />
      <TextField label="Notes" {...getFieldProps("notes")} />
    </Box>
  );
}
