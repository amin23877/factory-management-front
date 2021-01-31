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

import { getPhoneTypes } from "../../api/phoneType";
import { createAModelPhone, deleteAModelPhone, updateAModelPhone, IPhone } from "../../api/phone";

const schema = Yup.object().shape({
    ext: Yup.string().required(),
    phone: Yup.string().required(),
});

export const PhoneModal = ({
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
    data?: IPhone;
    onDone?: () => void;
}) => {
    const theme = useTheme();
    const [phoneTypes, setPhoneTypes] = useState([]);

    useEffect(() => {
        if (open) {
            getPhoneTypes()
                .then((d) => setPhoneTypes(d))
                .catch((e) => console.log(e));
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {data?.id ? "Edit" : "Add"} a Phone to {model} {itemId}
            </DialogTitle>
            <Box m={3}>
                <Formik
                    initialValues={data?.id ? data : { phone: "", ext: "", main: false, PhoneTypeId: 0 }}
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (data?.id) {
                            updateAModelPhone(data?.id, values)
                                .then((d: any) => {
                                    console.log(d);
                                    onDone && onDone();
                                    setSubmitting(false);
                                    onClose();
                                })
                                .catch((e) => console.log(e));
                        } else {
                            createAModelPhone("client", itemId, values)
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
                            <Box display="flex" alignItems="center">
                                <TextField
                                    name="ext"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.ext && touched.ext)}
                                    helperText={errors.ext && touched.ext}
                                    value={values.ext}
                                    label="extension"
                                    fullWidth
                                />
                                <TextField
                                    name="phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(errors.phone && touched.phone)}
                                    helperText={errors.phone && touched.phone}
                                    value={values.phone}
                                    label="phone"
                                    fullWidth
                                />
                            </Box>

                            <BaseSelect
                                fullWidth
                                name="PhoneTypeId"
                                value={values.PhoneTypeId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.PhoneTypeId && touched.PhoneTypeId)}
                            >
                                {phoneTypes &&
                                    phoneTypes.map((pt: any) => (
                                        <MenuItem key={pt.id} value={pt.id}>
                                            {pt.name}
                                        </MenuItem>
                                    ))}
                            </BaseSelect>

                            <FormControlLabel name="main" onChange={handleChange} label="Is this phone main?" control={<Checkbox />} />

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
                                                deleteAModelPhone(data.id)
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
