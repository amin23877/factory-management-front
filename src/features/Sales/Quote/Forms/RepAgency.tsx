import React, { useState } from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";

export default function RepAgency({ values, setFieldValue }: { getFieldProps: any; values: any; setFieldValue: any }) {
  const [selectedRep, setSelectedRep] = useState<any>();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <LinkField
        value={values.RepId}
        choseItem={values.RepId}
        label="Rep"
        path="/rep"
        filterLabel="name"
        getOptionList={(resp) => resp?.result}
        getOptionLabel={(item) => item?.no || item?.name || "No-Name"}
        getOptionValue={(item) => item?.id}
        onChange={(e, nv) => {
          setSelectedRep(nv);
          setFieldValue("RepId", nv.id);
        }}
      />
      <TextField disabled label="Address" value={selectedRep?.address} InputLabelProps={{ shrink: true }} />
      <TextField disabled label="City" value={selectedRep?.city} InputLabelProps={{ shrink: true }} />
      <TextField disabled label="Country" value={selectedRep?.country} InputLabelProps={{ shrink: true }} />
      <TextField disabled label="State" value={selectedRep?.state} InputLabelProps={{ shrink: true }} />
      <TextField disabled label="ZIP" value={selectedRep?.zip} InputLabelProps={{ shrink: true }} />
    </Box>
  );
}
