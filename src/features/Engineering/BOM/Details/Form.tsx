import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form as FormikForm } from "formik";

import TextField from "app/TextField";
import { clusterType } from "api/cluster";

import { LockButton, useLock } from "common/Lock";

export default function Form({ initialValues }: { initialValues: clusterType }) {
  const { lock } = useLock();

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ getFieldProps }) => (
        <FormikForm>
          <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
            <TextField label="Cluster Value" {...getFieldProps("clusterValue")} disabled={lock} />
            <TextField label="Device Name" {...getFieldProps("deviceName")} disabled={lock} />
            <TextField label="Description" {...getFieldProps("description")} multiline rows={3} disabled={lock} />
            <LockButton />
          </Box>
        </FormikForm>
      )}
    </Formik>
  );
}
