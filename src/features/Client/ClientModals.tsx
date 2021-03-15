import React from "react";
import { Box, FormControlLabel, FormLabel, RadioGroup, Radio, FormControl } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";

import { addClient, AddClientInit, getClients } from "../../api/client";
import { getClientTypes } from "../../api/clientType";

export const AddClientModal = ({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) => {
    const schema = Yup.object().shape({
        ClientTypeId: Yup.number().required().notOneOf([0]),
    });

    const { errors, touched, values, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
        initialValues: AddClientInit,
        validationSchema: schema,
        onSubmit: async (data: any, { setSubmitting }) => {
            // console.log(data);
            try {
                const resp = await addClient(data);
                if (resp.id) {
                    console.log(resp);
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

    let form_inputs = [];
    // refferedby	prospect	size	parent	defaultbilling	account	allowed	clienttypeid
    const specials = ["prospect", "size", "parent", "ClientTypeId"];
    let key: keyof typeof values;
    for (key in values) {
        if (!specials.includes(key)) {
            form_inputs.push(
                <TextField
                    style={{ flex: "1 0 40%", marginRight: 5, marginLeft: 5 }}
                    key={key}
                    fullWidth
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
        <Dialog open={open} onClose={onClose} maxWidth="sm" title="Add new client">
            <Box p={2} display="flex" alignItems="center">
                <form onSubmit={handleSubmit}>
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                        {form_inputs}
                    </Box>

                    <FieldSelect
                        request={getClients}
                        itemTitleField="name"
                        itemValueField="id"
                        name="parent"
                        label="Parent"
                        fullWidth
                        onChange={handleChange}
                        value={values.parent}
                        error={Boolean(errors.parent)}
                        style={{ width: "100%" }}
                    />
                    <FieldSelect
                        style={{ width: "100%" }}
                        request={getClientTypes}
                        itemTitleField="name"
                        itemValueField="id"
                        name="ClientTypeId"
                        label="Client Type"
                        fullWidth
                        onChange={handleChange}
                        value={values.ClientTypeId}
                        error={Boolean(errors.ClientTypeId)}
                    />

                    <FormControl style={{ margin: "0.5em", display: "flex" }}>
                        <FormLabel style={{ display: "inline" }}>Size</FormLabel>
                        <RadioGroup row name="size" value={values.size} onChange={handleChange}>
                            <FormControlLabel value="small" control={<Radio />} label="Small" />
                            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                            <FormControlLabel value="large" control={<Radio />} label="Large" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl style={{ margin: "0.5em" }}>
                        <FormLabel>Prospect</FormLabel>
                        <RadioGroup row name="prospect" value={values.prospect} onChange={handleChange}>
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    <Box textAlign="center" my={2}>
                        <Button disabled={isSubmitting} kind="add" type="submit" fullWidth={true}>
                            save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Dialog>
    );
};
