import React, { useState } from "react";
import { Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "app/TextField";
import Button from "app/Button";
import { Gradients } from "theme";
import { loginThunk } from "./sessionsSlice";
import { forgetPassCode, forgetPassReq } from "api/password";
import Toast from "app/Toast";

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(4),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  const handleSubmit = async (data: any) => {
    await dispatch(loginThunk(data));
  };

  const sendReq = async (data: any) => {
    try {
      await forgetPassReq({ email: data.email });
      setEmail(data.email);
    } catch (e) {
      console.log(e);
    }
  };

  const sendCode = async (data: any) => {
    try {
      await forgetPassCode({ email: email, code: data.code, password: data.password });
      Toast("Password Changed Successfully", "success");
      setStep(0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {step === 0 && (
        <Formik initialValues={{ username: "", password: "" }} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form style={{ maxWidth: 300, margin: "0 auto" }}>
              <TextField
                fullWidth
                style={{ width: "100%", margin: "0.5em 0" }}
                placeholder="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.username && touched.username)}
              />
              <Typography variant="caption">{errors.username}</Typography>
              <TextField
                fullWidth
                style={{ width: "100%" }}
                placeholder="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password && touched.password)}
              />
              <Typography variant="caption">{errors.password}</Typography>
              <br />
              <FormControlLabel label="Keep me Loged in" control={<Checkbox />} />
              <Typography
                display="block"
                color="primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setStep(1);
                }}
              >
                forgot password ?
              </Typography>
              <Button
                fullWidth
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "2em 0", background: Gradients.success }}
              >
                login
              </Button>
            </Form>
          )}
        </Formik>
      )}
      {step === 1 && !email && (
        <Formik initialValues={{ email: "" }} onSubmit={sendReq}>
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form style={{ maxWidth: 300, margin: "0 auto" }}>
              <TextField
                fullWidth
                style={{ width: "100%", margin: "0.5em 0" }}
                placeholder="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email && touched.email)}
              />
              <Button
                fullWidth
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "2em 0", background: Gradients.success }}
              >
                Send Code
              </Button>
            </Form>
          )}
        </Formik>
      )}
      {step === 1 && email && (
        <Formik initialValues={{ code: "", password: "", repPassword: "" }} onSubmit={sendCode}>
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form style={{ maxWidth: 300, margin: "0 auto" }}>
              <TextField
                fullWidth
                style={{ margin: "0.5em 0" }}
                placeholder="code"
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.code && touched.code)}
              />
              <TextField
                label="New Password"
                placeholder="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password && touched.password)}
                helperText={touched.repPassword && errors.password}
                style={{ margin: "0.5em 0" }}
                fullWidth
              />
              <Button
                fullWidth
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "2em 0", background: Gradients.success }}
              >
                Submit Code
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
