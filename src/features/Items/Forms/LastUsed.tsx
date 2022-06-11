import { Box, useMediaQuery } from "@material-ui/core";
import { LockButton, LockProvider, useLock } from "common/Lock";
import React from "react";
import TextField from "app/TextField";
import DateTimePicker from "app/DateTimePicker";

export const LastUsed = ({
  getFieldProps,
  values,
  setFieldValue,
}: {
  getFieldProps: any;
  values?: any;
  setFieldValue: any;
}) => {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  return (
    <Box
      mt={1}
      display="grid"
      gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
      gridColumnGap={10}
      gridRowGap={10}
    >
      <LockButton />
      <TextField
        label="last Used In Bom"
        value={values.lastUsedInJOB}
        {...getFieldProps("lastUsedInJOB")}
        disabled={lock}
      />
      <DateTimePicker
        value={values.lastCount}
        label="lastCount"
        {...getFieldProps("lastCount")}
        disabled={lock}
        onChange={(lastCount) => setFieldValue("lastCount", lastCount)}
        format="yyyy-mm-dd"
      />
      <TextField
        {...getFieldProps("usedInQuarter")}
        disabled={lock}
        label="last used in 90 days"
        value={values.usedInQuarter}
      />
      <TextField
        {...getFieldProps("usedInHalf")}
        disabled={lock}
        label="last used in 180 days"
        value={values.usedInHalf}
      />
      <TextField
        label="last used in 360 days"
        value={values.usedInYear}
        {...getFieldProps("usedInYear")}
        disabled={lock}
      />
    </Box>
  );
};
export default function LastUsedTab({
  getFieldProps,
  values,
  setFieldValue,
}: {
  getFieldProps: any;
  values?: any;
  setFieldValue: any;
}) {
  return (
    <LockProvider>
      <LastUsed setFieldValue={setFieldValue} getFieldProps={getFieldProps} values={values} />
    </LockProvider>
  );
}
