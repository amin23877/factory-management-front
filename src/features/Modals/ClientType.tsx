import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, Box, MenuItem, Button, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Gradients } from "../../theme";
import Snack from "../../app/Snack";
import { BaseSelect } from "../../app/Inputs";
import { addClientType, deleteClientType, editClientType, getClientTypes } from "../../api/clientType";

const AddCTForm = ({ onDone }: { onDone: () => void }) => {
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const schema = Yup.object().shape({
        name: Yup.string().required().min(3),
    });

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            const resp = await addClientType(values.name);
            if (resp) {
                // console.log(resp);
                onDone();
                setShowSnack(true);
                setMsg("Success");
            }
            setSubmitting(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box>
            <Snack open={showSnack} onClose={() => setShowSnack(false)} severity="info">
                {msg}
            </Snack>

            <h3>Add client type</h3>
            <Formik initialValues={{ name: "" }} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                    <Form>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <TextField
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.name && touched.name)}
                                helperText={errors.name}
                                variant="outlined"
                                placeholder="Name..."
                                fullWidth
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                style={{ background: Gradients.success }}
                            >
                                add
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

const EditCTForm = ({ clientTypes, onDone }: { clientTypes: any[]; onDone: () => void }) => {
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const schema = Yup.object().shape({
        id: Yup.string().required(),
        name: Yup.string().required().min(3),
    });

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            if (values.name !== values.id) {
                const resp = await editClientType(values.id, values.name);
                if (resp) {
                    onDone();
                }
                setShowSnack(true);
                setMsg("Success");
            } else {
                setShowSnack(true);
                setMsg("Error, Choose new name if you want to edit...");
            }
            setSubmitting(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box mx={1}>
            <Snack open={showSnack} onClose={() => setShowSnack(false)} severity="info">
                {msg}
            </Snack>

            <h3>Edit client type</h3>
            <Formik initialValues={{ id: 0, name: "" }} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, setFieldValue, handleBlur, isSubmitting }) => (
                    <Form>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Box display="flex">
                                <BaseSelect
                                    name="id"
                                    value={values.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.id && touched.id)}
                                >
                                    {clientTypes.map((item: any) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </BaseSelect>
                                <TextField
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.name && touched.name)}
                                    helperText={errors.name}
                                    variant="outlined"
                                    placeholder="New name..."
                                />
                            </Box>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                style={{ background: Gradients.warning }}
                            >
                                save
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

const DeleteCTForm = ({ clientTypes, onDone }: { clientTypes: any[]; onDone: () => void }) => {
    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const schema = Yup.object().shape({
        id: Yup.string().required(),
    });

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            const resp = await deleteClientType(values.id);
            if (resp) {
                // console.log(resp);
                onDone();
                setShowSnack(true);
                setMsg("Success");
            }
            setSubmitting(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box>
            <Snack open={showSnack} onClose={() => setShowSnack(false)} severity="info">
                {msg}
            </Snack>

            <h3>Add client type</h3>
            <Formik initialValues={{ id: "" }} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                    <Form>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <BaseSelect
                                name="id"
                                value={values.id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.id && touched.id)}
                            >
                                {clientTypes.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </BaseSelect>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                style={{ background: Gradients.error }}
                            >
                                remove
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export const ClientTypeModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [clientTypes, setClientTypes] = useState([]);

    const refreshCTs = async () => {
        try {
            const resp = await getClientTypes();
            // console.log(resp);

            setClientTypes(resp);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshCTs();
    }, []);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Client types</DialogTitle>
            <Box p={1} display="flex" justifyContent="space-around" alignItems="center">
                <AddCTForm onDone={refreshCTs} />

                <EditCTForm clientTypes={clientTypes} onDone={refreshCTs} />

                <DeleteCTForm clientTypes={clientTypes} onDone={refreshCTs} />
            </Box>
        </Dialog>
    );
};
