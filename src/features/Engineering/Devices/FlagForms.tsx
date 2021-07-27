import React, { useCallback } from "react";
import { Box, FormControlLabel, Checkbox, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";

import DateTimePicker from "../../../app/DateTimePicker";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";

interface IFlag {
    flag?: any;
    itemId: string;
    onClose: () => void;
}

export const General = ({ onClose, flag, itemId }: IFlag) => {
    const deleteDocument = useCallback(async () => {
        onClose();
        // try {
        //   if (flag && flag.id) {
        //     await deleteAManflag(flag.id);
        //     await mutate(`/engineering/manufacturing/flag?ItemId=${itemId}`);
        //     onDone && onDone();
        //     onClose();
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        onClose();
        // const newDate = new Date(values.date);
        // const date = newDate.getTime();
        // if (flag && flag.id) {
        //   updateAManflag(flag.id, { date, ...values })
        //     .then((d) => {
        //       mutate(`/engineering/manufacturing/flag?ItemId=${itemId}`);
        //       onDone && onDone();
        //       onClose();
        //     })
        //     .catch((e) => console.log(e))
        //     .finally(() => setSubmitting(false));
        // } else {
        //   createAManflag({ ItemId: itemId, ...values })
        //     .then((d) => {
        //       setSubmitting(false);
        //       mutate(`/engineering/manufacturing/flag?ItemId=${itemId}`);
        //       onDone && onDone();
        //       onClose();
        //     })
        //     .catch((e) => console.log(e));
        // }
    }, []);

    return (
        <Formik initialValues={flag ? flag : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={"1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.flagID}
                                name="flagID"
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
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.description}
                                name="description"
                                label="Description"
                                multiline
                                rows={4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Box style={{ gridColumnEnd: "span 2", margin: "1px auto" }}>
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
