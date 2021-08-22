import React from "react";
import { Box } from "@material-ui/core";

import { FieldSelect } from "../../../app/Inputs";
import TextField from "../../../app/TextField";

import { getAllEmployees } from "../../../api/employee";
import { formatTimestampToDate } from "../../../logic/date";
import { getQuotes } from "../../../api/quote";
import { getSO } from "../../../api/so";
// import TagsAutocomplete from "./TagsAutocomplete";

export const GeneralForm = ({
    add,
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
}: {
    add?: boolean;
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
    setFieldValue: any;
}) => {
    return (
        <>
            <Box
                mb={1}
                display="grid"
                gridColumnGap={10}
                gridRowGap={10}
                gridTemplateColumns={add ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr"}
            >
                <TextField
                    name="date"
                    label="Date"
                    disabled
                    value={values.createdAt ? formatTimestampToDate(values.createdAt) : new Date()}
                />
                <TextField name="number" label="Ticket ID" disabled value={values.number} />
                <TextField
                    name="company"
                    value={values.company}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.company && touched.company)}
                    helperText={touched.company && errors.company && String(errors.company)}
                    label="Company"
                />
                <TextField
                    name="contactName"
                    value={values.contactName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.contactName && touched.contactName)}
                    helperText={touched.contactName && errors.contactName && String(errors.contactName)}
                    label="Contact Name"
                />
                <TextField
                    name="contactNumber"
                    value={values.contactNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.contactNumber && touched.contactNumber)}
                    helperText={touched.contactNumber && errors.contactNumber && String(errors.contactNumber)}
                    label="Contact Number"
                />
                <TextField
                    name="contactEmail"
                    value={values.contactEmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.contactEmail && touched.contactEmail)}
                    helperText={touched.contactEmail && errors.contactEmail && String(errors.contactEmail)}
                    label="Contact Email"
                />
                <TextField
                    name="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.address && touched.address)}
                    helperText={touched.address && errors.address && String(errors.address)}
                    label="Address"
                />
                <TextField
                    name="state"
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.state && touched.state)}
                    helperText={touched.state && errors.state && String(errors.state)}
                    label="State"
                />
                <TextField
                    name="zip"
                    value={values.zip}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.zip && touched.zip)}
                    helperText={touched.zip && errors.zip && String(errors.zip)}
                    label="Zip Code"
                />
                <FieldSelect
                    label="Quote ID"
                    name="QuoteId"
                    request={getQuotes}
                    itemTitleField="number"
                    itemValueField="id"
                    value={typeof values.QuoteId === "string" ? values.QuoteId : values.QuoteId?.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FieldSelect
                    itemValueField="id"
                    itemTitleField="number"
                    request={getSO}
                    name="soId"
                    value={typeof values.soId === "string" ? values.soId : values.soId?.id}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.soId && touched.soId)}
                    helperText={touched.soId && errors.soId && String(errors.soId)}
                    label="SO ID"
                />
                {/* <TagsAutocomplete value={values.tags} setFieldValue={setFieldValue} /> */}
                <TextField
                    name="tags"
                    value={values.tags}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.tags && touched.tags)}
                    helperText={touched.tags && errors.tags && String(errors.tags)}
                    label="Tag"
                />
                {!add && (
                    <>
                        <FieldSelect
                            value={typeof values.assignedTo === "string" ? values.assignedTo : values.assignedTo?.id}
                            request={getAllEmployees}
                            itemTitleField="username"
                            itemValueField="id"
                            keyField="id"
                            name="assignedTo"
                            label="Assigned To"
                            onChange={handleChange}
                        />
                        <FieldSelect
                            value={typeof values.createdBy === "string" ? values.createdBy : values.createdBy?.id}
                            request={getAllEmployees}
                            itemTitleField="username"
                            itemValueField="id"
                            keyField="id"
                            name="createdBy"
                            label="Created By"
                            onChange={handleChange}
                        />
                        <TextField
                            style={{ gridColumnEnd: "span 2" }}
                            name="subject"
                            value={values.subject}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(errors.subject && touched.subject)}
                            helperText={touched.subject && errors.subject && String(errors.subject)}
                            label="Subject"
                        />
                    </>
                )}
            </Box>
        </>
    );
};

export const MoreInfoForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
}: {
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
}) => {
    return (
        <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr">
            <TextField
                name="subject"
                value={values.subject}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.subject && touched.subject)}
                helperText={touched.subject && errors.subject && String(errors.subject)}
                label="Subject"
            />
            <TextField
                multiline
                rows={4}
                placeholder="description"
                label="Description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
            />
        </Box>
    );
};

export const MainContactForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
}: {
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
}) => {
    return (
        <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr 1fr">
            <FieldSelect
                value={typeof values.assignedTo === "string" ? values.assignedTo : values.assignedTo?.id}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="assignedTo"
                label="Assigned To"
                onChange={handleChange}
            />
            <FieldSelect
                value={typeof values.createdBy === "string" ? values.createdBy : values.createdBy?.id}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="createdBy"
                label="Created By"
                onChange={handleChange}
            />
            <TextField
                multiline
                style={{ gridColumnEnd: "span 2" }}
                rows={4}
                placeholder="response"
                label="Response"
                name="response"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.response}
            />
        </Box>
    );
};
