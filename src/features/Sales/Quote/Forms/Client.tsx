import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";

import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";

export default function Client({
  getFieldProps,
  setFieldValue,
  values,
}: {
  getFieldProps: any;
  values: any;
  setFieldValue: any;
}) {
  const [selectedClient, setSelectedClient] = useState<any>(values?.ClientId);

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <LinkField
        value={values.ClientId}
        choseItem={values.ClientId}
        label="Client"
        path="/client"
        filterLabel="name"
        getOptionList={(resp) => resp?.result}
        getOptionLabel={(item) => item?.no || item?.name || "No-Name"}
        getOptionValue={(item) => item?.id}
        onChange={(e, nv) => {
          setSelectedClient(nv);
          setFieldValue("ClientId", nv.id);
        }}
      />
      <TextField disabled label="Phone" value={selectedClient?.phone} InputLabelProps={{ shrink: true }} />
      <TextField disabled label="Ext" value={selectedClient?.ext} InputLabelProps={{ shrink: true }} />
      <TextField disabled label="Email" value={selectedClient?.email} InputLabelProps={{ shrink: true }} />
      {/* <TextField disabled label="Unit Pricing Level" value={selectedClient?.phone} /> */}
      <TextField
        disabled
        label="24 Hr Cont."
        style={{ gridColumnStart: "span 2" }}
        InputLabelProps={{ shrink: true }}
      />
      <FormControlLabel label="No Tax Client" control={<Checkbox />} style={{ gridColumnStart: "span 2" }} />
      <FormControlLabel
        label="Call 24 hours before delivery"
        control={<Checkbox />}
        style={{ gridColumnStart: "span 2" }}
      />
    </Box>
  );
}
