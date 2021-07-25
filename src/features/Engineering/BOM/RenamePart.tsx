import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../../app/Dialog";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import Toast from "../../../app/Toast";
import { renameMatricePart } from "../../../api/matrice";

const schema = Yup.object().shape({
    newName: Yup.string().required(),
});
function RenamePart({
    initialValue,
    open,
    onClose,
    onDone,
}: {
    open: boolean;
    initialValue: { formerName: string; newName: string };
    onClose: () => void;
    onDone: (name: string) => void;
}) {
    const handleSubmit = async (d: any) => {
        try {
            await renameMatricePart(d.formerName, d.newName);
            Toast("Part changed", "success");
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
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
                        </Box>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default RenamePart;
