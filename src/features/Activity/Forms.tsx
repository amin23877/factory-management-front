import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";

import TextField from "../../app/TextField";
import { FieldSelect } from "../../app/Inputs";
import Button from "../../app/Button";

import { getClients } from "../../api/client";
import { getContacts } from "../../api/contact";
import { getProjects } from "../../api/project";
import { getAllEmployees } from "../../api/employee";
import { getQuotes } from "../../api/quote";
import { IActivity, createActivity, updateActivity } from "../../api/activity";
import { baseGet } from "../../api";

export default function AddActivityForm({ init, onDone }: { init: IActivity; onDone: () => void }) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
    });

    const handleSubmit = async (data: IActivity, { setSubmitting }: { setSubmitting: any }) => {
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
        <Formik initialValues={init} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                    <Box>
                        <TextField
                            error={Boolean(errors.name && touched.name)}
                            name="name"
                            label="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField name="subject" label="subject" value={values.subject} onChange={handleChange} onBlur={handleBlur} />
                        <TextField name="location" label="location" value={values.location} onChange={handleChange} onBlur={handleBlur} />
                        <TextField name="notes" label="notes" value={values.notes} onChange={handleChange} onBlur={handleBlur} />
                        <TextField
                            type="date"
                            style={{ width: 243 }}
                            name="startTime"
                            label="Start time"
                            value={values.startTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            type="date"
                            style={{ width: 243 }}
                            name="endTime"
                            label="End time"
                            value={values.endTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FieldSelect
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
                            label="Quote"
                            name="QuoteId"
                            request={getQuotes}
                            itemTitleField="number"
                            itemValueField="id"
                            value={values.QuoteId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {/* <ArraySelect
                                label="Opportunity"
                                name="OpportunityId"
                                items={[1, 2]}
                                value={values.OpportunityId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            /> */}
                        <FieldSelect
                            label="ActivityCategoryId"
                            name="ActivityCategoryId"
                            request={() => baseGet("/activitycategory")}
                            itemTitleField="name"
                            itemValueField="id"
                            value={values.ActivityCategoryId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FieldSelect
                            label="ActivityStatusId"
                            name="ActivityStatusId"
                            request={() => baseGet("/activitystatus")}
                            itemTitleField="name"
                            itemValueField="id"
                            value={values.ActivityStatusId}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                        />
                        <Box>
                            <FormControlLabel
                                name="allDayActivity"
                                control={<CheckBox />}
                                label="All dat activity"
                                checked={values.allDayActivity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormControlLabel
                                name="doNotShowOnCalendar"
                                control={<CheckBox />}
                                label="Do not show on calendar"
                                checked={values.doNotShowOnCalendar}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
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
                            <FormControlLabel
                                name="notifyOnDay"
                                control={<CheckBox />}
                                label="Notify on day"
                                checked={values.notifyOnDay}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Box>
                        <Box my={2}>
                            <Button kind="add" type="submit">
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
