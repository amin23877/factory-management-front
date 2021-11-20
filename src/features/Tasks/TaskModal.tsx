import React from "react";
import { Formik, Form } from "formik";
// import * as Yup from "yup";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import { Box, TextField } from "@material-ui/core";
import { createTask, deleteTasks, ITask, updateTask } from "../../api/task";
import { ArraySelect, MaterialFieldSelect } from "../../app/Inputs";
import { getTickets } from "../../api/ticket";
import { getAllEmployees } from "../../api/employee";
import TPCAutocomplete from "../TPC/autocomplete";
import DateTimePicker from "../../app/DateTimePicker";

export default function TaskModal({
    open,
    onClose,
    onDone,
    selectedTask,
}: {
    open: boolean;
    onClose: () => void;
    onDone: () => void;
    selectedTask?: ITask;
}) {
    const handleSubmit = async (d: any) => {
        // console.log(d);
        try {
            if (selectedTask) {
                const resp = await updateTask(selectedTask.id, d);
                if (resp) {
                    onDone();
                    onClose();
                }
            } else {
                const resp = await createTask(d);
                if (resp) {
                    onDone();
                    onClose();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (selectedTask) {
                const resp = await deleteTasks(selectedTask.id);
                if (resp) {
                    onDone();
                    onClose();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog title="Task" open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <Box>
                <Formik initialValues={selectedTask ? selectedTask : ({} as ITask)} onSubmit={handleSubmit}>
                    {({ values, handleChange, handleBlur, errors, setFieldValue }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap={5} gridRowGap={12}>
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    name="name"
                                    label="Task name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name}
                                    variant="outlined"
                                    size="small"
                                />
                                <ArraySelect
                                    style={{ gridColumnEnd: "span 2" }}
                                    items={["1", "2", "3", "4", "5"]}
                                    label="Priority"
                                    name="priority"
                                    value={values.priority}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {selectedTask && (
                                    <DateTimePicker
                                        name="deadline"
                                        style={{ gridColumnEnd: "span 2" }}
                                        value={values.deadline || null}
                                        onChange={(d) => setFieldValue("deadline", d?.toString())}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.deadline)}
                                        helperText={errors.deadline}
                                        size="small"
                                        placeholder="Deadline"
                                        label="Deadline"
                                    />
                                )}
                                <MaterialFieldSelect
                                    value={values.JobId}
                                    request={getTickets}
                                    getOptionLabel={(job) => job.description}
                                    getOptionValue={(job) => job.id}
                                    onChange={(e, nv) => setFieldValue("JobId", nv.id)}
                                    onBlur={handleBlur}
                                    label="Job"
                                />
                                <MaterialFieldSelect
                                    value={values.assigner}
                                    request={getAllEmployees}
                                    getOptionLabel={(emp) => emp.username}
                                    getOptionValue={(emp) => emp.id}
                                    onChange={(e, nv) => setFieldValue("assigner", nv.id)}
                                    onBlur={handleBlur}
                                    label="Assigner"
                                />
                                <MaterialFieldSelect
                                    value={values.assignee}
                                    request={getAllEmployees}
                                    getOptionLabel={(emp) => emp.username}
                                    getOptionValue={(emp) => emp.id}
                                    onChange={(e, nv) => setFieldValue("assignee", nv.id)}
                                    onBlur={handleBlur}
                                    label="Assignee"
                                />
                                <TPCAutocomplete onChange={(e, nv: any) => setFieldValue("TPCId", nv.id)} />
                                <TextField
                                    style={{ gridColumnEnd: "span 2" }}
                                    name="description"
                                    label="Task description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.description)}
                                    helperText={errors.description}
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={3}
                                />
                                {!selectedTask ? (
                                    <Button type="submit" kind="add" style={{ gridColumnEnd: "span 2" }}>
                                        Add
                                    </Button>
                                ) : (
                                    <Box>
                                        <Button type="submit" kind="edit" style={{ marginRight: 8 }}>
                                            Save
                                        </Button>
                                        <Button kind="delete" onClick={handleDelete}>
                                            Delete
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
