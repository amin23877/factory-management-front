import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../store";
import { Drawer, TextField, Button, Checkbox, FormControlLabel } from "@material-ui/core";

import logo from "../assets/splogo.png";
import { Gradients } from "../theme";
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
                                    variant="outlined"
                                    placeholder="username"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.username && touched.username)}
                                    helperText={errors.username}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.password && touched.password)}
                                    helperText={errors.password}
                                />
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
