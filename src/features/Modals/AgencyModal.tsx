import React, { useState, useEffect } from "react";
import {
    Dialog,
    useTheme,
    DialogTitle,
    Box,
    Button,
    TextField,
    MenuItem,
    CircularProgress,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
} from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { BaseSelect } from "../../app/Inputs";

import { createAModelAgency, deleteAModelAgency, updateAModelAgency, IAgency } from "../../api/agency";

const schema = Yup.object().shape({
    name: Yup.string().required(),
});

export const AgencyModal = ({
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
    data?: IAgency;
    onDone?: () => void;
}) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {data?.id ? "Edit" : "Add"} an Agency to {model} {itemId}
            </DialogTitle>
            <Box m={3}>
                <Formik
                    initialValues={data?.id ? data : { name: "" }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (data?.id) {
                            updateAModelAgency(data?.id, values).then((d) => {
                                console.log(d);
                                onDone && onDone();
                                setSubmitting(false);
                                onClose();
                            });
                        } else {
                            createAModelAgency(itemId, values.name).then((d) => {
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
                                                deleteAModelAgency(data.id)
                                                    .then((d) => {
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
