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
  const selected = values?.result?.find(() => true);

  return (
    <Box
      mt={1}
      display="grid"
      gridTemplateColumns={phone ? "auto auto" : "auto auto auto"}
      gridColumnGap={10}
      gridRowGap={10}
    >
      <TextField
        name="manufacturingTime"
        label="Manufacturer"
        value={selected.manufacturingTime}
        placeholder="Manufacturer"
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="manufacturerProductNumber"
        label="Man. No."
        value={selected.manufacturerProductNumber}
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="leadTime"
        label="Lead Time"
        value={selected.leadTime}
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="qbId"
        label="Quickbook ID"
        value={selected.qbId}
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="qbType"
        label="QB Type"
        value={selected.qbType}
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="type"
        label="Type"
        value={selected.type}
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
      <TextField
        name="category"
        label="Category"
        value={selected.category}
        disabled={!add && lock}
        // onChange={handleChange}
        // onBlur={handleBlur}
      />
    </Box>
  );
}
