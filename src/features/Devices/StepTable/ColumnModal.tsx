import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";

const schema = Yup.object().shape({
    name: Yup.string().required(),
});

function ColumnModal({
    columnName,
    open,
    onClose,
    onDone,
}: {
    columnName?: string;
    open: boolean;
    onClose: () => void;
    onDone: (data: { name: string; formerName?: string }) => void;
}) {
    return (
        <Dialog title="Add column" open={open} onClose={onClose}>
            <Box m={1}>
                <Formik
                    initialValues={{} as { name: string }}
                    validationSchema={schema}
                    onSubmit={(d) => onDone({ formerName: columnName, name: d.name })}
                >
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                                {columnName && (
                                    <TextField
                                        name="formerName"
                                        label="Former name"
                                        value={columnName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled
                                    />
                                )}
                                <TextField
                                    name="name"
                                    label={columnName ? "New name" : "Name"}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name}
                                />
                                <Button kind="add" type="submit">
                                    Add
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}

export default ColumnModal;
