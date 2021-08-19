import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";

import TextField from "../../app/TextField";
import { FieldSelect } from "../../app/Inputs";
import Button from "../../app/Button";

import { getCustomers } from "../../api/customer";
import { getContacts } from "../../api/contact";
import { getProjects } from "../../api/project";
import { getAllEmployees } from "../../api/employee";
import { getQuotes } from "../../api/quote";
import { IActivity, createActivity, updateActivity } from "../../api/activity";
import { fetcher } from "../../api";
import { BasePaper } from "../../app/Paper";

const schema = Yup.object().shape({
    name: Yup.string().required(),
});

export default function EditActivityForm({
    open,
    init,
    onDone,
}: {
    open?: boolean;
    init: IActivity;
    onDone: () => void;
}) {
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
                    <Box display="flex">
                        <BasePaper style={{ marginRight: "1em" }}>
                            <Box flex={3}>
                                <Box display="flex" justifyContent="space-between" my={1}>
                                    <TextField
                                        error={Boolean(errors.name && touched.name)}
                                        name="name"
                                        label="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ flex: "1 1 25%" }}
                                    />
                                    <TextField
                                        style={{ flex: "1 1 25%", marginRight: 5, marginLeft: 5 }}
                                        name="subject"
                                        label="subject"
                                        value={values.subject}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        style={{ flex: "1 1 25%", marginRight: 5 }}
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
                                        style={{ flex: "1 1 25%" }}
                                    />
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="space-between" my={1}>
                                    <TextField
                                        style={{ flex: "1 1 25%" }}
                                        type="date"
                                        name="startTime"
                                        label="Start time"
                                        value={values.startTime ? values.startTime.substr(0, 10) : ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        style={{ marginRight: 5, marginLeft: 5, flex: "1 1 25%" }}
                                        type="date"
                                        name="endTime"
                                        label="End time"
                                        value={values.endTime ? values.endTime.substr(0, 10) : ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FieldSelect
                                        style={{ flex: "1 1 25%", marginRight: 5 }}
                                        request={getCustomers}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        label="Client"
                                        name="ClientId"
                                        value={values.ClientId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <FieldSelect
                                        style={{ flex: "1 1 25%" }}
                                        label="Contact"
                                        name="ContactId"
                                        request={getContacts}
                                        itemTitleField="lastName"
                                        itemValueField="id"
                                        value={values.ContactId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="space-between" my={1}>
                                    <FieldSelect
                                        style={{ flex: "1 1 25%" }}
                                        label="ActivityPriorityId"
                                        name="ActivityPriorityId"
                                        request={() => fetcher("/activitypriority")}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        value={values.ActivityPriorityId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FieldSelect
                                        style={{ flex: "1 1 25%", marginRight: 5, marginLeft: 5 }}
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
                                        style={{ flex: "1 1 25%", marginRight: 5 }}
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
                                        style={{ flex: "1 1 25%" }}
                                        label="Quote"
                                        name="QuoteId"
                                        request={getQuotes}
                                        itemTitleField="number"
                                        itemValueField="id"
                                        value={values.QuoteId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                                <Box display="flex" my={1}>
                                    <FieldSelect
                                        label="ActivityCategoryId"
                                        name="ActivityCategoryId"
                                        request={() => fetcher("/activitycategory")}
                                        itemTitleField="name"
                                        itemValueField="id"
                                        value={values.ActivityCategoryId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ marginRight: 5 }}
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
                                    />
                                </Box>
                            </Box>
                        </BasePaper>
                        <BasePaper
                            style={{
                                height: "100%",
                                minHeight: "350px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Box flex={1}>
                                <Box>
                                    <div>
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
                                    </div>
                                    <div>
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
                                    </div>
                                    <FormControlLabel
                                        name="doNotShowOnCalendar"
                                        control={<CheckBox />}
                                        label="Do not show on calendar"
                                        checked={values.doNotShowOnCalendar}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Box>
                                <Box my={4}>
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            alignItems: "flex-end",
                                            marginTop: "auto",
                                        }}
                                    >
                                        <Button kind="add" type="submit" style={{ flex: 1 }}>
                                            {open ? "Add" : "Save"}
                                        </Button>
                                    </div>
                                </Box>
                            </Box>
                        </BasePaper>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
