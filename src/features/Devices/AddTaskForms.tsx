import React, { Fragment, useCallback, useRef, useState, useMemo } from "react";
import { Box, TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { Formik, Form } from "formik";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";
import { ManufacturingStep, EvaluationStep, TestStep, FieldStep } from './AddStepForms'

import Button from "../../app/Button";
import { DateTimePicker } from "@material-ui/pickers";
import BaseDataGrid from "../../app/BaseDataGrid";
import Dialog from '../../app/Dialog'
import {
    createAManTask,
    createAEvalTask,
    createAFieldTask,
    createATestTask,
    updateAEvalTask,
    updateAFieldTask,
    updateAManTask,
    updateATestTask,
    deleteAEvalTask,
    deleteAFieldTask,
    deleteAManTask,
    deleteATestTask,
} from "./task";
import { mutate } from "swr";

interface ITaskModal {
    open: boolean;
    itemId: string;
    Task?: any;
    onDone?: () => void;
    onClose: () => void;
}


// ItemId, name, date, hours, description, priority, buildToStock, engAP 


export const Manufacturing = ({ open, onClose, itemId, onDone, Task }: ITaskModal) => {


    const [AddStep, setAddStep] = useState(false);
    const [step, setStep] = useState(false);
    const { data: manSteps } = useSWR(Task ? `/engineering/manufacturing/step?TaskId=${Task.id}` : null);

    const manCols = useMemo<GridColDef[]>(
        () => [
            { field: "number", headerName: "NO." },
            { field: "name", headerName: "Name" },
            { field: "description", headerName: "description", flex: 1 },
        ],
        []
    );

    const deleteDocument = useCallback(async () => {
        try {
            if (Task && Task.id) {
                await deleteAManTask(Task.id);
                mutate(`/engineering/manufacturing/task?ItemId=${itemId}`)
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        const newDate = new Date(values.date)
        const date = newDate.getTime()
        if (Task && Task.id) {
            updateAManTask(Task.id, values.name, date, values.hours, values.description, values.priority, values.buildToStock, values.engAP)
                .then((d) => {
                    mutate(`/engineering/manufacturing/task?ItemId=${itemId}`)
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAManTask(itemId, values.name, date, values.hours, values.description, values.priority, values.buildToStock, values.engAP)
                .then((d) => {
                    setSubmitting(false);
                    mutate(`/engineering/manufacturing/task?ItemId=${itemId}`)
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Fragment>
            {Task?.id ? <Dialog open={AddStep} onClose={() => setAddStep(false)} >
                <ManufacturingStep TaskId={Task.id} onClose={() => setAddStep(false)} />
            </Dialog> : null}
            {Task?.id ? <Dialog open={step} onClose={() => setStep(false)} >
                <ManufacturingStep TaskId={Task.id} onClose={() => setAddStep(false)} step={step} />
            </Dialog> : null}

            <Formik initialValues={Task ? Task : ({} as any)} onSubmit={handleSubmit}>
                {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                    <Form style={{ marginBottom: "20px" }}>
                        {Task ?
                            <h3 style={{ marginLeft: "20px" }}>Manufacturing</h3>
                            : null}
                        <Box m={3} display="flex" >
                            <Box style={{ flex: 1 }} >
                                <Box m={3} display="grid" gridTemplateColumns={Task ? "1fr 1fr 1fr 1fr" : "1fr 1fr"} gridGap={10} gridColumnGap={10}>
                                    <TextField
                                        style={!Task ? { gridColumnEnd: "span 2" } : {}}
                                        value={values.name}
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <TextField
                                        fullWidth
                                        style={{ marginBottom: "10px" }}
                                        value={values.priority}
                                        name="priority"
                                        label="Priority"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <TextField
                                        fullWidth
                                        style={{ marginBottom: "10px" }}
                                        value={values.hours}
                                        name="hours"
                                        label="hours"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <DateTimePicker
                                        style={!Task ? { gridColumnEnd: "span 2" } : {}}
                                        value={values.date}
                                        name="date"
                                        label="date"
                                        onChange={(date) => setFieldValue("date", date)}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        style={{ gridColumnEnd: "span 2" }}
                                        fullWidth
                                        value={values.description}
                                        name="description"
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        rows={Task ? 1 : 4}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FormControlLabel
                                        name="buildToStock"
                                        value={values.buildToStock}
                                        control={<Checkbox checked={Boolean(values.buildToStock)} />}
                                        label="Build to Stock"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FormControlLabel
                                        name="engAP"
                                        value={values.engAP}
                                        control={<Checkbox checked={Boolean(values.engAP)} />}
                                        label="Engineering Approved"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                                <Box style={{ display: "flex", width: "50%", margin: "0px 25%" }}>
                                    <Button type="submit" disabled={isSubmitting} kind={Task ? "edit" : "add"} style={{ flex: 1 }}>
                                        Save
                                    </Button>
                                    {Task && (
                                        <Fragment>

                                            <Button
                                                style={{ marginLeft: "1em" }}
                                                onClick={deleteDocument}
                                                kind="delete"
                                                disabled={isSubmitting}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => setAddStep(true)}
                                                kind="add"
                                                style={{ marginLeft: "1em" }}>
                                                Add Step
                                            </Button>
                                        </Fragment>
                                    )}
                                </Box>
                                {Task ? <Box style={{ width: "100" }}>
                                    <BaseDataGrid
                                        cols={manCols}
                                        rows={manSteps || []}
                                        onRowSelected={(d) => {
                                            setStep(d);
                                        }}
                                    />
                                </Box> : null}
                            </Box>
                        </Box>
                    </Form>
                )
                }
            </Formik >
        </Fragment>
    );
};

export const Evaluation = ({ open, onClose, itemId, onDone, Task }: ITaskModal) => {
    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (Task && Task.id) {
                await deleteAEvalTask(Task.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (Task && Task.id) {
            updateAEvalTask(Task.id, values.name, values.date, values.hours, values.description, values.priority, values.buildToStock, values.engAP)
                .then((d) => {
                    console.log(d);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAEvalTask(itemId, values.name, values.date, values.hours, values.description, values.priority, values.buildToStock, values.engAP)
                .then((d) => {
                    console.log(d);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={Task ? Task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginLeft: "20px" }}>Evaluation</h3>
                    <Box m={3} display="flex" >
                        <Box style={{ flex: 1 }} >
                            <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    value={values.name}
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    fullWidth
                                    value={values.description}
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: "10px" }}
                                    value={values.priority}
                                    name="priority"
                                    label="Priority"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: "10px" }}
                                    value={values.hours}
                                    name="hours"
                                    label="hours"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <DateTimePicker
                                    style={{ gridColumnEnd: "span 2" }}
                                    value={values.date}
                                    name="date"
                                    label="date"
                                    onChange={(date) => setFieldValue("estShipDate", date)}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    name="buildToStock"
                                    value={values.buildToStock}
                                    control={<Checkbox checked={Boolean(values.buildToStock)} />}
                                    label="Build to Stock"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    name="engAP"
                                    value={values.engAP}
                                    control={<Checkbox checked={Boolean(values.engAP)} />}
                                    label="Engineering Approved"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <Box style={{ display: "flex", width: "50%", margin: "0px 25%" }}>
                                <Button type="submit" kind={Task ? "edit" : "add"} disabled={isSubmitting} style={{ flex: 1 }}>
                                    Save
                                </Button>
                                {Task && (
                                    <Button
                                        style={{ marginLeft: "1em" }}
                                        onClick={deleteDocument}
                                        kind="delete"
                                        disabled={isSubmitting}
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

export const Test = ({ open, onClose, itemId, onDone, Task }: ITaskModal) => {
    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (Task && Task.id) {
                await deleteATestTask(Task.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (Task && Task.id) {
            updateATestTask(Task.id, values.name, values.date, values.hours, values.description, values.priority, values.buildToStock, values.engAP)
                .then((d) => {
                    console.log(d);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createATestTask(itemId, values.name, values.date, values.hours, values.description, values.priority, values.buildToStock, values.engAP)
                .then((d) => {
                    console.log(d);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={Task ? Task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginLeft: "20px" }}>Test</h3>
                    <Box m={3} display="flex" >
                        <Box style={{ flex: 1 }} >
                            <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    value={values.name}
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    fullWidth
                                    value={values.description}
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: "10px" }}
                                    value={values.priority}
                                    name="priority"
                                    label="Priority"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: "10px" }}
                                    value={values.hours}
                                    name="hours"
                                    label="hours"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <DateTimePicker
                                    style={{ gridColumnEnd: "span 2" }}
                                    value={values.date}
                                    name="date"
                                    label="date"
                                    onChange={(date) => setFieldValue("estShipDate", date)}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    name="buildToStock"
                                    value={values.buildToStock}
                                    control={<Checkbox checked={Boolean(values.buildToStock)} />}
                                    label="Build to Stock"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    name="engAP"
                                    value={values.engAP}
                                    control={<Checkbox checked={Boolean(values.engAP)} />}
                                    label="Engineering Approved"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <Box style={{ display: "flex", width: "50%", margin: "0px 25%" }}>
                                <Button type="submit" kind={Task ? "edit" : "add"} disabled={isSubmitting} style={{ flex: 1 }}>
                                    Save
                                </Button>
                                {Task && (
                                    <Button
                                        style={{ marginLeft: "1em" }}
                                        onClick={deleteDocument}
                                        kind="delete"
                                        disabled={isSubmitting}
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

export const Field = ({ open, onClose, itemId, onDone, Task }: ITaskModal) => {
    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (Task && Task.id) {
                await deleteAFieldTask(Task.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (Task && Task.id) {
            updateAFieldTask(Task.id, values.name, values.date, values.hours, values.description, values.priority, values.buildToStock, values.engAP)
                .then((d) => {
                    console.log(d);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAFieldTask(itemId, values.name, values.date, values.hours, values.description, values.priority, values.buildToStock, values.engAP)
                .then((d) => {
                    console.log(d);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={Task ? Task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginLeft: "20px" }}>Field StartUp</h3>
                    <Box m={3} display="flex" >
                        <Box style={{ flex: 1 }} >
                            <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    value={values.name}
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    fullWidth
                                    value={values.description}
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: "10px" }}
                                    value={values.priority}
                                    name="priority"
                                    label="Priority"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: "10px" }}
                                    value={values.hours}
                                    name="hours"
                                    label="hours"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <DateTimePicker
                                    style={{ gridColumnEnd: "span 2" }}
                                    value={values.date}
                                    name="date"
                                    label="date"
                                    onChange={(date) => setFieldValue("estShipDate", date)}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    name="buildToStock"
                                    value={values.buildToStock}
                                    control={<Checkbox checked={Boolean(values.buildToStock)} />}
                                    label="Build to Stock"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    name="engAP"
                                    value={values.engAP}
                                    control={<Checkbox checked={Boolean(values.engAP)} />}
                                    label="Engineering Approved"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <Box style={{ display: "flex", width: "50%", margin: "0px 25%" }}>
                                <Button type="submit" kind={Task ? "edit" : "add"} disabled={isSubmitting} style={{ flex: 1 }}>
                                    Save
                                </Button>
                                {Task && (
                                    <Button
                                        style={{ marginLeft: "1em" }}
                                        onClick={deleteDocument}
                                        kind="delete"
                                        disabled={isSubmitting}
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
