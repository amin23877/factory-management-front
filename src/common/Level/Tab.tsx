import React from "react";
import { Box, Divider } from "@material-ui/core";

import TextField from "app/TextField";
import { LockButton, LockProvider, useLock } from "common/Lock";

function LevelsTabContent({ values, handleChange, handleBlur }: { values: any; handleChange: any; handleBlur: any }) {
  const { lock } = useLock();

  if (!values?.levels || Object.keys(values?.levels)?.length <= 0) {
    return <></>;
  }

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
      <TextField
        label="Cluster Value"
        name="clusterValue"
        placeholder="Cluster Value"
        value={values.clusterValue}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={lock}
      />
      <LockButton />
      <Divider style={{ gridColumnEnd: "span 2" }} />
      {Object.keys(values.levels).map((level: any) => (
        <TextField
          label={level}
          name={level}
          placeholder={level}
          defaultValue={values[level] || values.levels[level]}
          value={values[level]}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={lock}
        />
      ))}
    </Box>
  );
}

export default function LevelsTab({
  values,
  handleChange,
  handleBlur,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
}) {
  return (
    <LockProvider>
      <LevelsTabContent values={values} handleChange={handleChange} handleBlur={handleBlur} />
    </LockProvider>
  );
}
