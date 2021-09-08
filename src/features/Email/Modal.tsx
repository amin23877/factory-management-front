import React from "react";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import TextField from "../../app/TextField";
import Button from "../../app/Button";

const schema = Yup.object().shape({
    to: Yup.string().required().email(),
    subject: Yup.string().required(),
    body: Yup.string().required(),
});

export default function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const handleSubmit = (data: any) => {
        window.open(`mailto:${data.to}?subject=${data.subject}&body=${data.body}`);
        onClose();
    };

    return (
        <Dialog title="Email" open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box m={2}>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={{ to: "", subject: "", body: "" }}
                    validationSchema={schema}
                >
                    {({ getFieldProps, errors, touched }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                                <TextField
                                    {...getFieldProps("to")}
                                    name="to"
                                    label="To"
                                    error={Boolean(errors.to && touched.to)}
                                    helperText={errors.to}
                                />
                                <TextField
                                    {...getFieldProps("subject")}
                                    name="subject"
                                    label="Subject"
                                    error={Boolean(errors.subject && touched.subject)}
                                    helperText={errors.subject}
                                />
                                <TextField
                                    {...getFieldProps("body")}
                                    name="body"
                                    label="Body"
                                    multiline
                                    rows={4}
                                    error={Boolean(errors.body && touched.body)}
                                    helperText={errors.body}
                                />
                                <Button type="submit" kind="add">
                                    Send
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
