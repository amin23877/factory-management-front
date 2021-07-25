import React, { useCallback } from "react";
import { Box, FormControlLabel, Checkbox, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";

import TextField from "../../../app/TextField";
import Button from "../../../app/Button";

export const General = ({ rule }: { rule?: any }) => {
    const deleteDocument = useCallback(async () => {}, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {}, []);

    return (
        <Formik initialValues={rule ? rule : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={"1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr " gridGap={10}>
                            <Paper
                                style={{
                                    margin: "0.5em 0",
                                    padding: "0 0.5em",
                                    backgroundColor: "#eee",
                                    gridColumnEnd: "span 2",
                                }}
                            >
                                <FormControlLabel
                                    name="enable"
                                    value={values.enable}
                                    control={<Checkbox checked={Boolean(values.enable)} />}
                                    label="Enable / Disable"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    name="engAP"
                                    value={values.engAP}
                                    control={<Checkbox checked={Boolean(values.engAP)} />}
                                    label="Engineering Approved"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Paper>
                            <TextField
                                // style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.priority}
                                name="priority"
                                label="ID"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.description}
                                name="description"
                                label="Description"
                                multiline
                                rows={4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.hours}
                                name="date"
                                label="Date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.hours}
                                name="setion"
                                label="Section"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                kind={rule ? "edit" : "add"}
                                style={{ alignSelf: "center" }}
                            >
                                Save
                            </Button>
                            {rule && (
                                <Button
                                    onClick={deleteDocument}
                                    kind="delete"
                                    disabled={isSubmitting}
                                    style={{ alignSelf: "center" }}
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
