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

export default function AddActivityForm({ open,init, onDone }: {open?:boolean ; init: IActivity; onDone: () => void }) {
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

    const modalStyle= open ? {
        display:"flex"
    } : {
        display:"inline"
    }
    const TFStyle= open ? {
        flex:1
    } : {
        width:"243px"
    }
    

    return (
        <Formik initialValues={init} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                    <Box>
                        
                        <div style={modalStyle}>

                            <TextField
                                style={TFStyle}
                                error={Boolean(errors.name && touched.name)}
                                name="name"
                                label="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField style={TFStyle} name="subject" label="subject" value={values.subject} onChange={handleChange} onBlur={handleBlur} />
                        </div> 
                        <div style={modalStyle}>

                            <TextField name="location" style={TFStyle} label="location" value={values.location} onChange={handleChange} onBlur={handleBlur} />
                            <TextField name="notes" style={TFStyle} label="notes" value={values.notes} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div style={modalStyle}>

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
                        </div>
                        <div style={modalStyle}>

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
                        </div>
                        <div style={modalStyle}>

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
                        </div>
                        <div style={modalStyle}>

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
                        </div>
                        <div style={modalStyle}>

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
                        </div>
                        <Box>
                            <div style={modalStyle}>

                                <FormControlLabel
                                    style={TFStyle}
                                    name="allDayActivity"
                                    control={<CheckBox />}
                                    label="All dat activity"
                                    checked={values.allDayActivity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    style={TFStyle}
                                    name="notifyOnDay"
                                    control={<CheckBox />}
                                    label="Notify on day"
                                    checked={values.notifyOnDay}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </div>
                            <div style={modalStyle}>

                                <FormControlLabel
                                    style={TFStyle}
                                    name="recurring"
                                    control={<CheckBox />}
                                    label="Recurring"
                                    checked={values.recurring}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormControlLabel
                                    style={TFStyle}
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
                        <Box my={2}>
                            <div style={{display:"flex",width:"100%" ,alignItems:"flex-end"}}>
                            <Button kind="add" type="submit" style={open ? {width:"100%"}: { marginLeft:"auto",marginRight:"auto",width:"40%" ,marginBottom:"20px",marginTop:"20px",paddingTop:"8px",paddingBottom:"8px"} }>
                               {open ? "Add" : "Save" }
                            </Button>
                            </div>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
