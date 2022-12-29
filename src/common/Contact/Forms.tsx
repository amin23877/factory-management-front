import React from "react";
import { IForm } from "logic/form";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import TextField from "app/TextField";

export default function ContactForm({ values, errors, handleChange, handleBlur, touched }: IForm) {
  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr" gridRowGap={8} gridColumnGap={8}>
        <Box>
          <FormControlLabel
            name="active"
            onChange={handleChange}
            label="Active"
            control={<Checkbox checked={values.active} />}
          />
          <FormControlLabel
            name="main"
            onChange={handleChange}
            label="Main"
            control={<Checkbox checked={values.main} />}
          />
        </Box>
        <TextField
          name="firstName"
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.firstName && touched.firstName)}
          helperText={errors.firstName}
          value={values.firstName}
          label="First Name"
        />
        <TextField
          name="lastName"
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.lastName && touched.lastName)}
          helperText={errors.lastName}
          value={values.lastName}
          label="Last Name"
        />
        <TextField
          name="title"
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.title && touched.title)}
          helperText={errors.title}
          value={values.title}
          label="Title"
        />
        <TextField
          name="department"
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.department && touched.department)}
          helperText={errors.department}
          value={values.department}
          label="Department"
        />
      </Box>
    </>
  );
}
