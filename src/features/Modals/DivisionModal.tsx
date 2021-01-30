import React from "react";
import { Dialog, useTheme, DialogTitle, Box, Button, TextField, CircularProgress } from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { createDivison, deleteAModelDivison, updateAModelDivison, IDivison } from "../../api/division";

const schema = Yup.object().shape({
    name: Yup.string().required(),
});

export const DivisionModal = ({
    open,
    onClose,
    model,
    itemId,
    data,
    onDone,
}: {
    open: boolean;
    onClose: () => void;
    model: string;
    itemId: string;
    data?: IDivison;
    onDone?: () => void;
}) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {data?.id ? "Edit" : "Add"} a Division for {model} {itemId}
            </DialogTitle>
            <Box m={3}>
                <Formik
                    initialValues={data?.id ? data : { name: "" }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (data?.id) {
                            updateAModelDivison(data?.id, values).then((d: any) => {
                                console.log(d);
                                onDone && onDone();
                                setSubmitting(false);
                                onClose();
                            });
                        } else {
                            createDivison(itemId, values.name).then((d: any) => {
                                console.log(d);
                                onDone && onDone();
                                setSubmitting(false);
                                onClose();
                            });
                        }
                    }}
                >
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <TextField
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.name && touched.name)}
                                helperText={errors.name && touched.name}
                                value={values.name}
                                label="name"
                                fullWidth
                            />

                            <Box my={2} textAlign="center">
                                <Button type="submit" color="primary" disabled={isSubmitting} variant="contained">
                                    Save Note
                                    {isSubmitting && <CircularProgress style={{ margin: "0 0.5em" }} />}
                                </Button>
                                {data?.id && (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        style={{ margin: "0 1em", background: theme.palette.error.main }}
                                        onClick={() => {
                                            if (data?.id) {
                                                deleteAModelDivison(data.id)
                                                    .then((d: any) => {
                                                        onClose();
                                                        onDone && onDone();
                                                    })
                                                    .catch((e) => console.log(e));
                                            }
                                        }}
                                    >
                                        Delete this note
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};
