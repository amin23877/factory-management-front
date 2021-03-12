import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Dialog from "../../app/Dialog";

import { addEmployee } from "../../api/employee";

export const AddEmployeeModal = ({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) => {
    const schema = Yup.object().shape({
        username: Yup.string().required().min(3),
        password: Yup.string().required().min(4),
    });

    const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
        try {
            const resp = await addEmployee(data);
            if (resp) {
                onDone();
                setSubmitting(false);
                console.log(resp);
                onClose();
            }
        } catch (error) {
            console.log(data);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth title="Add new employee">
            <Box m={2}>
                <Formik initialValues={{ username: "", password: "" }} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, touched, errors, handleChange, handleBlur, isSubmitting }) => (
                        <Form>
                            <TextField
                                label="Username"
                                fullWidth
                                style={{ width: "100%" }}
                                placeholder="username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.username && touched.username)}
                                helperText={errors.username}
                            />
                            <TextField
                                label="Password"
                                fullWidth
                                style={{ width: "100%" }}
                                placeholder="password"
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.password && touched.password)}
                                helperText={errors.password}
                            />

                            <Button fullWidth disabled={isSubmitting} type="submit" kind="add" style={{ margin: "2em 0" }}>
                                Add
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
