import React, { useState } from "react";
import { Drawer, Button, Checkbox, FormControlLabel, Typography, Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Gradients } from "../theme";
import TextField from "../app/TextField";
import { useAuth } from "../store";

import logo from "../assets/splogo.png";
import "../styles/splash.css";

export default function SplashScreen() {
    const [open, setOpen] = useState(true);
    const auth = useAuth();

    const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required().min(4),
    });

    const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: (a: boolean) => void }) => {
        try {
            const resp = await auth.Login(data);
            if (resp) {
                console.log(resp, auth);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="splash-bg">
            <Drawer PaperProps={{ style: { border: "none" }, elevation: 4 }} open={open} variant="persistent" anchor="right">
                <div style={{ margin: "1em 2em", width: 400 }}>
                    <h1>Login</h1>
                    <Formik initialValues={{ username: "", password: "" }} validationSchema={schema} onSubmit={handleSubmit}>
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                            <Form>
                                <TextField
                                    fullWidth
                                    style={{ width: "100%" }}
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
