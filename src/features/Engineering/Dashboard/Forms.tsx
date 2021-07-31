import React, { Fragment } from "react";
import { Box, FormControlLabel, Checkbox, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import TextField from "../../../app/TextField";
import Button from "../../../app/Button";

interface IHelpForm {
    help?: any;
    onClose: () => void;
}

export const Purchasing = ({ onClose, help }: IHelpForm) => {
    const deleteDocument = async () => {
        try {
            // if (help && help.id) {
            //     await deleteAManhelp(help.id);
            //     await mutate(`/engineering/manufacturing/help?ItemId=${itemId}`);
            //     onDone && onDone();
            //     onClose();
            // }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (values: any, { setSubmitting }: { setSubmitting: any }) => {
        if (help && help.id) {
            // updateAManhelp(help.id, {  ...values })
            //     .then((d) => {
            //         mutate(`/engineering/manufacturing/help?ItemId=${itemId}`);
            //         onDone && onDone();
            //         onClose();
            //     })
            //     .catch((e) => console.log(e))
            //     .finally(() => setSubmitting(false));
        } else {
            // createAManhelp({ ItemId: itemId, ...values })
            //     .then((d) => {
            //         setSubmitting(false);
            //         mutate(`/engineering/manufacturing/help?ItemId=${itemId}`);
            //         onDone && onDone();
            //         onClose();
            //     })
            //     .catch((e) => console.log(e));
        }
    };

    return (
        <Formik initialValues={help ? help : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={"1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={10}>
                            <Paper
                                style={{
                                    margin: "0.5em 0",
                                    padding: "0 0.5em",
                                    backgroundColor: "#eee",
                                    gridColumnEnd: "span 3",
                                }}
                            >
                                <FormControlLabel
                                    name="done"
                                    value={values.done}
                                    control={<Checkbox checked={Boolean(values.done)} />}
                                    label="Done"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    value={values.priority}
                                    name="priority"
                                    label="Priority"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="number"
                                />
                            </Paper>
                            <TextField
                                value={values.date}
                                name="date"
                                label="Date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled
                            />
                            <TextField
                                value={values.SO}
                                name="SO"
                                label="SO"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.number}
                                name="number"
                                label="Serial"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Device Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <TextField
                                value={values.DeviceID}
                                name="deviceId"
                                label="Device ID"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                style={{ gridColumnEnd: "span 3" }}
                                value={values.description}
                                name="description"
                                label="Device Description"
                                multiline
                                rows={4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.note}
                                name="note"
                                label="Note"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.flaggedItem}
                                name="flaggedItem"
                                label="Flagged Item"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Box>
                        <Box
                            style={{
                                width: "50%",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                columnGap: "15px",
                                margin: "5px auto",
                            }}
                        >
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                kind={help ? "edit" : "add"}
                                style={{ alignSelf: "center" }}
                            >
                                Save
                            </Button>
                            {help && (
                                <Button
                                    onClick={deleteDocument}
                                    kind="delete"
                                    disabled={isSubmitting}
                                    style={{ alignSelf: "center" }}
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export const FieldService = ({ onClose, help }: IHelpForm) => {
    const deleteDocument = async () => {
        try {
            // if (help && help.id) {
            //     await deleteAManhelp(help.id);
            //     await mutate(`/engineering/manufacturing/help?ItemId=${itemId}`);
            //     onDone && onDone();
            //     onClose();
            // }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (values: any, { setSubmitting }: { setSubmitting: any }) => {
        if (help && help.id) {
            // updateAManhelp(help.id, {  ...values })
            //     .then((d) => {
            //         mutate(`/engineering/manufacturing/help?ItemId=${itemId}`);
            //         onDone && onDone();
            //         onClose();
            //     })
            //     .catch((e) => console.log(e))
            //     .finally(() => setSubmitting(false));
        } else {
            // createAManhelp({ ItemId: itemId, ...values })
            //     .then((d) => {
            //         setSubmitting(false);
            //         mutate(`/engineering/manufacturing/help?ItemId=${itemId}`);
            //         onDone && onDone();
            //         onClose();
            //     })
            //     .catch((e) => console.log(e));
        }
    };

    return (
        <Formik initialValues={help ? help : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={"1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={10}>
                            <Paper
                                style={{
                                    margin: "0.5em 0",
                                    padding: "0 0.5em",
                                    backgroundColor: "#eee",
                                    gridColumnEnd: "span 3",
                                }}
                            >
                                <FormControlLabel
                                    name="done"
                                    value={values.done}
                                    control={<Checkbox checked={Boolean(values.done)} />}
                                    label="Done"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    value={values.priority}
                                    name="priority"
                                    label="Priority"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="number"
                                />
                            </Paper>
                            <TextField
                                value={values.date}
                                name="date"
                                label="Date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled
                            />
                            <TextField
                                value={values.SO}
                                name="SO"
                                label="SO"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.number}
                                name="number"
                                label="Serial"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Device Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <TextField
                                value={values.DeviceID}
                                name="deviceId"
                                label="Device ID"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                style={{ gridColumnEnd: "span 3" }}
                                value={values.description}
                                name="description"
                                label="Device Description"
                                multiline
                                rows={4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                style={{ gridColumnEnd: "span 3" }}
                                value={values.note}
                                name="note"
                                label="Note"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Box>
                        <Box
                            style={{
                                width: "50%",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                columnGap: "15px",
                                margin: "5px auto",
                            }}
                        >
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                kind={help ? "edit" : "add"}
                                style={{ alignSelf: "center" }}
                            >
                                Save
                            </Button>
                            {help && (
                                <Button
                                    onClick={deleteDocument}
                                    kind="delete"
                                    disabled={isSubmitting}
                                    style={{ alignSelf: "center" }}
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
