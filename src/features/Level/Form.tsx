import React from "react";
import { Box } from "@material-ui/core";

import TextField from "app/TextField";
import Button from "app/Button";

export default function LevelForm({
  handleBlur,
  handleChange,
  values,
  resetForm,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  resetForm: any;
}) {
  return (
    <Box display="grid" gridTemplateColumns={values.id ? "1fr 1fr 1fr 1fr 1fr" : "1fr 1fr 1fr 1fr"} gridGap={5}>
      <TextField
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        label="name"
        placeholder="Name"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="clusterValueRef"
        value={values.clusterValueRef}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Cluster Value Reference"
        label="Cluster Value Reference"
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
          onClick={() => {
            resetForm({
              values: { id: undefined, name: "", clusterValueRef: "", valid: "" },
            });
          }}
        >
          clear
        </Button>
      )}
    </Box>
  );
}
