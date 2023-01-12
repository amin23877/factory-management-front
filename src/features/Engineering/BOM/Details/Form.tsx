import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form as FormikForm } from "formik";

import TextField from "app/TextField";
import Button from "app/Button";
import Toast from "app/Toast";
import { LockButton, useLock } from "common/Lock";

import { clusterType, updateCluster } from "api/cluster";
import { ArraySelect } from "app/Inputs";

export default function Form({ initialValues }: { initialValues: clusterType }) {
  const { lock } = useLock();

  const handleUpdate = async (data: any, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      await updateCluster(initialValues.id, data);

      Toast("Record updated", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleUpdate}>
      {({ getFieldProps, values, setSubmitting, isSubmitting }) => (
        <FormikForm>
          <Box
            display="flex"
            flexDirection="column"
            style={{ gap: 8 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate(values, { setSubmitting });
              }
            }}
          >
            <ArraySelect
              items={["option", "device", "assembly", "part", "fru"]}
              label="Phone Type"
              {...getFieldProps("class")}
              disabled={lock}
            />
            <TextField label="Cluster Value" {...getFieldProps("clusterValue")} disabled={lock} />
            <TextField label="Device Name" {...getFieldProps("deviceName")} disabled={lock} />
            <TextField label="Description" {...getFieldProps("description")} multiline rows={3} disabled={lock} />
            {
              <Box display={"flex"} gridGap={1} alignItems="center" justifyContent={"center"}>
                <Button kind="edit" type="submit" disabled={lock || isSubmitting}>
                  Save
                </Button>
                <LockButton />
              </Box>
            }
          </Box>
        </FormikForm>
      )}
    </Formik>
  );
}
