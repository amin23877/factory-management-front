import React from "react";

import TextField from "app/TextField";

import { LockProvider, useLock, LockButton } from "common/Lock";
import { Box, Divider } from "@material-ui/core";

export const Levels = ({ values, handleChange, handleBlur }: any) => {
  const { lock } = useLock();

  if (!values?.levels || Object.keys(values?.levels)?.length <= 0) {
    return <></>;
  }

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
      <LockButton />
      <TextField
        label="Cluster Value"
        name="clusterValue"
        placeholder="Cluster Value"
        value={values.clusterValue}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={lock}
        style={{ gridColumn: "span 2" }}
      />
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
};
export default function LevelTab({ values, handleChange, handleBlur }: any) {
  return (
    <LockProvider>
      <Levels values={values} handleChange={handleChange} handleBlur={handleBlur} />
    </LockProvider>
  );
}
