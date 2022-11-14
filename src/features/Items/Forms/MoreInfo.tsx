import { Box, useMediaQuery } from "@material-ui/core";
import { useLock } from "common/Lock";
import React from "react";
import TextField from "app/TextField";

export default function MoreInfoTab({
  getFieldProps,
  values,
  add,
}: {
  getFieldProps: any;
  values?: any;
  add?: boolean;
}) {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();
  return (
    <Box
      mt={1}
      display="grid"
      gridTemplateColumns={phone ? "auto auto" : "auto auto auto"}
      gridColumnGap={10}
      gridRowGap={10}
    >
      <TextField label="Manufacturer" {...getFieldProps("manufacturer")} disabled={!add && lock} />
      <TextField label="Man. No." {...getFieldProps("manufacturerProductNumber")} disabled={!add && lock} />
      <TextField label="Lead Time" {...getFieldProps("leadTime")} disabled={!add && lock} />
      <TextField label="Quickbook ID" {...getFieldProps("qbId")} disabled={!add && lock} />
      <TextField label="QB Type" {...getFieldProps("qbType")} disabled={!add && lock} />
      <TextField label="Type" {...getFieldProps("type")} disabled={!add && lock} />
      <TextField label="Category" {...getFieldProps("category")} disabled={!add && lock} />
    </Box>
  );
}
