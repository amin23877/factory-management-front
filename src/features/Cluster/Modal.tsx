import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";

import { clusterType, createCluster, updateCluster } from "api/cluster";
import TextField from "app/TextField";
import Button from "app/Button";
import Toast from "app/Toast";
import { getModifiedValues } from "logic/utils";

export default function ClusterModal({
  open,
  initialValues,
  onClose,
  onDone,
}: {
  open: boolean;
  initialValues?: clusterType;
  onClose: () => void;
  onDone?: () => void;
}) {
  const handleSubmit = async (data: any) => {
    try {
      if (initialValues && initialValues.id) {
        const modified = getModifiedValues(data, initialValues.id);
        await updateCluster(initialValues.id, modified);

        Toast("Cluster updated successfully", "success");
        onDone && onDone();
        onClose();
      } else {
        await createCluster(data);

        Toast("Cluster created successfully", "success");
        onDone && onDone();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Cluster">
      <Formik initialValues={initialValues || ({} as clusterType)} onSubmit={handleSubmit}>
        {({ getFieldProps }) => (
          <Form>
            <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
              <TextField label="Cluster Value" {...getFieldProps("clusterValue")} />
              <TextField label="Device Name" {...getFieldProps("deviceName")} />
              <TextField label="Description" {...getFieldProps("description")} multiline rows={3} />
              <Button kind={initialValues?.id ? "edit" : "add"} type="submit">
                Add
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
