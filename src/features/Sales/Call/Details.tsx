import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import { mutate } from "swr";

import { GeneralForm } from "./Forms";
import * as Yup from "yup";

import Button from "../../../app/Button";
import TextField from "../../../app/TextField";
import Toast from "../../../app/Toast";

import { editCall } from "../../../api/calls";

import { getModifiedValues } from "../../../logic/utils";

const schema = Yup.object().shape({
    address: Yup.string().required(),
    zip: Yup.string().required(),
    state: Yup.string().required(),
    Tags: Yup.string().required(),
    subject: Yup.string().required(),
    description: Yup.string().required(),
    CreatedBy: Yup.string().required(),
    AssignedTo: Yup.string().required(),
    response: Yup.string().required(),
    contactName: Yup.string().required(),
    contactNumber: Yup.string().required(),
});

export default function Details({ callsData }: { callsData: any }) {
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            values.Tags[0]?.id
                ? await editCall(callsData.id, getModifiedValues({ ...values }, callsData))
                : await editCall(callsData.id, getModifiedValues({ ...values, Tags: [values.Tags] }, callsData));
            Toast("Record updated", "success");
            mutate("/calls");
            setSubmitting(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={callsData} onSubmit={handleSubmit} validationSchema={schema}>
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setSubmitting }) => (
                <Form>
                    <Box display="flex" style={{ justifyContent: "space-between" }}>
                        <Box flex={3}>
                            <GeneralForm
                                setFieldValue={setFieldValue}
                                values={values}
                                errors={errors}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched}
                            />
                            <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr">
                                <TextField
                                    multiline
                                    style={{ gridColumnEnd: "span 4" }}
                                    rows={4}
                                    placeholder="description"
                                    label="Description"
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <TextField
                                    multiline
                                    style={{ gridColumnEnd: "span 4" }}
                                    rows={4}
                                    placeholder="response"
                                    label="Response"
                                    name="response"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.response}
                                />
                            </Box>
                            <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Button type="submit" kind="edit" style={{ width: "200px" }}>
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
