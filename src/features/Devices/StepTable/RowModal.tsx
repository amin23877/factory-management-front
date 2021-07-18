import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";

function RowModal({
    open,
    onClose,
    onDone,
    columns,
}: {
    open: boolean;
    onClose: () => void;
    onDone: (row: any) => void;
    columns: any[];
}) {
    return (
        <Dialog title="Add row" open={open} onClose={onClose}>
            <Box m={1}>
                <Formik initialValues={{} as any} onSubmit={(d) => onDone(d)}>
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                                {columns.map((column) => (
                                    <TextField
                                        key={column.field}
                                        name={column.field}
                                        label={column.field}
                                        value={values[column.field]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors[column.field])}
                                        helperText={errors[column.field]}
                                        required
                                    />
                                ))}
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

export default RowModal;
