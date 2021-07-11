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
function AddPartModal({
    open,
    onClose,
    onDone,
}: {
    open: boolean;
    onClose: () => void;
    onDone: (name: string) => void;
}) {
    return (
        <Dialog open={open} onClose={onClose} title="Add part">
            <Formik initialValues={{} as { name: string }} validationSchema={schema} onSubmit={(d) => onDone(d.name)}>
                {({ values, errors, handleChange, handleBlur }) => (
                    <Form>
                        <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                            <TextField
                                name="name"
                                placeholder="name"
                                label="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.name)}
                            />
                            <Button kind="add" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default AddPartModal;
