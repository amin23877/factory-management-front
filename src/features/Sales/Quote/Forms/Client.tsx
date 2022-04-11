import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";

import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";
import useSWR from "swr";

export default function Client({
  getFieldProps,
  setFieldValue,
  values,
}: {
  getFieldProps: any;
  values: any;
  setFieldValue: any;
}) {
  const { data: contacts } = useSWR(values?.ClientId?.id ? `/contact/client/${values?.ClientId?.id}` : null);
  const contact = contacts?.filter((c: any) => c.main).length > 0 ? contacts?.filter((c: any) => c.main)[0] : undefined;
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
      <TextField
        value={contact?.emails?.length > 0 ? contact?.emails[0].email : ""}
        name="email"
        label="Email"
        disabled
      />
      <TextField
        value={contact?.phones?.length > 0 ? contact?.phones[0].phone : ""}
        name="phone"
        label="Phone"
        disabled
      />
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
