import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import useSWR from "swr";

import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";
import { useLock } from "common/Lock";

export default function Client({
  getFieldProps,
  setFieldValue,
  values,
}: {
  getFieldProps: any;
  values: any;
  setFieldValue: any;
}) {
  const clientId = values?.ClientId?.id || values?.ClientId || null;
  const { data: contacts } = useSWR(clientId ? `/contact/client/${clientId}` : null);
  const contact = contacts?.filter((c: any) => c.main).length > 0 ? contacts?.filter((c: any) => c.main)[0] : undefined;
  const email = contact?.emails?.length > 0 ? contact?.emails[0].email : "";
  const phone = contact?.phones?.length > 0 ? contact?.phones[0].phone : "";

  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={8}>
      <AsyncCombo
        label="Client"
        value={values.ClientId}
        filterBy="name"
        getOptionLabel={(c) => c?.name}
        getOptionSelected={(o, v) => o.id === v.id}
        url="/client"
        error={!values.ClientId}
        onChange={(e, nv) => setFieldValue("ClientId", nv?.id)}
        disabled={lock}
      />
      <TextField value={email} name="email" label="Email" disabled error={!email} />
      <TextField value={phone} name="phone" label="Phone" disabled error={!phone} />
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
