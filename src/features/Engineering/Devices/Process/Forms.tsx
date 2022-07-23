import React from "react";
import { Box, Checkbox, FormControlLabel, Paper } from "@material-ui/core";

import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";

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
  type?: string;
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
export const SubProcess = ({ values, errors, handleChange, handleBlur, touched, type, setFieldValue }: IForm) => {
  console.log(values);

  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
        <LinkField
          filterLabel="title"
          getOptionLabel={(item) => item?.title || "No-Number"}
          getOptionList={(resp) => resp.result || []}
          getOptionValue={(item) => item.id}
          path={`/task?type=${type}`}
          value={values.TaskId}
          choseItem={values.ItemObject}
          onChange={(e, nv) => {
            setFieldValue("TaskId", nv?.id);
          }}
          label="Task Title"
        />
        <TextField
          type="number"
          label="Major"
          value={values.majorStep}
          name="majorStep"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.majorStep && touched.majorStep)}
          placeholder="Major"
          style={{ gridColumnEnd: "span 3" }}
        />
        <TextField
          type="number"
          label="Minor"
          value={values.minorStep}
          name="minorStep"
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.minorStep && touched.minorStep)}
          placeholder="Minor"
          style={{ gridColumnEnd: "span 3" }}
        />
      </Box>
    </>
  );
};
