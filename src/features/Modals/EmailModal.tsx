import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { FieldSelect } from "../../app/Inputs";

import { getEmailAddressTypes } from "../../api/emailAddressType";
import { createAModelEmailAddr, deleteAModelEmailAddr, updateAModelEmailAddr, IEmailAddress } from "../../api/emailAddress";

const schema = Yup.object().shape({
    email: Yup.string().required(),
    EmailTypeId: Yup.number().required().notOneOf([0]),
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
    const handleDelete = () => {
        if (data?.id) {
            deleteAModelEmailAddr(data.id)
                .then(() => {
                    onClose();
                    onDone && onDone();
                })
                .catch((e) => console.log(e));
        }
    };
    const handleSubmit = (values: any, { setSubmitting }: any) => {
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
            createAModelEmailAddr(model, itemId, values)
                .then((d: any) => {
                    console.log(d);
                    onDone && onDone();
                    setSubmitting(false);
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" title={`${data?.id ? "Edit" : "Add"} an Email to ${model}`}>
            <Box m={3}>
                <Formik initialValues={data?.id ? data : ({} as IEmailAddress)} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={8}>
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

                                <FieldSelect
                                    request={getEmailAddressTypes}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    fullWidth
                                    name="EmailTypeId"
                                    label="Email Type"
                                    value={values.EmailTypeId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.EmailTypeId && touched.EmailTypeId)}
                                />

                                <FormControlLabel
                                    name="main"
                                    onChange={handleChange}
                                    label="Main email address"
                                    checked={values.main}
                                    control={<Checkbox />}
                                />

                                <Button type="submit" disabled={isSubmitting} kind={data ? "edit" : "add"}>
                                    Save
                                </Button>
                                {data?.id && (
                                    <Button kind="delete" onClick={handleDelete}>
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
