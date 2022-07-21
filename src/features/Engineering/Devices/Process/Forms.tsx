import React from "react";
import { Box, Checkbox, FormControlLabel, Paper } from "@material-ui/core";

import TextField from "app/TextField";

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

export const General = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
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
            name="realeased"
            value={values.realeased}
            control={<Checkbox checked={Boolean(values.realeased)} />}
            label="Released"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ gridColumnEnd: "span 3" }}
          />
        </Paper>
        <TextField
          label="Title"
          value={values.title}
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.title && touched.title)}
          placeholder="Title"
          style={{ gridColumnEnd: "span 3" }}
        />
        <TextField
          label="Description"
          value={values.description}
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.description && touched.description)}
          placeholder="Description"
          multiline
          rows={4}
          style={{ gridColumnEnd: "span 3" }}
        />
      </Box>
    </>
  );
};
