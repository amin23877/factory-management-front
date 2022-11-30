import React from "react";
import Dialog from "app/Dialog";
import { Form, Formik } from "formik";
import { Box } from "@material-ui/core";
import TextField from "app/TextField";
import Button from "app/Button";
import { useSelector } from "react-redux";
import { selectSession } from "features/Session/sessionsSlice";
import { IEmployee, updateEmployee } from "api/employee";
import Toast from "app/Toast";

export const EditProfile = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const session = useSelector(selectSession);

  const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
    try {
      if (session?.session) {
        const resp = await updateEmployee(session.session.id, data);
        if (resp) {
          Toast("updated successfully", "success");
          setSubmitting(false);
          onClose();
        }
      }
    } catch (error) {
      console.log(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Edit Profile">
      <Formik initialValues={session?.session ? session?.session : ({} as IEmployee)} onSubmit={handleSubmit}>
        {({ values, touched, errors, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
          <Form>
            <Box display="grid" gridTemplateColumns="1fr" gridGap={"12px"}>
              <TextField
                label="Name"
                placeholder="name"
                type="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name && touched.name)}
                helperText={errors.name}
              />
              <TextField
                label="Last Name"
                placeholder="lastName"
                type="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.lastName && touched.lastName)}
                helperText={errors.lastName}
              />
              <TextField
                label="Department"
                placeholder="department"
                type="department"
                name="department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.department && touched.department)}
                helperText={errors.department}
              />

              <Button fullWidth disabled={isSubmitting} type="submit" kind="edit">
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
