import React from "react";
import { Box, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox, FormControl } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { FieldSelect } from "../../app/Inputs";
import { GeneralForm } from "./Forms";

import { addClient, AddClientInit, getClients } from "../../api/client";
import { getClientTypes } from "../../api/clientType";

export const AddClientModal = ({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) => {
    const schema = Yup.object().shape({
        ClientTypeId: Yup.string().required().notOneOf([0]),
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

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" title="Add new client">
            <Box p={2} display="flex" alignItems="center">
                <form onSubmit={handleSubmit}>
                    <GeneralForm values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />
                    <Box display="flex" justifyContent="space-between">
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
                            style={{ width: "100%", marginRight: "3.5px" }}
                        />
                        <FieldSelect
                            style={{ width: "100%", marginLeft: "3.5px" }}
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
                    </Box>
                    <FormControl style={{ margin: "0.5em", display: "flex" }}>
                        <FormLabel style={{ display: "inline" }}>Size</FormLabel>
                        <RadioGroup row name="size" value={values.size} onChange={handleChange}>
                            <FormControlLabel value="small" control={<Radio />} label="Small" />
                            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                            <FormControlLabel value="large" control={<Radio />} label="Large" />
                        </RadioGroup>
                    </FormControl>

                    <FormControlLabel
                        checked={values.prospect}
                        label="prospect"
                        name="prospect"
                        onChange={handleChange}
                        control={<Checkbox />}
                    />

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
