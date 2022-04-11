import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";

export default function Requester({
  values,
  setFieldValue,
  getFieldProps,
}: {
  values: any;
  setFieldValue: any;
  getFieldProps: any;
}) {
  // TODO: Requester is Rep's Contact

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <AsyncCombo
        label="Rep / Agency"
        filterBy="name"
        getOptionLabel={(o) => o?.name || "No Name"}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/rep"
        value={values?.RepId}
        onChange={(e, nv) => {
          setFieldValue("RepId", nv?.id);
        }}
      />
      {/* <TextField disabled label="Requester" /> */}
      <TextField disabled label="Email" />
      <TextField disabled label="Phone" />
      <TextField disabled label="Fax" />
    </Box>
  );
}
