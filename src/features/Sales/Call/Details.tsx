import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";

import { GeneralForm } from "./Forms";
import Button from "../../../app/Button";
import TextField from "../../../app/TextField";

import { editCall } from "../../../api/calls";

import Snack from "../../../app/Snack";
import { mutate } from "swr";

export default function Details({ callsData }: { callsData: any }) {
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const resp = await editCall(callsData.id, { ...values, tags: [values.tags] });
            console.log(resp);
            if (resp.id) {
                setShowSnack(true);
                setMsg("Success");
            } else {
                setShowSnack(true);
                setMsg("Error " + resp.error);
            }

            mutate("/calls");
            setSubmitting(false);
        } catch (error) {
            setShowSnack(true);
            setMsg("Error " + error);
        }
    };
    return (
        <Box>
            <Snack open={showSnack} onClose={() => setShowSnack(false)}>
                {msg}
            </Snack>

            <Formik initialValues={callsData} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="flex" style={{ justifyContent: "space-between" }}>
                            <Box flex={3}>
                                <GeneralForm
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
                                        rows={3}
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
                                    <Button type="submit" kind="edit">
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
