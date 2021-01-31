import React, { useState, useEffect } from "react";
import {
    Dialog,
    useTheme,
    DialogTitle,
    Box,
    Button,
    TextField,
    CircularProgress,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { BaseSelect } from "../../app/Inputs";

import { getEmailTypes } from "../../api/emailType";
import { createAModelEmailAddr, deleteAModelEmailAddr, updateAModelEmailAddr, IEmailAddress } from "../../api/emailAddress";

const schema = Yup.object().shape({
    email: Yup.string().required(),
});

export const EmailModal = ({
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
    data?: IEmailAddress;
    onDone?: () => void;
}) => {
    const theme = useTheme();
    const [emailTypes, setEmailTypes] = useState([]);

    useEffect(() => {
        if (open) {
            getEmailTypes()
                .then((d) => setEmailTypes(d))
                .catch((e) => console.log(e));
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {data?.id ? "Edit" : "Add"} an Email to {model} {itemId}
            </DialogTitle>
            <Box m={3}>
                <Formik
                    initialValues={data?.id ? data : { email: "", main: false, EmailTypeId: 0 }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (data?.id) {
                            updateAModelEmailAddr(data?.id, values)
                                .then((d: any) => {
                                    console.log(d);
                                    onDone && onDone();
                                    setSubmitting(false);
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        } else {
                            createAModelEmailAddr("client", itemId, values)
                                .then((d: any) => {
                                    console.log(d);
                                    onDone && onDone();
                                    setSubmitting(false);
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        }
                    }}
                >
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <TextField
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.email && touched.email)}
                                helperText={errors.email && touched.email}
                                value={values.email}
                                label="email"
                                fullWidth
                            />

                            <BaseSelect
                                fullWidth
                                name="EmailTypeId"
                                value={values.EmailTypeId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.EmailTypeId && touched.EmailTypeId)}
                            >
                                {emailTypes &&
                                    emailTypes.map((pt: any) => (
                                        <MenuItem key={pt.id} value={pt.id}>
                                            {pt.name}
                                        </MenuItem>
                                    ))}
                            </BaseSelect>

                            <FormControlLabel name="main" onChange={handleChange} label="Is this Email main?" control={<Checkbox />} />

                            <Box my={2} textAlign="center">
                                <Button type="submit" color="primary" disabled={isSubmitting} variant="contained">
                                    Save
                                    {isSubmitting && <CircularProgress style={{ margin: "0 0.5em" }} />}
                                </Button>
                                {data?.id && (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        style={{ margin: "0 1em", background: theme.palette.error.main }}
                                        onClick={() => {
                                            if (data?.id) {
                                                deleteAModelEmailAddr(data.id)
                                                    .then(() => {
                                                        onClose();
                                                        onDone && onDone();
                                                    })
                                                    .catch((e) => console.log(e));
                                            }
                                        }}
                                    >
                                        Delete
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
