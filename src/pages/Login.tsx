import React, { useState } from "react";
import { Drawer, Button, Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { loginThunk } from "../features/Session/sessionsSlice";

import { Gradients } from "../theme";
import TextField from "../app/TextField";

import logo from "../assets/splogo.png";

import "../styles/splash.css";

export default function SplashScreen() {
    const [open] = useState(true);
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required().min(4),
    });

    const handleSubmit = (data: any) => {
        dispatch(loginThunk(data));
    };

    return (
        <div className="splash-bg">
            <Drawer
                PaperProps={{ style: { border: "none" }, elevation: 4 }}
                open={open}
                variant="persistent"
                anchor="right"
            >
                <div style={{ margin: "1em 2em", width: 400 }}>
                    <h1>Login</h1>
                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                            <Form>
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
                                <FormControlLabel label="Keep Loged in?" control={<Checkbox />} />

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
                </div>
            </Drawer>
            <img src={logo} alt="phocus" className="main-logo" />
        </div>
    );
}
