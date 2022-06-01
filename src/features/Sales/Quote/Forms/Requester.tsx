import React, { useState } from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";
import { useLock } from "common/Lock";

function getField(field: string, requester?: any) {
  if (!requester) {
    return "";
  }
  console.log(requester);

  if (requester[field + "s"]?.length > 0) {
    return requester[field + "s"][0][field];
  }
  return "";
}

export default function Requester({
  values,
  setFieldValue,
  getFieldProps,
}: {
  values: any;
  setFieldValue: any;
  getFieldProps: any;
}) {
  const [selectedRequester, setSelectedRequester] = useState();
  const { lock } = useLock();
  const email =
    values.requester && values.requester?.id
      ? getField("email", values.requester)
      : getField("email", selectedRequester);
  const phone =
    values.requester && values.requester?.id
      ? getField("phone", values.requester)
      : getField("phone", selectedRequester);

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <AsyncCombo
        label="Requester"
        filterBy="name"
        getOptionLabel={(o) => `${o?.firstName} ${o?.lastName}` || "No Name"}
        getOptionSelected={(o, v) => o.id === v.id}
        url={values?.RepId ? `/contact/rep/${values?.RepId?.id}` : ""}
        value={values?.requester}
        onChange={(e, nv) => {
          setSelectedRequester(nv);
          setFieldValue("requester", nv?.id);
        }}
        error={!values.requester}
        disabled={lock}
      />
      <TextField disabled label="Email" value={email} error={!email} />
      <TextField disabled label="Phone" value={phone} error={!phone} />
    </Box>
  );
}
