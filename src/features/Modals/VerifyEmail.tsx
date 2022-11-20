import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { verifyCode, verifyEmailReq } from "api/password";
import Toast from "app/Toast";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});
const codeSchema = Yup.object().shape({
  code: Yup.string().required(),
});

export const VerifyEmail = ({
  open,
  onClose,
  onDone,
  employeeId,
}: {
  open: boolean;
  onClose: () => void;
  onDone?: () => void;
  employeeId: string;
}) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  const handleSendEmail = (values: any, { setSubmitting }: any) => {
    verifyEmailReq(employeeId, values)
      .then((d: any) => {
        setEmail(values.email);
        setSubmitting(false);
        setStep(1);
      })
      .catch((e) => console.log(e));
  };

  const handleVerifyCode = (values: any, { setSubmitting }: any) => {
    verifyCode(employeeId, { ...values, email: email })
      .then((d: any) => {
        setSubmitting(false);
        Toast("Email Verified Successfully", "success");
        onDone && onDone();
      })
      .catch((e) => Toast(e));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" title={`Verify Email To Continue`}>
      <Box m={3}>
        {step === 0 && (
          <Formik initialValues={{ email: "" }} validationSchema={schema} onSubmit={handleSendEmail}>
            {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
              <Form>
                <Box display="grid" gridTemplateColumns="1fr" gridRowGap={8}>
                  <TextField
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.email && touched.email)}
                    helperText={errors.email && touched.email}
                    value={values.email}
                    label="Email"
                    fullWidth
                  />

                  <Button type="submit" disabled={isSubmitting} kind={"add"}>
                    Verify
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
        {step === 1 && (
          <Formik initialValues={{ code: "" }} validationSchema={codeSchema} onSubmit={handleVerifyCode}>
            {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
              <Form>
                <Box display="grid" gridTemplateColumns="1fr" gridRowGap={8}>
                  <TextField
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.code && touched.code)}
                    helperText={errors.code && touched.code}
                    value={values.code}
                    label="Code"
                    fullWidth
                  />

                  <Button type="submit" disabled={isSubmitting} kind={"add"}>
                    Verify
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </Dialog>
  );
};
