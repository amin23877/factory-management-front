import React, { useCallback, useRef, useState, useMemo } from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Formik, Form } from "formik";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";
import AddStepModal, { EditStepModal } from "./StepModal";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { DateTimePicker } from "@material-ui/pickers";
import BaseDataGrid from "../../app/BaseDataGrid";
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
} from "../../api/engTask";
import { mutate } from "swr";

interface ITaskModal {
    open: boolean;
    itemId: string;
    task?: any;
    onDone?: () => void;
    onClose: () => void;
}

export const Manufacturing = ({ open, onClose, itemId, onDone, task }: ITaskModal) => {
    const [AddStep, setAddStep] = useState(false);
    const [step, setStep] = useState(false);
    const { data: manSteps } = useSWR(task ? `/engineering/manufacturing/step?TaskId=${task.id}` : null);

    const manCols = useMemo<GridColDef[]>(
        () => [
            { field: "number", headerName: "NO." },
            { field: "name", headerName: "Name" },
            { field: "description", headerName: "description", flex: 1 },
            { field: "relatedPartNumber", headerName: "Part NO." },
        ],
        []
    );

    const deleteDocument = useCallback(async () => {
        try {
            if (task && task.id) {
                await deleteAManTask(task.id);
                mutate(`/engineering/manufacturing/task?ItemId=${itemId}`);
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
            updateAManTask(
                task.id,
                values.name,
                date,
                values.hours,
                values.description,
                values.priority,
                values.buildToStock,
                values.engAP,
                values.relatedPartNumber
            )
                .then((d) => {
                    mutate(`/engineering/manufacturing/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAManTask(
                itemId,
                values.name,
                date,
                values.hours,
                values.description,
                values.priority,
                values.buildToStock,
                values.engAP,
                values.relatedPartNumber
            )
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
        <>
            {task?.id && <AddStepModal open={AddStep} onClose={() => setAddStep(false)} taskId={task.id} tab={0} />}
            {task?.id && (
                <EditStepModal open={step} onClose={() => setStep(false)} step={step} taskId={task.id} tab={0} />
            )}
            <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
                {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                    <Form style={{ marginBottom: "20px" }}>
                        <Box display="flex">
                            <Box style={{ flex: 1 }}>
                                <Box
                                    m={3}
                                    mt={0}
                                    display="grid"
                                    gridTemplateColumns={task ? "1fr 1fr 1fr 1fr 1fr" : "1fr 1fr"}
                                    gridGap={10}
                                    gridColumnGap={10}
                                >
                                    <Box
                                        my={1}
                                        style={task ? { gridColumnEnd: "span 5" } : { gridColumnEnd: "span 2" }}
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
                                    </Box>
                                    <TextField
                                        style={!task ? { gridColumnEnd: "span 2" } : {}}
                                        value={values.name}
                                        name="name"
                                        label="Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        fullWidth
                                        style={{ marginBottom: "10px" }}
                                        value={values.priority}
                                        name="priority"
                                        label="Priority"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        fullWidth
                                        style={{ marginBottom: "10px" }}
                                        value={values.relatedPartNumber}
                                        name="relatedPartNumber"
                                        label="Part NO."
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        fullWidth
                                        style={{ marginBottom: "10px" }}
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
                                        style={!task ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 5" }}
                                        fullWidth
                                        value={values.description}
                                        name="description"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                                <Box style={{ display: "flex", width: "50%", margin: "0px 25%" }}>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        kind={task ? "edit" : "add"}
                                        style={{ flex: 1 }}
                                    >
                                        Save
                                    </Button>
                                    {task && (
                                        <>
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
                                                style={{ marginLeft: "1em" }}
                                            >
                                                Add Step
                                            </Button>
                                        </>
                                    )}
                                </Box>
                                {task ? (
                                    <Box style={{ width: "100" }}>
                                        <BaseDataGrid
                                            cols={manCols}
                                            rows={manSteps || []}
                                            onRowSelected={(d) => {
                                                setStep(d);
                                            }}
                                        />
                                    </Box>
                                ) : null}
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export const Evaluation = ({ open, onClose, itemId, onDone, task }: ITaskModal) => {
    const [AddStep, setAddStep] = useState(false);
    const [step, setStep] = useState(false);
    const { data: evalSteps } = useSWR(task ? `/engineering/eval/step?TaskId=${task.id}` : null);

    const manCols = useMemo<GridColDef[]>(
        () => [
            { field: "number", headerName: "NO." },
            { field: "name", headerName: "Name" },
            { field: "description", headerName: "description", flex: 1 },
            { field: "relatedPartNumber", headerName: "Part NO." },
        ],
        []
    );

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
            updateAEvalTask(
                task.id,
                values.name,
                date,
                values.hours,
                values.description,
                values.priority,
                values.buildToStock,
                values.engAP,
                values.relatedPartNumber
            )
                .then((d) => {
                    mutate(`/engineering/eval/task?ItemId=${itemId}`);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAEvalTask(
                itemId,
                values.name,
                date,
                values.hours,
                values.description,
                values.priority,
                values.buildToStock,
                values.engAP,
                values.relatedPartNumber
            )
                .then((d) => {
                    mutate(`/engineering/eval/task?ItemId=${itemId}`);
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <>
            {task?.id && <AddStepModal open={AddStep} onClose={() => setAddStep(false)} taskId={task.id} tab={1} />}
            {task?.id && (
                <EditStepModal open={step} onClose={() => setStep(false)} step={step} taskId={task.id} tab={1} />
            )}
            <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
                {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                    <Form style={{ marginBottom: "20px" }}>
                        <Box display="flex">
                            <Box style={{ flex: 1 }}>
                                <Box
                                    m={3}
                                    mt={0}
                                    display="grid"
                                    gridTemplateColumns={task ? "1fr 1fr 1fr 1fr 1fr" : "1fr 1fr"}
                                    gridGap={10}
                                    gridColumnGap={10}
                                >
                                    <Box
                                        my={1}
                                        px={1}
                                        style={{ gridColumnEnd: task ? "span 5" : "span 2", border: "1px dashed gray" }}
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
                                    </Box>
                                    <TextField
                                        style={!task ? { gridColumnEnd: "span 2" } : {}}
                                        value={values.name}
                                        name="name"
                                        label="Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        fullWidth
                                        style={{ marginBottom: "10px" }}
                                        value={values.priority}
                                        name="priority"
                                        label="Priority"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        fullWidth
                                        style={{ marginBottom: "10px" }}
                                        value={values.relatedPartNumber}
                                        name="relatedPartNumber"
                                        label="Part NO."
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        fullWidth
                                        style={{ marginBottom: "10px" }}
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
                                        style={!task ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 5" }}
                                        fullWidth
                                        value={values.description}
                                        name="description"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                                <Box style={{ display: "flex", width: "50%", margin: "0px 25%" }}>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        kind={task ? "edit" : "add"}
                                        style={{ flex: 1 }}
                                    >
                                        Save
                                    </Button>
                                    {task && (
                                        <>
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
                                                style={{ marginLeft: "1em" }}
                                            >
                                                Add Step
                                            </Button>
                                        </>
                                    )}
                                </Box>
                                {task ? (
                                    <Box style={{ width: "100" }}>
                                        <BaseDataGrid
                                            cols={manCols}
                                            rows={evalSteps || []}
                                            onRowSelected={(d) => {
                                                setStep(d);
                                            }}
                                        />
                                    </Box>
                                ) : null}
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export const Test = ({ open, onClose, itemId, onDone, task }: ITaskModal) => {
    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (task && task.id) {
                await deleteATestTask(task.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (task && task.id) {
            updateATestTask(
                task.id,
                values.name,
                values.date,
                values.hours,
                values.description,
                values.priority,
                values.buildToStock,
                values.engAP,
                values.relatedPartNumber
            )
                .then((d) => {
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createATestTask(
                itemId,
                values.name,
                values.date,
                values.hours,
                values.description,
                values.priority,
                values.buildToStock,
                values.engAP,
                values.relatedPartNumber
            )
                .then((d) => {
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginLeft: "20px" }}>Test</h3>
                    <Box m={3} display="flex">
                        <Box style={{ flex: 1 }}>
                            <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    value={values.name}
                                    name="name"
                                    label="Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    fullWidth
                                    value={values.description}
                                    name="description"
                                    label="Description"
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: "10px" }}
                                    value={values.hours}
                                    name="hours"
                                    label="hours"
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
                                <Button
                                    type="submit"
                                    kind={task ? "edit" : "add"}
                                    disabled={isSubmitting}
                                    style={{ flex: 1 }}
                                >
                                    Save
                                </Button>
                                {task && (
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

export const Field = ({ open, onClose, itemId, onDone, task }: ITaskModal) => {
    const fileUploader = useRef<HTMLInputElement | null>();

    const deleteDocument = useCallback(async () => {
        try {
            if (task && task.id) {
                await deleteAFieldTask(task.id);
                onDone && onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        if (task && task.id) {
            updateAFieldTask(
                task.id,
                values.name,
                values.date,
                values.hours,
                values.description,
                values.priority,
                values.buildToStock,
                values.engAP,
                values.relatedPartNumber
            )
                .then((d) => {
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createAFieldTask(
                itemId,
                values.name,
                values.date,
                values.hours,
                values.description,
                values.priority,
                values.buildToStock,
                values.engAP,
                values.relatedPartNumber
            )
                .then((d) => {
                    setSubmitting(false);
                    onDone && onDone();
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginLeft: "20px" }}>Field StartUp</h3>
                    <Box m={3} display="flex">
                        <Box style={{ flex: 1 }}>
                            <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    value={values.name}
                                    name="name"
                                    label="Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    fullWidth
                                    value={values.description}
                                    name="description"
                                    label="Description"
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: "10px" }}
                                    value={values.hours}
                                    name="hours"
                                    label="hours"
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
                                <Button
                                    type="submit"
                                    kind={task ? "edit" : "add"}
                                    disabled={isSubmitting}
                                    style={{ flex: 1 }}
                                >
                                    Save
                                </Button>
                                {task && (
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
