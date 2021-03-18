import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { FieldSelect } from "../../app/Inputs";

import { getEmailTypes } from "../../api/emailType";
import { createAModelEmailAddr, deleteAModelEmailAddr, updateAModelEmailAddr, IEmailAddress } from "../../api/emailAddress";

const schema = Yup.object().shape({
    email: Yup.string().required(),
    EmailTypeId: Yup.number().required().notOneOf([0]),
});

export const EmailModal = ({
    open,
    onClose,
    model,
    itemId,
    data,
    onDone,
}: {
    open: boolean;
    onClose: () => void;
    model: string;
    itemId: string;
    data?: IEmailAddress;
    onDone?: () => void;
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" title={`${data?.id ? "Edit" : "Add"} an Email to ${model}`}>
            <Box m={3}>
                <Formik
                    initialValues={data?.id ? data : { email: "", main: false, EmailTypeId: 0 }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (data?.id) {
                            updateAModelEmailAddr(data?.id, values)
                                .then((d: any) => {
                                    console.log(d);
                                    onDone && onDone();
                                    setSubmitting(false);
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        } else {
                            createAModelEmailAddr("client", itemId, values)
                                .then((d: any) => {
                                    console.log(d);
                                    onDone && onDone();
                                    setSubmitting(false);
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        }
                    }}
                >
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <TextField
                                style={{ width: "100%" }}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.email && touched.email)}
                                helperText={errors.email && touched.email}
                                value={values.email}
                                label="email"
                                fullWidth
                            />

                            <FieldSelect
                                request={getEmailTypes}
                                itemTitleField="name"
                                itemValueField="id"
                                fullWidth
                                name="EmailTypeId"
                                label="Email Type"
                                value={values.EmailTypeId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.EmailTypeId && touched.EmailTypeId)}
                            />

                            <FormControlLabel
                                name="main"
                                onChange={handleChange}
                                label="Use this as main email address"
                                control={<Checkbox checked={values.main} style={{ marginLeft: "8px" }} />}
                            />

                            <Box my={2} textAlign="center" display="flex">
                                <Button type="submit" style={{ flex: 1 }} disabled={isSubmitting} kind={data ? "edit" : "add"}>
                                    Save
                                </Button>
                                {data?.id && (
                                    <Button
                                        kind="delete"
                                        style={{ margin: "0 1em" }}
                                        onClick={() => {
                                            if (data?.id) {
                                                deleteAModelEmailAddr(data.id)
                                                    .then(() => {
                                                        onClose();
                                                        onDone && onDone();
                                                    })
                                                    .catch((e) => console.log(e));
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
