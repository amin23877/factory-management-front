import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form as FormikForm } from "formik";

import TextField from "app/TextField";
import Button from "app/Button";
import Toast from "app/Toast";
import { LockButton, useLock } from "common/Lock";

import { clusterType, updateCluster } from "api/cluster";
import { getModifiedValues } from "logic/utils";

export default function Form({ initialValues }: { initialValues: clusterType }) {
  const { lock } = useLock();

  const handleUpdate = async (data: any) => {
    try {
      const modified = getModifiedValues(data, initialValues);
      await updateCluster(initialValues.id, modified);

      Toast("Record updated", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleUpdate}>
      {({ getFieldProps }) => (
        <FormikForm>
          <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
            <TextField label="Cluster Value" {...getFieldProps("clusterValue")} disabled={lock} />
            <TextField label="Device Name" {...getFieldProps("deviceName")} disabled={lock} />
            <TextField label="Description" {...getFieldProps("description")} multiline rows={3} disabled={lock} />
            <Button kind="add" type="submit" style={{ display: "none" }}>
              Update
            </Button>
            <LockButton />
          </Box>
        </FormikForm>
      )}
    </Formik>
  );
}
