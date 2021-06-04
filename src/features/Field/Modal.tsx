import React from "react";
import { Box, Divider } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import FieldForm from "./Form";
import FieldTable from "./Table";

import { basePost } from "../../api";
import { IField } from "../../api/field";
import { mutate } from "swr";

export const AddFieldModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const schema = Yup.object().shape({
        filterName: Yup.string().required(),
        filterValue: Yup.string().required(),
        type: Yup.string().required(),
        name: Yup.string().required(),
        required: Yup.boolean().required(),
        default: Yup.string(),
        valid: Yup.string(),
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        setSubmitting(true);
        try {
            const resp = await basePost("/field", values);
            if (resp) {
                mutate("/field");
                setSubmitting(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth title={"Add Field Modal"}>
            <Box m={3}>
                <Formik initialValues={{} as IField} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting, setValues, setTouched }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={12} gridColumnGap={12}>
                                <FieldForm
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <Button type="submit" disabled={isSubmitting} kind="add">
                                    Save
                                </Button>
                            </Box>
                            <FieldTable />
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
