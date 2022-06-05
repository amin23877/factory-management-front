import React from "react";
import { Box } from "@material-ui/core";
import { mutate } from "swr";

import TextField from "app/TextField";
import Button from "app/Button";
import { ObjectSelect } from "app/Inputs";
import Toast from "app/Toast";
import Confirm from "common/Confirm";

import { deleteCluster } from "api/cluster";

const itemTypes = [
  { value: "option", title: "Option" },
  { value: "device", title: "Device" },
  { value: "assembly", title: "Assembly" },
  { value: "part", title: "Part" },
  { value: "fru", title: "FRU" },
];

export default function ClusterForm({
  values,
  resetForm,
  setFieldValue,
  getFieldProps,
  onDone,
}: {
  values: any;
  resetForm: any;
  setFieldValue: any;
  getFieldProps: any;
  onDone?: () => void;
}) {
  const handleDelete = () => {
    Confirm({
      onConfirm: async () => {
        try {
          if (values && values.id) {
            await deleteCluster(values.id);

            onDone && onDone();
            Toast("Record deleted", "success");
          }
        } catch (error) {
          console.log(error);
        } finally {
          mutate("/cluster");
        }
      },
    });
  };

  return (
    <Box display="grid" gridTemplateColumns={"repeat(4, 1fr)"} gridGap={10}>
      <ObjectSelect
        label="Item Type"
        items={itemTypes}
        itemTitleField="title"
        itemValueField="value"
        value={values.class}
        onChange={(e) => setFieldValue("class", e.target.value)}
        InputLabelProps={{ shrink: true }}
        disabled={Boolean(values.id)}
      />
      <TextField label="Cluster Value" {...getFieldProps("clusterValue")} InputLabelProps={{ shrink: true }} />
      <TextField label="Cluster Name" {...getFieldProps("deviceName")} InputLabelProps={{ shrink: true }} />
      <Box display="flex" alignItems="center" style={{ gap: 8 }}>
        <Button kind={values && values?.id ? "edit" : "add"} type="submit">
          Save
        </Button>
        {values && values.id && (
          <Button kind="delete" onClick={handleDelete}>
            Delete
          </Button>
        )}
        {values && values.id && (
          <Button
            variant="outlined"
            onClick={() => {
              resetForm({
                values: {
                  id: undefined,
                  class: "",
                  clusterValue: "",
                  clusterName: "",
                  description: "",
                  deviceName: "",
                },
              } as any);
            }}
          >
            Cancel
          </Button>
        )}
      </Box>
      <TextField
        label="Description"
        multiline
        rows={2}
        {...getFieldProps("description")}
        InputLabelProps={{ shrink: true }}
        style={{ gridColumn: "span 4" }}
      />
    </Box>
  );
}
