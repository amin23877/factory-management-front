import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import TextField from "../../app/TextField";
import Button from "../../app/Button";

import { createAModelContact, deleteAModelContact, updateAModelContact, IContact } from "../../api/contact";
import { mutate } from "swr";

export const ContactModal = ({
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
    data?: IContact;
    onDone?: () => void;
}) => {
    const handleDelete = () => {
        if (data?.id) {
            deleteAModelContact(data.id)
                .then(() => {
                    onClose();
                    mutate(`/contact/customer/${itemId}`);
                    onDone && onDone();
                })
                .catch((e) => console.log(e));
        }
    };

    const handleSubmit = (values: any, { setSubmitting }: any) => {
        if (data?.id) {
            updateAModelContact(data?.id, values)
                .then((d: any) => {
                    console.log(d);
                    mutate(`/contact/customer/${itemId}`);
                    onDone && onDone();
                    setSubmitting(false);
                    onClose();
                })
                .catch((e) => console.log(e));
        } else {
            createAModelContact("client", itemId, values)
                .then((d: any) => {
                    console.log(d);
                    mutate(`/contact/customer/${itemId}`);
                    onDone && onDone();
                    setSubmitting(false);
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title={`${data?.id ? "Edit" : "Add"} a Contact to ${model}`}>
            <Box m={3}>
                <Formik initialValues={data?.id ? data : ({} as IContact)} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={8} gridColumnGap={8}>
                                <TextField
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.firstName && touched.firstName)}
                                    helperText={errors.firstName && touched.firstName}
                                    value={values.firstName}
                                    label="First Name"
                                />
                                <TextField
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.lastName && touched.lastName)}
                                    helperText={errors.lastName && touched.lastName}
                                    value={values.lastName}
                                    label="Last Name"
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
                                <TextField
                                    name="ext"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.ext && touched.ext)}
                                    helperText={errors.ext && touched.ext}
                                    value={values.ext}
                                    label="Ext"
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.email && touched.email)}
                                    helperText={errors.email && touched.email}
                                    value={values.email}
                                    label="Email"
                                />

                                <TextField
                                    name="title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.title && touched.title)}
                                    helperText={errors.title && touched.title}
                                    value={values.title}
                                    label="Title"
                                />
                                <TextField
                                    name="department"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.department && touched.department)}
                                    helperText={errors.department && touched.department}
                                    value={values.department}
                                    label="Department"
                                />
                                <FormControlLabel
                                    name="main"
                                    onChange={handleChange}
                                    label="Main"
                                    control={<Checkbox checked={values.main} />}
                                />
                                <FormControlLabel
                                    name="active"
                                    onChange={handleChange}
                                    label="Active"
                                    control={<Checkbox checked={values.active} />}
                                />
                                {/* <FormControlLabel
                                    name="optout"
                                    onChange={handleChange}
                                    label="Optout"
                                    control={<Checkbox checked={values.optout} />}
                                /> */}
                                <Button type="submit" disabled={isSubmitting} kind={data ? "edit" : "add"}>
                                    Save
                                </Button>
                                {data?.id && (
                                    <Button kind="delete" onClick={handleDelete}>
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
