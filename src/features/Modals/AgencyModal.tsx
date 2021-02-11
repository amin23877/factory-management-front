import React from "react";
import { Box, TextField } from "@material-ui/core";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
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
    return (
        <Dialog open={open} onClose={onClose} title={`${data?.id ? "Edit" : "Add"} an Agency to ${model}`}>
            <Box m={2}>
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
                                <Button type="submit" disabled={isSubmitting} kind={data ? "edit" : "add"}>
                                    Save
                                </Button>
                                {data?.id && (
                                    <Button
                                        kind="delete"
                                        style={{ margin: "0 1em" }}
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
