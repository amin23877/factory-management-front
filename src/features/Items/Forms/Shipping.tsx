import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { useLock } from "common/Lock";
import React from "react";

interface IForm {
  values: any;
  getFieldProps: any;
  setFieldValue: any;
  add?: any;
}

export default function ShippingTab({ setFieldValue, values, getFieldProps, add }: IForm) {
  const selected = values.result.find(() => true);

  const { lock } = useLock();
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10} mt={1}>
      <LinkField
        label="Preferred Vendor"
        filterLabel="name"
        getOptionLabel={(i) => i?.name || ""}
        getOptionList={(r) => r?.result || []}
        getOptionValue={(i) => i.id}
        path="/vendor"
        choseItem={selected.preferredVendor}
        value={selected.preferredVendor}
        disabled={!add && lock}
        onChange={(e, nv) => setFieldValue("preferredVendor", nv.id)}
      />
      <TextField
        type="number"
        label="Weight"
        value={selected.weight}
        {...getFieldProps("weight")}
        disabled={!add && lock}
      />
      <FormControlLabel
        checked={selected.notShippable}
        label="Not Shippable"
        {...getFieldProps("notShippable")}
        disabled={!add && lock}
        control={<Checkbox size="small" />}
      />
      <FormControlLabel
        checked={selected.shippingChecklistRequired}
        label="Shipping Checklist Required"
        {...getFieldProps("shippingChecklistRequired")}
        disabled={!add && lock}
        control={<Checkbox size="small" />}
      />
      <FormControlLabel
        checked={selected.shippableOnBOM}
        label="Shippable On BOM"
        {...getFieldProps("shippableOnBOM")}
        disabled={!add && lock}
        control={<Checkbox size="small" />}
      />
    </Box>
  );
}
