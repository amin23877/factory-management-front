import React from "react";
import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import { ArraySelect } from "app/Inputs";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";

export default function AddPhone({
  open,
  onClose,
  handleBlur,
  handleChange,
  errors,
  values,
  setFieldValue,
  arrayHelpers,
  touched,
  selectedPhone,
}: any) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth title="Add Phone To A Contact">
      <Box display={"grid"} gridTemplateColumns="1fr" style={{ gap: "10px" }} p={2}>
        <ArraySelect
          items={["mobile", "landline"]}
          defaultValue="mobile"
          value={values.phoneType}
          name="phoneType"
          label="Phone Type"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          name="phone"
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.phone && touched.phone)}
          helperText={errors.phone && touched.phone}
          value={values.phone}
          label="Phone"
        />
        {values.phoneType === "landline" && (
          <TextField
            name="ext"
            onBlur={handleBlur}
            onChange={handleChange}
            error={Boolean(errors.ext && touched.ext)}
            helperText={errors.ext && touched.ext}
            value={values.ext}
            label="EXT"
          />
        )}
        <FormControlLabel
          name="main"
          onChange={handleChange}
          label="Main"
          control={<Checkbox checked={values.main} />}
        />
        {!selectedPhone && (
          <Button
            kind={"add"}
            style={{ marginLeft: "5px" }}
            onClick={() => {
              arrayHelpers.push({
                phone: values.phone,
                ext: values.ext,
                phoneType: values.phoneType,
                main: values.main,
              });
              setFieldValue("phone", "");
              setFieldValue("phoneType", "mobile");
              setFieldValue("ext", "");
              // setFieldValue("main", false);
            }}
          >
            Add Phone
          </Button>
        )}
        {selectedPhone && (
          <Box display={"flex"} mt={1} justifyContent="space-around" gridGap={2}>
            <Button
              kind={"edit"}
              onClick={() => {
                arrayHelpers.replace(selectedPhone.id, {
                  phone: values.phone,
                  ext: values.ext,
                  phoneType: values.phoneType,
                  main: values.main,
                });
                onClose();
              }}
            >
              Save
            </Button>
            <Button
              kind="delete"
              onClick={() => {
                arrayHelpers.remove(selectedPhone.id);
                onClose();
              }}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}

export function AddEmail({
  open,
  onClose,
  handleBlur,
  handleChange,
  errors,
  values,
  setFieldValue,
  arrayHelpers,
  touched,
  selectedEmail,
}: any) {
  console.log(selectedEmail);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth title="Add Email To A Contact">
      <Box display={"grid"} gridTemplateColumns="1fr" style={{ gap: "10px" }} p={2}>
        <TextField
          name="email"
          onBlur={handleBlur}
          onChange={(d) => {
            handleChange(d);
            setFieldValue(
              "emailType",
              values?.email?.substring(values?.email?.indexOf("@") + 1, values?.email?.lastIndexOf("."))
            );
          }}
          error={Boolean(errors.email && touched.email)}
          helperText={errors.email && touched.email}
          value={values.email}
          label="Email"
        />
        <TextField
          name="emailType"
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.emailType && touched.emailType)}
          helperText={errors.emailType && touched.emailType}
          value={values.emailType}
          label="Email Type"
          InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
          name="main"
          onChange={handleChange}
          label="Main"
          control={<Checkbox checked={values.main} />}
        />
        {!selectedEmail && (
          <Button
            kind={"add"}
            style={{ marginLeft: "5px" }}
            onClick={() => {
              arrayHelpers.push({ email: values.email, emailType: values.emailType, main: values.main });
              setFieldValue("email", "");
              setFieldValue("emailType", "");
              setFieldValue("main", false);
            }}
          >
            Add Email
          </Button>
        )}
        {selectedEmail && (
          <Box display={"flex"} mt={1} justifyContent="space-around" gridGap={2}>
            <Button
              kind={"edit"}
              onClick={() => {
                arrayHelpers.replace(selectedEmail.id, {
                  email: values.email,
                  emailType: values.emailType,
                  main: values.main,
                });
                onClose();
              }}
            >
              Save
            </Button>
            <Button
              kind="delete"
              onClick={() => {
                arrayHelpers.remove(selectedEmail.id);
                onClose();
              }}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
