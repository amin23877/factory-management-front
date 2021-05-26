import React from "react";
import { Box } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { GeneralForm } from "./Forms";

import { addClient, AddClientInit } from "../../api/client";

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
