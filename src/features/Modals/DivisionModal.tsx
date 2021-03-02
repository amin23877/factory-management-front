import React from "react";
import { Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Dialog from "../../app/Dialog";

import { createDivison, deleteAModelDivison, updateAModelDivison, IDivison } from "../../api/division";

const schema = Yup.object().shape({
    name: Yup.string().required(),
});

export const DivisionModal = ({
    open,
    onClose,
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
    return (
        <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose} title={`${data?.id ? "Edit" : "Add"} a Division`}>
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
                                style={{ width: "100%" }}
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(errors.name && touched.name)}
                                helperText={errors.name && touched.name}
                                value={values.name}
                                label="name"
                                fullWidth
                            />

                            <Box my={2} textAlign="center" display="flex">
                                <Button type="submit" style={{ flex: 1 }} disabled={isSubmitting} kind={data ? "edit" : "add"}>
                                    Save
                                </Button>
                                {data?.id && (
                                    <Button
                                        kind="delete"
                                        style={{ margin: "0 1em" }}
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
