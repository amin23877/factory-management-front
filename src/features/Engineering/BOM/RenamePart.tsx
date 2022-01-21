import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import Confirm from "../../Modals/Confirm";

const schema = Yup.object().shape({
    newName: Yup.string().required(),
});
function RenamePart({
    initialValue,
    open,
    onClose,
    onDone,
    onDelete,
}: {
    open: boolean;
    initialValue: { formerName: string; newName: string };
    onClose: () => void;
    onDone: (data: { formerName: string; newName: string }) => void;
    onDelete: (name: string) => void;
}) {
    const [confirm, setConfirm] = useState(false);
    const handleSubmit = (d: any) => {
        onDone({ newName: d.newName, formerName: initialValue.formerName });
    };

    return (
        <>
            <Confirm
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={() => {
                    onDelete(initialValue.formerName);
                    setConfirm(false);
                }}
                text="If you delete a column(Part) all Bom Records with that name will be removed from all devices of this family"
            />
            <Dialog open={open} onClose={onClose} title="Add part">
                <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, handleChange, handleBlur }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                                <TextField
                                    disabled
                                    name="formerName"
                                    placeholder="formerName"
                                    label="formerName"
                                    value={values.formerName}
                                />
                                <TextField
                                    name="newName"
                                    placeholder="newName"
                                    label="newName"
                                    value={values.newName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.newName)}
                                />
                                <Button kind="add" type="submit">
                                    Submit
                                </Button>
                                <Button onClick={() => setConfirm(true)} kind="delete">
                                    Delete
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
}

export default RenamePart;
