import React, { Fragment, useCallback, useRef, useState } from "react";
import { Box, Slider, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";

import Button from "../../app/Button";
import DateTimePicker from "../../app/DateTimePicker";
import TextField from "../../app/TextField";
import { FieldSelect } from "../../app/Inputs";

import { getAllEmployees } from "../../api/employee";
import { mutate } from "swr";

import { createProject, IProject, updateProject, deleteProject } from "../../api/engineeringProject";
import { TaskModal } from "./Modals";

interface IprojectModal {
    project?: IProject;
    onClose: () => void;
    task?: any;
}
interface ITaskModal {
    ProjectId: IProject;
    onClose: () => void;
    task: any;
}

export const General = ({ onClose, ProjectId, task }: ITaskModal) => {
    const deleteDocument = useCallback(async () => {
        try {
            if (task && task.id) {
                await deleteProject(task.id);
                mutate(`/engineering/project`);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        const d = new Date(values.start);
        values.start = d.getTime();
        if (task && task.id) {
            updateProject(task.id, values)
                .then((d) => {
                    mutate(`/engineering/project`);
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            const data = { ...values, ProjectId: ProjectId };
            createProject(data)
                .then((d) => {
                    setSubmitting(false);
                    mutate(`/engineering/project`);
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Formik initialValues={task ? task : ({} as any)} onSubmit={handleSubmit}>
            {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                <Form style={{ marginBottom: "20px" }}>
                    <Box m={3} display="flex">
                        <Box style={{ flex: 1 }}>
                            <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                                <TextField
                                    value={values.name}
                                    name="name"
                                    label="task"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FieldSelect
                                    label="Employee"
                                    name="EmployeeId"
                                    request={getAllEmployees}
                                    itemTitleField="username"
                                    itemValueField="id"
                                    value={values.EmployeeId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ width: "100%" }}
                                />
                                <DateTimePicker
                                    value={values.start}
                                    name="start"
                                    label="start"
                                    onChange={(date) => setFieldValue("start", date)}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    fullWidth
                                    type="number"
                                    style={{ marginBottom: "10px" }}
                                    value={values.days}
                                    name="days"
                                    label="days"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    fullWidth
                                    value={values.note}
                                    name="note"
                                    label="note"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {task && (
                                    <Fragment>
                                        <Box style={{ gridColumnEnd: "span 2" }}>
                                            <Typography id="discrete-slider" gutterBottom>
                                                Done %
                                            </Typography>
                                            <Slider
                                                aria-labelledby="discrete-slider"
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={100}
                                                name="done"
                                                value={values.done}
                                                onChange={(event, value) => setFieldValue("done", value)}
                                                onBlur={handleBlur}
                                            />
                                        </Box>
                                    </Fragment>
                                )}
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

export const NewTask = ({ onClose, project }: IprojectModal) => {
    const [addTask, setAddTask] = useState(false);

    const deleteDocument = useCallback(async () => {
        try {
            if (project && project.id) {
                await deleteProject(project.id);
                mutate(`/engineering/project`);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSubmit = useCallback((values, { setSubmitting }) => {
        const d = new Date(values.start);
        values.start = d.getTime();
        if (project && project.id) {
            updateProject(project.id, values)
                .then((d) => {
                    mutate(`/engineering/project`);
                    onClose();
                })
                .catch((e) => console.log(e))
                .finally(() => setSubmitting(false));
        } else {
            createProject(values)
                .then((d) => {
                    setSubmitting(false);
                    mutate(`/engineering/project`);
                    onClose();
                })
                .catch((e) => console.log(e));
        }
    }, []);

    return (
        <Fragment>
            {project && project.id && (
                <TaskModal
                    open={addTask}
                    onClose={() => {
                        setAddTask(false);
                    }}
                    project={project}
                />
            )}
            <Formik initialValues={project ? project : ({} as any)} onSubmit={handleSubmit}>
                {({ values, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
                    <Form style={{ marginBottom: "20px" }}>
                        <Box m={3} display="flex">
                            <Box style={{ flex: 1 }}>
                                <Box m={3} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridColumnGap={10}>
                                    <TextField
                                        value={values.name}
                                        name="name"
                                        label="task"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FieldSelect
                                        label="Employee"
                                        name="EmployeeId"
                                        request={getAllEmployees}
                                        itemTitleField="username"
                                        itemValueField="id"
                                        value={values.EmployeeId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ width: "100%" }}
                                    />
                                    <DateTimePicker
                                        value={values.start}
                                        name="start"
                                        label="start"
                                        onChange={(date) => setFieldValue("start", date)}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        fullWidth
                                        type="number"
                                        style={{ marginBottom: "10px" }}
                                        value={values.days}
                                        name="days"
                                        label="days"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        style={{ gridColumnEnd: "span 2" }}
                                        fullWidth
                                        value={values.note}
                                        name="note"
                                        label="note"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {project && (
                                        <Fragment>
                                            <Box style={{ gridColumnEnd: "span 2" }}>
                                                <Typography id="discrete-slider" gutterBottom>
                                                    Done %
                                                </Typography>
                                                <Slider
                                                    aria-labelledby="discrete-slider"
                                                    valueLabelDisplay="auto"
                                                    min={0}
                                                    max={100}
                                                    name="done"
                                                    value={values.done}
                                                    onChange={(event, value) => setFieldValue("done", value)}
                                                    onBlur={handleBlur}
                                                />
                                            </Box>
                                            <Box
                                                style={{
                                                    gridColumnEnd: "span 2",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Button onClick={() => setAddTask(true)} kind="add">
                                                    Add Task
                                                </Button>
                                            </Box>
                                        </Fragment>
                                    )}
                                </Box>
                                <Box style={{ display: "flex", width: "50%", margin: "0px 25%" }}>
                                    <Button
                                        type="submit"
                                        kind={project ? "edit" : "add"}
                                        disabled={isSubmitting}
                                        style={{ flex: 1 }}
                                    >
                                        Save
                                    </Button>
                                    {project && (
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
        </Fragment>
    );
};
