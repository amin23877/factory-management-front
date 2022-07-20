import React from "react";
import { Box, Checkbox, FormControlLabel, Paper } from "@material-ui/core";

import TextField from "app/TextField";
import { ArraySelect } from "app/Inputs";
import { useLock } from "common/Lock";

interface IForm {
  values: any;
  errors: any;
  touched: any;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: any;
  isSubmitting?: boolean;
  device?: boolean;
  unlock?: boolean;
}

export const General = ({
  isSubmitting,
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  setFieldValue,
  device,
  unlock,
}: IForm) => {
  const { lock } = useLock();
  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
        <Paper
          style={{
            margin: "0.5em 0",
            padding: "0.5em",
            backgroundColor: "#eee",
            gridColumnEnd: "span 3",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            columnGap: "15px",
          }}
        >
          <FormControlLabel
            name="buildToStock"
            value={values.buildToStock}
            control={<Checkbox checked={Boolean(values.buildToStock)} />}
            label="Build To Stock"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ gridColumnEnd: "span 3" }}
            disabled={lock && !unlock}
          />
        </Paper>
        <ArraySelect
          fullWidth
          label="Type"
          items={["manufacturing", "evaluation", "test", "fieldStartUp"]}
          name="type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={lock && !unlock}
          error={Boolean(errors.type)}
          style={{ gridColumnEnd: "span 3" }}
        />
        <TextField
          disabled={lock && !unlock}
          label="title"
          value={values.title}
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.title && touched.title)}
          placeholder="Title"
          style={{ gridColumnEnd: "span 3" }}
        />
        <TextField
          label="instruction"
          value={values.instruction}
          name="instruction"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.instruction && touched.instruction)}
          placeholder="instruction"
          multiline
          rows={4}
          disabled={lock && !unlock}
          style={{ gridColumnEnd: "span 3" }}
        />
      </Box>
    </>
  );
};
