import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";

export default function General({
  values,
  setFieldValue,
  getFieldProps,
}: {
  getFieldProps: any;
  values: any;
  setFieldValue: any;
}) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={10}>
      <TextField
        type="datetime-local"
        label="Entry Date"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("entryDate")}
      />
      <TextField
        type="datetime-local"
        label="Entry Date"
        InputLabelProps={{ shrink: true }}
        {...getFieldProps("expireDate")}
      />
      <LinkField
        value={values.ProjectId}
        choseItem={values.ProjectId}
        label="Project"
        path="/project"
        filterLabel="name"
        getOptionList={(resp) => resp?.result}
        getOptionLabel={(item) => item?.no || item?.name || "No-Name"}
        getOptionValue={(item) => item?.id}
        onChange={(e, nv) => {
          setFieldValue("ProjectId", nv.id);
          setFieldValue("location", nv?.location);
        }}
      />
      <TextField label="Location" {...getFieldProps("location")} disabled />
      <TextField label="Lead Time" {...getFieldProps("leadTime")} />
      <LinkField
        value={values.salesPerson}
        choseItem={values.salesPerson}
        label="Sales Person"
        path="/employee"
        filterLabel="username"
        getOptionList={(resp) => resp}
        getOptionLabel={(item) => item?.username || item?.name || "No-Name"}
        getOptionValue={(item) => item?.id}
        onChange={(e, nv) => setFieldValue("salesPerson", nv.id)}
      />
      <TextField label="Notes" {...getFieldProps("notes")} style={{ gridColumn: "span 3" }} />
    </Box>
  );
}
