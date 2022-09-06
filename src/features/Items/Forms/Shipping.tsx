import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { useLock } from "common/Lock";
import React from "react";

interface IForm {
  values: any;
  getFieldProps: any;
  setFieldValue: any;
}

export default function ShippingTab({ setFieldValue, values, getFieldProps }: IForm) {
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
        choseItem={values.preferredVendor}
        value={values.preferredVendor}
        disabled={lock}
        onChange={(e, nv) => setFieldValue("preferredVendor", nv.id)}
      />
      <TextField type="number" label="Weight" value={values.weight} {...getFieldProps("weight")} disabled={lock} />
      <FormControlLabel
        checked={values.notShippable}
        label="Not Shippable"
        {...getFieldProps("notShippable")}
        disabled={lock}
        control={<Checkbox size="small" />}
      />
      <FormControlLabel
        checked={values.shippingChecklistRequired}
        label="Shipping Checklist Required"
        {...getFieldProps("shippingChecklistRequired")}
        disabled={lock}
        control={<Checkbox size="small" />}
      />
      <FormControlLabel
        checked={values.shippableOnBOM}
        label="Shippable On BOM"
        {...getFieldProps("shippableOnBOM")}
        disabled={lock}
        control={<Checkbox size="small" />}
      />
    </Box>
  );
}
