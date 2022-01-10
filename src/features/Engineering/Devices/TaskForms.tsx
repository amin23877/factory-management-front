import React, { useCallback, useState } from "react";
import { Box, FormControlLabel, Checkbox, Paper } from "@material-ui/core";
// import { GridColDef } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import DateTimePicker from "../../../app/DateTimePicker";
import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
// import BaseDataGrid from "../../app/BaseDataGrid";

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
} from "../../../api/engTask";
import StepTable from "./StepTable";
import { ArraySelect } from "../../../app/Inputs";
import { useEffect } from "react";
import { extractPartNames } from "../../../logic/matrix";

interface ITaskModal {
    open: boolean;
    itemId: string;
    device: any;
    task?: any;
    onDone?: () => void;
    onClose: () => void;
}

export const Manufacturing = ({ open, onClose, itemId, device, onDone, task }: ITaskModal) => {
    const { data: tableData } = useSWR(
        device["Product Family"] ? `/matrice?productfamily=${device["Product Family"]}` : null
    );

    const [parts, setParts] = useState<string[]>();

    useEffect(() => {
        if (tableData) {
            setParts(extractPartNames(tableData));
        }
    }, [open, tableData]);

    const deleteDocument = useCallback(async () => {
        try {
            if (task && task.id) {
                await deleteAManTask(task.id);
                await mutate(`/engineering/manufacturing/task?ItemId=${itemId}`);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        const newDate = new Date(values.date);
        const date = newDate.getTime();

        if (task && task.id) {
            updateAManTask(task.id, { date, ...values })
                .then((d) => {
                    mutate(`/engineering/manufacturing/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAManTask({ ItemId: itemId, ...values })
                .then((d) => {
                    setSubmitting(false);
                    mutate(`/engineering/manufacturing/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={task ? "1fr 1fr" : "1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                            <Paper
                                style={{
                                    margin: "0.5em 0",
                                    padding: "0 0.5em",
                                    backgroundColor: "#eee",
                                    gridColumnEnd: "span 2",
                                }}
                            >
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
                            </Paper>
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.priority}
                                name="priority"
                                label="Priority"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ArraySelect
                                items={parts}
                                value={values.relatedPartName}
                                name="relatedPartName"
                                label="Related part"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.hours}
                                name="hours"
                                label="hours"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <DateTimePicker
                                value={values.date}
                                name="date"
                                label="date"
                                onChange={(date) => setFieldValue("date", date)}
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
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                kind={task ? "edit" : "add"}
                                style={{ alignSelf: "center" }}
                            >
                                Save
                            </Button>
                            {task && (
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
                        {task && task.id && <StepTable type="manufacturing" taskId={task.id} />}
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export const Evaluation = ({ open, onClose, itemId, onDone, task, device }: ITaskModal) => {
    const { data: tableData } = useSWR(
        device.name.split("-")[0] ? `/matrice?productfamily=${device.name.split("-")[0]}` : null
    );

    const [parts, setParts] = useState<string[]>();

    useEffect(() => {
        if (tableData) {
            setParts(extractPartNames(tableData));
        }
    }, [open]);

    const deleteDocument = useCallback(async () => {
        try {
            if (task && task.id) {
                await deleteAEvalTask(task.id);
                mutate(`/engineering/eval/task?ItemId=${itemId}`);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        const newDate = new Date(values.date);
        const date = newDate.getTime();

        if (task && task.id) {
            updateAEvalTask(task.id, { date, ...values })
                .then((d) => {
                    mutate(`/engineering/eval/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAEvalTask({ ItemId: itemId, ...values })
                .then((d) => {
                    setSubmitting(false);
                    mutate(`/engineering/eval/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={task ? "1fr 1fr" : "1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                            <Paper
                                style={{
                                    margin: "0.5em 0",
                                    padding: "0 0.5em",
                                    backgroundColor: "#eee",
                                    gridColumnEnd: "span 2",
                                }}
                            >
                                <FormControlLabel
                                    name="engAP"
                                    value={values.engAP}
                                    control={<Checkbox checked={Boolean(values.engAP)} />}
                                    label="Engineering Approved"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Paper>
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.priority}
                                name="priority"
                                label="Priority"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ArraySelect
                                items={parts}
                                value={values.relatedPartName}
                                name="relatedPartName"
                                label="Related part"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.hours}
                                name="hours"
                                label="hours"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <DateTimePicker
                                value={values.date}
                                name="date"
                                label="date"
                                onChange={(date) => setFieldValue("date", date)}
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
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                kind={task ? "edit" : "add"}
                                style={{ alignSelf: "center" }}
                            >
                                Save
                            </Button>
                            {task && (
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
                        {task && task.id && <StepTable type="eval" taskId={task.id} />}
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export const Test = ({ open, onClose, itemId, onDone, device, task }: ITaskModal) => {
    const { data: tableData } = useSWR(
        device.name.split("-")[0] ? `/matrice?productfamily=${device.name.split("-")[0]}` : null
    );

    const [parts, setParts] = useState<string[]>();

    useEffect(() => {
        if (tableData) {
            setParts(extractPartNames(tableData));
        }
    }, [open]);

    const deleteDocument = useCallback(async () => {
        try {
            if (task && task.id) {
                await deleteATestTask(task.id);
                mutate(`/engineering/test/task?ItemId=${itemId}`);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        const newDate = new Date(values.date);
        const date = newDate.getTime();

        if (task && task.id) {
            updateATestTask(task.id, { date, ...values })
                .then((d) => {
                    mutate(`/engineering/test/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createATestTask({ ItemId: itemId, ...values })
                .then((d) => {
                    setSubmitting(false);
                    mutate(`/engineering/test/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={task ? "1fr 1fr" : "1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                            <Paper
                                style={{
                                    margin: "0.5em 0",
                                    padding: "0 0.5em",
                                    backgroundColor: "#eee",
                                    gridColumnEnd: "span 2",
                                }}
                            >
                                <FormControlLabel
                                    name="engAP"
                                    value={values.engAP}
                                    control={<Checkbox checked={Boolean(values.engAP)} />}
                                    label="Engineering Approved"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Paper>
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.priority}
                                name="priority"
                                label="Priority"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ArraySelect
                                items={parts}
                                value={values.relatedPartName}
                                name="relatedPartName"
                                label="Related part"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.hours}
                                name="hours"
                                label="hours"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <DateTimePicker
                                value={values.date}
                                name="date"
                                label="date"
                                onChange={(date) => setFieldValue("date", date)}
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
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                kind={task ? "edit" : "add"}
                                style={{ alignSelf: "center" }}
                            >
                                Save
                            </Button>
                            {task && (
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
                        {task && task.id && <StepTable type="test" taskId={task.id} />}
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export const Field = ({ open, onClose, itemId, onDone, device, task }: ITaskModal) => {
    const { data: tableData } = useSWR(
        device.name.split("-")[0] ? `/matrice?productfamily=${device.name.split("-")[0]}` : null
    );

    const [parts, setParts] = useState<string[]>();

    useEffect(() => {
        if (tableData) {
            setParts(extractPartNames(tableData));
        }
    }, [open]);

    const deleteDocument = useCallback(async () => {
        try {
            if (task && task.id) {
                await deleteAFieldTask(task.id);
                mutate(`/engineering/fieldstartup/task?ItemId=${itemId}`);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        const newDate = new Date(values.date);
        const date = newDate.getTime();

        if (task && task.id) {
            updateAFieldTask(task.id, { date, ...values })
                .then((d) => {
                    mutate(`/engineering/fieldstartup/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAFieldTask({ ItemId: itemId, ...values })
                .then((d) => {
                    setSubmitting(false);
                    mutate(`/engineering/fieldstartup/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form>
                    <Box display="grid" gridTemplateColumns={task ? "1fr 1fr" : "1fr"} gridGap={10}>
                        <Box m={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
                            <Paper
                                style={{
                                    margin: "0.5em 0",
                                    padding: "0 0.5em",
                                    backgroundColor: "#eee",
                                    gridColumnEnd: "span 2",
                                }}
                            >
                                <FormControlLabel
                                    name="engAP"
                                    value={values.engAP}
                                    control={<Checkbox checked={Boolean(values.engAP)} />}
                                    label="Engineering Approved"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Paper>
                            <TextField
                                style={{ gridColumnEnd: "span 2" }}
                                value={values.name}
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.priority}
                                name="priority"
                                label="Priority"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ArraySelect
                                items={parts}
                                value={values.relatedPartName}
                                name="relatedPartName"
                                label="Related part"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                value={values.hours}
                                name="hours"
                                label="hours"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <DateTimePicker
                                value={values.date}
                                name="date"
                                label="date"
                                onChange={(date) => setFieldValue("date", date)}
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
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                kind={task ? "edit" : "add"}
                                style={{ alignSelf: "center" }}
                            >
                                Save
                            </Button>
                            {task && (
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
                        {task && task.id && <StepTable type="fieldstartup" taskId={task.id} />}
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
