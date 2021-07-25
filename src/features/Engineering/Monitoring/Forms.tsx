import React, { useCallback } from "react";
import { Box, FormControlLabel, Checkbox, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";

import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { getModifiedValues } from "../../../logic/utils";
import { DatePicker } from "@material-ui/pickers";
import { formatTimestampToDate } from "../../../logic/date";
import { updateRule } from "../../../api/monitor";
import Toast from "../../../app/Toast";
import { mutate } from "swr";

export const General = ({ rule }: { rule?: any }) => {
    const handleSubmit = useCallback(async (values, { setSubmitting }) => {
        try {
            await updateRule(rule.id, getModifiedValues(values, rule));
            mutate("/monitor");

            Toast("Record updated", "success");
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Formik initialValues={rule ? rule : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleChange, getFieldProps, setFieldValue }) => (
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
                                    checked={values.enable}
                                    control={<Checkbox />}
                                    label="Enable / Disable"
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    name="engAP"
                                    checked={values.engAP}
                                    control={<Checkbox />}
                                    label="Engineering Approved"
                                    onChange={handleChange}
                                />
                            </Paper>
                            <TextField disabled label="ID" {...getFieldProps("id")} />
                            <TextField label="Name" {...getFieldProps("name")} />
                            <DatePicker
                                size="small"
                                label="Date"
                                name="date"
                                value={formatTimestampToDate(values.date)}
                                onChange={(date) => setFieldValue("date", date)}
                            />
                            <TextField label="Section" {...getFieldProps("section")} />
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                label="Description"
                                multiline
                                rows={4}
                                {...getFieldProps("description")}
                            />
                            <Button kind="edit" type="submit">
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
