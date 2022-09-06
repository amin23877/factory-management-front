import { Box, useMediaQuery } from "@material-ui/core";
import { useLock } from "common/Lock";
import React from "react";
import TextField from "app/TextField";

export default function MoreInfoTab({ getFieldProps, values }: { getFieldProps: any; values?: any }) {
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
      <TextField label="Manufacturer" {...getFieldProps("manufacturer")} disabled={lock} />
      <TextField label="Man. No." {...getFieldProps("manufacturerProductNumber")} disabled={lock} />
      <TextField label="Lead Time" {...getFieldProps("leadTime")} disabled={lock} />
      <TextField label="Quickbook ID" {...getFieldProps("qbId")} disabled={lock} />
      <TextField label="QB Type" {...getFieldProps("qbType")} disabled={lock} />
      <TextField label="Type" {...getFieldProps("type")} disabled={lock} />
      <TextField label="Category" {...getFieldProps("category")} disabled={lock} />
    </Box>
  );
}
