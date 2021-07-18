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
    open,
    onClose,
    onDone,
}: {
    open: boolean;
    onClose: () => void;
    onDone: (columnName: string) => void;
}) {
    return (
        <Dialog title="Add column" open={open} onClose={onClose}>
            <Box m={1}>
                <Formik
                    initialValues={{} as { name: string }}
                    validationSchema={schema}
                    onSubmit={(d) => onDone(d.name)}
                >
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <TextField
                                name="name"
                                label="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                            />
                            <Button kind="add" type="submit">
                                Add
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}

export default ColumnModal;
