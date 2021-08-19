import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";

import Dialog from "../../app/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";

import TextField from "../../app/TextField";
import { FieldSelect } from "../../app/Inputs";

import { getCustomers } from "../../api/customer";
import { getContacts } from "../../api/contact";
import { getProjects } from "../../api/project";
import { getAllEmployees } from "../../api/employee";
import { getQuotes } from "../../api/quote";
import { IActivity } from "../../api/activity";
import { fetcher } from "../../api";

const schema = Yup.object().shape({
    name: Yup.string().required(),
});
export default function ActivityModal({
    open,
    onClose,
    activity,
}: {
    open: boolean;
    onClose: () => void;
    activity: IActivity;
}) {
    const handleSubmit = async (data: IActivity, { setSubmitting }: { setSubmitting: any }) => {
        console.log(data);
    };

    return (
        <Dialog open={open} onClose={onClose} title="Activity overview">
            <Box p={2}>
                <Formik initialValues={activity} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <Box display="grid" gridTemplateColumns="auto auto auto" gridColumnGap={10} gridRowGap={5}>
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
                                    request={getCustomers}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    label="Client"
                                    name="ClientId"
                                    value={values.ClientId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ width: "100%" }}
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
                                    style={{ width: "100%" }}
                                />
                                <FieldSelect
                                    label="ActivityPriorityId"
                                    name="ActivityPriorityId"
                                    request={() => fetcher("/activitypriority")}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    value={values.ActivityPriorityId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ width: "100%" }}
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
                                    style={{ width: "100%" }}
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
                                <FieldSelect
                                    label="Quote"
                                    name="QuoteId"
                                    request={getQuotes}
                                    itemTitleField="number"
                                    itemValueField="id"
                                    value={values.QuoteId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ width: "100%" }}
                                />
                                <FieldSelect
                                    label="ActivityCategoryId"
                                    name="ActivityCategoryId"
                                    request={() => fetcher("/activitycategory")}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    value={values.ActivityCategoryId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ width: "100%" }}
                                />
                                <FieldSelect
                                    label="ActivityStatusId"
                                    name="ActivityStatusId"
                                    request={() => fetcher("/activitystatus")}
                                    itemTitleField="name"
                                    itemValueField="id"
                                    value={values.ActivityStatusId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ width: "100%" }}
                                />
                            </Box>
                            <Box mt={1} display="grid" gridTemplateColumns="auto auto auto" gridColumnGap={10}>
                                <FormControlLabel
                                    name="allDayActivity"
                                    control={<CheckBox />}
                                    label="All dat activity"
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
                                    name="doNotShowOnCalendar"
                                    control={<CheckBox />}
                                    label="Do not show on calendar"
                                    checked={values.doNotShowOnCalendar}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
}
