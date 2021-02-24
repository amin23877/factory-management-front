import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { getContactTypes } from "../../api/contactType";
import { createAModelContact, deleteAModelContact, updateAModelContact, IContact } from "../../api/contact";

const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    ContactTypeId: Yup.number().required().notOneOf([0]),
});

const Field = ({
    name,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
}: {
    name: string;
    handleBlur: any;
    handleChange: any;
    errors: any;
    values: any;
    touched: any;
}) => {
    return (
        <TextField
            name={name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={Boolean(errors[name] && touched[name])}
            helperText={errors[name] && touched[name]}
            value={values[name]}
            label={name}
            fullWidth
        />
    );
};

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
    return (
        <Dialog open={open} onClose={onClose} title={`${data?.id ? "Edit" : "Add"} a Contact to ${model}`}>
            <Box m={3}>
                <Formik
                    initialValues={
                        data?.id
                            ? data
                            : {
                                  firstName: "",
                                  lastName: "",
                                  title: "",
                                  department: "",
                                  refferedBy: "",
                                  linkedIn: "",
                                  facebook: "",
                                  instagram: "",
                                  website: "",
                                  optout: false,
                                  mi: "",
                                  prefix: "",
                                  active: false,
                                  main: false,
                                  ContactTypeId: 0,
                              }
                    }
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (data?.id) {
                            updateAModelContact(data?.id, values)
                                .then((d: any) => {
                                    console.log(d);
                                    onDone && onDone();
                                    setSubmitting(false);
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        } else {
                            createAModelContact("client", itemId, values)
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
                                style={{ width: "98%" }}
                                name="title"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.title && touched.title)}
                                helperText={errors.title && touched.title}
                                value={values.title}
                                label="title"
                                fullWidth
                            />
                            <Box display="flex" alignItems="center">
                                <TextField
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.firstName && touched.firstName)}
                                    helperText={errors.firstName && touched.firstName}
                                    value={values.firstName}
                                    label="firstName"
                                    fullWidth
                                />
                                <TextField
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.lastName && touched.lastName)}
                                    helperText={errors.lastName && touched.lastName}
                                    value={values.lastName}
                                    label="lastName"
                                    fullWidth
                                />
                            </Box>

                            <Field
                                name="department"
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                            />
                            <Field
                                name="refferedBy"
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                            />
                            <Field
                                name="linkedIn"
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                            />
                            <Field
                                name="facebook"
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                            />
                            <Field
                                name="instagram"
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                            />
                            <Field
                                name="website"
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                            />
                            <Field
                                name="mi"
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                            />
                            <Field
                                name="prefix"
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                                values={values}
                            />

                            <FieldSelect
                                request={getContactTypes}
                                itemTitleField="name"
                                itemValueField="id"
                                fullWidth
                                name="ContactTypeId"
                                label="Contact Type"
                                value={values.ContactTypeId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.ContactTypeId && touched.ContactTypeId)}
                            />

                            <FormControlLabel
                                name="active"
                                onChange={handleChange}
                                label="Is this Contact active?"
                                control={<Checkbox />}
                            />
                            <FormControlLabel
                                name="optout"
                                onChange={handleChange}
                                label="Is this Contact optout?"
                                control={<Checkbox />}
                            />
                            <FormControlLabel name="main" onChange={handleChange} label="Is this Contact main?" control={<Checkbox />} />

                            <Box my={2} textAlign="center">
                                <Button type="submit" disabled={isSubmitting} kind="add">
                                    Save
                                </Button>
                                {data?.id && (
                                    <Button
                                        kind="delete"
                                        style={{ margin: "0 1em" }}
                                        onClick={() => {
                                            if (data?.id) {
                                                deleteAModelContact(data.id)
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
