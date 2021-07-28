import React, { useCallback } from "react";
import { Box, FormControlLabel, Checkbox, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";

import useSWR, { mutate } from "swr";

import DateTimePicker from "../../../app/DateTimePicker";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { createFlag, updateFlag, deleteFlag } from "../../../api/qcFlag";
import { useEffect } from "react";

interface IFlag {
    flag?: any;
    itemId: string;
    onClose: () => void;
}

export const General = ({ onClose, flag, itemId }: IFlag) => {
    useEffect(() => {
        console.log(flag);
    }, [flag]);

    const deleteDocument = useCallback(async () => {
        try {
            if (flag && flag.id) {
                await deleteFlag(flag.id);
                await mutate(`/qcflag?ItemId=${itemId}`);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        const newDate = new Date(values.date);
        const date = newDate.getTime();
        if (flag && flag.id) {
            updateFlag(flag.id, { date, ...values, ItemId: itemId })
                .then((d) => {
                    mutate(`/qcflag?ItemId=${itemId}`);
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createFlag({ ItemId: itemId, ...values })
                .then((d) => {
                    setSubmitting(false);
                    mutate(`/qcflag?ItemId=${itemId}`);
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={flag ? flag : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={"1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridGap={10}>
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.number}
                                name="number"
                                label="Flag ID"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.section}
                                name="section"
                                label="Section"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <TextField
                                style={{ gridColumnEnd: "span 4" }}
                                value={values.description}
                                name="description"
                                label="Description"
                                multiline
                                rows={4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Box style={{ gridColumnEnd: "span 4", margin: "1px auto" }}>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    kind={flag ? "edit" : "add"}
                                    style={{ alignSelf: "center" }}
                                >
                                    {flag ? "save" : "add"}
                                </Button>
                                {flag && (
                                    <Button
                                        onClick={deleteDocument}
                                        kind="delete"
                                        disabled={isSubmitting}
                                        style={{ alignSelf: "center", marginLeft: "10px" }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
