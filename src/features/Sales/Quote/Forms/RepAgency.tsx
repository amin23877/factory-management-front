import React, { useState } from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";
import { useLock } from "common/Lock";

export default function RepAgency({ values, setFieldValue }: { getFieldProps: any; values: any; setFieldValue: any }) {
  const [selectedRep, setSelectedRep] = useState<any>(values?.RepId);
  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <AsyncCombo
        label="Rep"
        filterBy="name"
        getOptionLabel={(o) => o?.name}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/rep"
        value={values.RepId}
        error={!(values.RepId || selectedRep)}
        onChange={(e, nv) => {
          setFieldValue("RepId", nv);
          setSelectedRep(nv);
        }}
        disabled={lock}
      />
      <TextField
        disabled
        label="Address"
        value={selectedRep?.address}
        InputLabelProps={{ shrink: true }}
        error={!selectedRep?.address}
      />
      <TextField
        disabled
        label="City"
        value={selectedRep?.city}
        InputLabelProps={{ shrink: true }}
        error={!selectedRep?.city}
      />
      <TextField
        disabled
        label="Country"
        value={selectedRep?.country}
        InputLabelProps={{ shrink: true }}
        error={!selectedRep?.country}
      />
      <TextField
        disabled
        label="State"
        value={selectedRep?.state}
        InputLabelProps={{ shrink: true }}
        error={!selectedRep?.state}
      />
      <TextField
        disabled
        label="ZIP"
        value={selectedRep?.zip}
        InputLabelProps={{ shrink: true }}
        error={!selectedRep?.zip}
      />
    </Box>
  );
}
