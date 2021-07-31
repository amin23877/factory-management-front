import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import TextField from "../../app/TextField";
import { Box } from "@material-ui/core";
import { addManualCount } from "../../api/items";
import Toast from "../../app/Toast";

export default function ManualCountModal({
    open,
    itemId,
    onClose,
}: {
    itemId: string;
    open: boolean;
    onClose: () => void;
}) {
    const handleSubmit = (d: any) => {
        addManualCount(itemId, d.count, d.date)
            .then((d) => {
                Toast("Record updated successfully", "success");
            })
            .catch((e) => console.log(e));
    };

    return (
        <Dialog open={open} onClose={onClose} title="Adjust last manual count">
            <Box m={2}>
                <Formik initialValues={{} as any} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, errors }) => (
                        <Form>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <TextField
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.date)}
                                    helperText={errors.date}
                                    type="date"
                                    label="date"
                                    style={{ marginRight: 10 }}
                                />
                                <TextField
                                    name="count"
                                    value={values.count}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.count)}
                                    helperText={errors.count}
                                    label="Count"
                                />
                            </Box>
                            <Button style={{ marginTop: 10 }} type="submit" kind="add" fullWidth>
                                Adjust
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
