import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { createVendor, IVendor, updateVendor } from "../../api/vendor";

export const AddVendorForm = ({ onDone }: { initialValues?: IVendor; onDone: () => void }) => {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
    });

    return (
        <Formik
            initialValues={{ name: "", description: "" }}
            validationSchema={schema}
            onSubmit={async (d, { setSubmitting }) => {
                try {
                    const resp = await createVendor(d);
                    if (resp) {
                        onDone();
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ values, errors, handleChange, handleBlur }) => (
                <Form>
                    <Box display="flex" flexDirection="column" p={2}>
                        <TextField
                            name="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.name)}
                            style={{ margin: "1em 0" }}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.description)}
                            style={{ margin: "1em 0" }}
                            multiline
                            rows={3}
                        />
                        <Button type="submit" kind="add">
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export const UpdateVendorForm = ({ initialValues, onDone }: { initialValues: IVendor; onDone: () => void }) => {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (d, { setSubmitting }) => {
                try {
                    if (initialValues.id) {
                        const resp = await updateVendor(initialValues.id, d);
                        if (resp) {
                            onDone();
                        }
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ values, errors, handleChange, handleBlur }) => (
                <Form>
                    <Box display="flex" flexDirection="row" alignItems="flex-end" p={2}>
                        <TextField
                            name="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.name)}
                            style={{ marginRight: "1em" }}
                        />
                        <Button type="submit" kind="edit" style={{ marginBottom: "0.6em" }}>
                            Save
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
