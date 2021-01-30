import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    Box,
    MenuItem,
    Button,
    TextField,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
} from "@material-ui/core";
import { useFormik } from "formik";

import { Gradients } from "../../theme";
import { BaseSelect } from "../../app/Inputs";
import { addClient, AddClientInit, getClients } from "../../api/client";
import { getClientTypes } from "../../api/clientType";

export const AddClientModal = ({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) => {
    const [clientTypes, setClientTypes] = useState([]);
    const [clients, setClients] = useState([]);

    const refreshClients = async () => {
        try {
            setClients(await getClients());
        } catch (error) {
            console.log(error);
        }
    };

    const refreshClientTypes = async () => {
        try {
            setClientTypes(await getClientTypes());
        } catch (error) {
            console.log(error);
        }
    };

    const { errors, touched, values, handleChange, handleBlur, setFieldValue, isSubmitting, handleSubmit } = useFormik({
        initialValues: AddClientInit,
        onSubmit: async (data: any, { setSubmitting }) => {
            // console.log(data);
            try {
                const resp = await addClient(data);
                if (resp.id) {
                    console.log(resp);
                    refreshClients();
                    onDone();
                    onClose();
                } else {
                    console.log(resp);
                }
            } catch (error) {
                console.log(error);
            }
            setSubmitting(false);
        },
    });

    useEffect(() => {
        refreshClientTypes();
        refreshClients();
    }, [open]);

    let form_inputs = [];
    // refferedby	prospect	size	parent	defaultbilling	account	allowed	clienttypeid
    const specials = ["prospect", "size", "parent", "ClientTypeId"];
    let key: keyof typeof values;
    for (key in values) {
        if (!specials.includes(key)) {
            form_inputs.push(
                <TextField
                    key={key}
                    fullWidth
                    variant="outlined"
                    name={key}
                    value={values[key]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors[key] && touched[key])}
                    helperText={touched[key] && errors[key] && String(errors[key])}
                    label={key}
                />
            );
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle>Add new client</DialogTitle>
            <Box p={2} display="flex" alignItems="center">
                <form onSubmit={handleSubmit}>
                    {form_inputs}

                    <FormControl fullWidth>
                        <FormLabel>Parent</FormLabel>
                        <BaseSelect fullWidth onChange={(e) => setFieldValue("parent", e.target.value)} value={values.parent}>
                            {clients &&
                                clients.map((c: any) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                        </BaseSelect>
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Client Type</FormLabel>
                        <BaseSelect fullWidth onChange={(e) => setFieldValue("ClientTypeId", e.target.value)} value={values.ClientTypeId}>
                            {clientTypes &&
                                clientTypes.map((c: any) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                        </BaseSelect>
                    </FormControl>
                    <Box display="flex" justifyContent="space-between" alignItems="start">
                        <FormControl style={{ margin: "0.5em" }}>
                            <FormLabel>Size</FormLabel>
                            <RadioGroup name="size" value={values.size} onChange={(e) => setFieldValue("size", e.target.value)}>
                                <FormControlLabel value="small" control={<Radio />} label="Small" />
                                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                <FormControlLabel value="large" control={<Radio />} label="Large" />
                            </RadioGroup>
                        </FormControl>
                        <div style={{ height: "140px", borderRight: "1px solid #bbb" }} />
                        <FormControl style={{ margin: "0.5em" }}>
                            <FormLabel>Prospect</FormLabel>
                            <RadioGroup name="prospect" value={values.prospect} onChange={(e) => setFieldValue("prospect", e.target.value)}>
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box textAlign="center" my={2}>
                        <Button
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ padding: "1em 4em", background: Gradients.success }}
                        >
                            save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Dialog>
    );
};
