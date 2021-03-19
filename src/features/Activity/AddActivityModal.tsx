import React from "react";
import { makeStyles } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";

import TextField from "../../app/TextField";
import { FieldSelect } from "../../app/Inputs";
import Button from "../../app/Button";

import { ActivityInit as init } from "../../api/activity";

import Dialog from "../../app/Dialog";

import { getClients } from "../../api/client";
import { getContacts } from "../../api/contact";
import { getProjects } from "../../api/project";
import { getAllEmployees } from "../../api/employee";
import { getQuotes } from "../../api/quote";
import { IActivity, createActivity, updateActivity } from "../../api/activity";
import { baseGet } from "../../api";

const useStyles = makeStyles({
    fieldCont: (props: any) => ({
        display: props.open ? "flex" : "inline",
        justifyContent: "space-between",
        margin: "0 0.5em",
    }),
});

export default function AddActivityModal({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
    });

    const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            if (init && init?.id) {
                const resp = await updateActivity(init.id, data);
                if (resp) {
                    onDone();
                }
            } else {
                const resp = await createActivity(data);
                if (resp) {
                    onDone();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title="Add new activity" maxWidth="sm">
            <Box m={3}>
                <Formik initialValues={init} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <Box>
                                <Box display="grid" gridTemplateColumns="auto auto auto" gridColumnGap={5}>
                                    <TextField
                                        error={Boolean(errors.name && touched.name)}
                                        name="name"
                                        label="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        name="subject"
                                        label="subject"
                                        value={values.subject}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        name="location"
                                        label="location"
                                        value={values.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        name="notes"
                                        label="notes"
                                        value={values.notes}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        type="date"
                                        name="startTime"
                                        label="Start time"
                                        value={values.startTime}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        type="date"
                                        name="endTime"
                                        label="End time"
                                        value={values.endTime}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FieldSelect
                                        style={{ width: "100%" }}
                                        request={getClients}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        label="Client"
                                        name="ClientId"
                                        value={values.ClientId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <FieldSelect
                                        style={{ width: "100%" }}
                                        label="Contact"
                                        name="ContactId"
                                        request={getContacts}
                                        itemTitleField="lastName"
                                        itemValueField="id"
                                        value={values.ContactId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FieldSelect
                                        style={{ width: "100%" }}
                                        label="Project"
                                        name="ProjectId"
                                        request={getProjects}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        value={values.ProjectId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FieldSelect
                                        style={{ width: "100%" }}
                                        label="Employee"
                                        name="EmployeeId"
                                        request={getAllEmployees}
                                        itemTitleField="username"
                                        itemValueField="id"
                                        value={values.EmployeeId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FieldSelect
                                        style={{ width: "100%" }}
                                        label="Quote"
                                        name="QuoteId"
                                        request={getQuotes}
                                        itemTitleField="number"
                                        itemValueField="id"
                                        value={values.QuoteId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FieldSelect
                                        style={{ width: "100%" }}
                                        label="ActivityCategoryId"
                                        name="ActivityCategoryId"
                                        request={() => baseGet("/activitycategory")}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        value={values.ActivityCategoryId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <FieldSelect
                                        label="ActivityStatusId"
                                        name="ActivityStatusId"
                                        request={() => baseGet("/activitystatus")}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        value={values.ActivityStatusId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ flex: 1, marginRight: 5 }}
                                    />
                                    <FieldSelect
                                        label="ActivityPriorityId"
                                        name="ActivityPriorityId"
                                        request={() => baseGet("/activitypriority")}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        value={values.ActivityPriorityId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ flex: 1 }}
                                    />
                                </Box>
                                <Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <FormControlLabel
                                            name="allDayActivity"
                                            control={<CheckBox />}
                                            label="All day activity"
                                            checked={values.allDayActivity}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <FormControlLabel
                                            name="notifyOnDay"
                                            control={<CheckBox />}
                                            label="Notify on day"
                                            checked={values.notifyOnDay}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <FormControlLabel
                                            name="recurring"
                                            control={<CheckBox />}
                                            label="Recurring"
                                            checked={values.recurring}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <FormControlLabel
                                            name="notifyNow"
                                            control={<CheckBox />}
                                            label="Notify now"
                                            checked={values.notifyNow}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Box>
                                    <FormControlLabel
                                        name="doNotShowOnCalendar"
                                        control={<CheckBox />}
                                        label="Do not show on calendar"
                                        checked={values.doNotShowOnCalendar}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                                <Box my={2}>
                                    <div style={{ display: "flex", width: "100%", alignItems: "flex-end" }}>
                                        <Button
                                            kind="add"
                                            type="submit"
                                            style={
                                                open
                                                    ? { width: "100%" }
                                                    : {
                                                          marginLeft: "auto",
                                                          marginRight: "auto",
                                                          width: "40%",
                                                          marginBottom: "20px",
                                                          marginTop: "20px",
                                                          paddingTop: "8px",
                                                          paddingBottom: "8px",
                                                      }
                                            }
                                        >
                                            {open ? "Add" : "Save"}
                                        </Button>
                                    </div>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
