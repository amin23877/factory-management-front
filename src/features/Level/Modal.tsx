import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import Toast from "app/Toast";

import { getModifiedValues } from "logic/utils";
import { ILevel, createLevel, editLevel } from "api/level";
// import AsyncCombo from "common/AsyncCombo";
import { clusterType } from "api/cluster";

export default function LevelModal({
  open,
  cluster,
  initialValues,
  onClose,
  onDone,
}: {
  open: boolean;
  cluster: clusterType;
  initialValues?: ILevel;
  onClose: () => void;
  onDone?: () => void;
}) {
  const handleSubmit = async (data: any) => {
    try {
      if (initialValues && initialValues.id) {
        const modified = getModifiedValues(data, initialValues.id);
        await editLevel(initialValues.id, modified);

        Toast("Level updated successfully", "success");
        onDone && onDone();
        onClose();
      } else {
        await createLevel({ ...data, clusterId: cluster.id });

        Toast("Level created successfully", "success");
        onDone && onDone();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Level">
      <Formik initialValues={initialValues || ({} as ILevel)} onSubmit={handleSubmit}>
        {({ getFieldProps, setFieldValue, values }) => (
          <Form>
            <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
              <TextField label="Name" {...getFieldProps("name")} />
              {/* <AsyncCombo
                url="cluster"
                filterBy="clusterValue"
                getOptionLabel={(o) => o?.clusterValue || "No-Name"}
                getOptionSelected={(o, v) => o?.id === v?.id}
                label="Cluster"
                onChange={(e, nv) => setFieldValue("clusterId", nv?.id)}
                value={values.clusterId}
              /> */}
              <TextField
                label="Valid Values"
                {...getFieldProps("valid")}
                multiline
                rows={3}
                helperText="Comma separated values"
              />
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
