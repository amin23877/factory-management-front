import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import Button from "app/Button";
import Confirm from "common/Confirm";
import { deleteLevel } from "api/level";
import Toast from "app/Toast";

export default function LevelForm({
  handleBlur,
  handleChange,
  values,
  resetForm,
  setRefresh,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  resetForm: any;
  setRefresh: (a: any) => void;
}) {
  const handleDelete = async (id: string) => {
    try {
      if (id) {
        await deleteLevel(id);
        Toast("Level Deleted.", "success");
        resetForm({
          values: { id: undefined, name: "", clusterValueRef: "", valid: "" },
        });
      }
    } catch (error) {
      Toast("An error ocurred", "error");
    } finally {
      setRefresh((p: number) => p + 1);
    }
  };
  return (
    <Box display="grid" gridTemplateColumns={values.id ? "1fr 1fr 1fr 1fr 1fr 1fr" : "1fr 1fr 1fr 1fr"} gridGap={5}>
      <TextField
        name="name"
        value={values?.name?.split("__")[0]}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Level Name"
        placeholder="Name"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="clusterValueRef"
        value={values.clusterValueRef}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Cluster Value "
        label="Cluster Value"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="valid"
        value={values.valid}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Valid Values"
        label="Valid Values"
        InputLabelProps={{ shrink: true }}
      />
      <Button kind={values && values.id ? "edit" : "add"} type="submit">
        save
      </Button>
      {values && values.id && (
        <Button
          kind="delete"
          onClick={() => {
            Confirm({
              text: "Delete This Level ? ",
              onConfirm: () => {
                handleDelete(values.id);
              },
            });
          }}
        >
          Delete
        </Button>
      )}
      {values && values.id && (
        <Button
          variant="outlined"
          onClick={() => {
            resetForm({
              values: { id: undefined, name: "", clusterValueRef: "", valid: "" },
            });
          }}
        >
          Cancel
        </Button>
      )}
    </Box>
  );
}
