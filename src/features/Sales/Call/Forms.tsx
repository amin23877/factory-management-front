import React from "react";
import { Box } from "@material-ui/core";

import { FieldSelect } from "../../../app/Inputs";
import TextField from "../../../app/TextField";

import { getAllEmployees } from "../../../api/employee";
import { formatTimestampToDate } from "../../../logic/date";
import { getQuotes } from "../../../api/quote";
import { getSO } from "../../../api/so";
import { getCallsTags } from "../../../api/callsTags";

export const GeneralForm = ({
    add,
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
}: {
    add?: boolean;
    values: any;
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
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
                    error={Boolean(errors.company)}
                    helperText={touched.company && errors.company && String(errors.company)}
                    label="Company"
                />
                <TextField
                    name="contactName"
                    value={values.contactName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.contactName)}
                    helperText={touched.contactName && errors.contactName && String(errors.contactName)}
                    label="Contact Name"
                />
                <TextField
                    name="contactNumber"
                    value={values.contactNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.contactNumber)}
                    helperText={touched.contactNumber && errors.contactNumber && String(errors.contactNumber)}
                    label="Contact Number"
                />
                <TextField
                    name="contactEmail"
                    value={values.contactEmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.contactEmail)}
                    helperText={touched.contactEmail && errors.contactEmail && String(errors.contactEmail)}
                    label="Contact Email"
                />
                <TextField
                    name="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.address)}
                    helperText={touched.address && errors.address && String(errors.address)}
                    label="Address"
                />
                <TextField
                    name="state"
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.state)}
                    helperText={touched.state && errors.state && String(errors.state)}
                    label="State"
                />
                <TextField
                    name="zip"
                    value={values.zip}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.zip)}
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
                    error={Boolean(errors.QuoteId)}
                />
                <FieldSelect
                    itemValueField="id"
                    itemTitleField="number"
                    request={getSO}
                    name="SOId"
                    value={typeof values.SOId === "string" ? values.SOId : values.SOId?.id}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.SOId)}
                    helperText={touched.SOId && errors.SOId && String(errors.SOId)}
                    label="SO ID"
                />
                <FieldSelect
                    itemValueField="id"
                    itemTitleField="name"
                    request={getCallsTags}
                    name="Tags"
                    value={values.Tags ? (typeof values.Tags === "string" ? values.Tags : values?.Tags[0]?.id) : ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.Tags)}
                    helperText={touched.Tags && errors.Tags && String(errors.Tags)}
                    label="Tags"
                />

                {!add && (
                    <>
                        <FieldSelect
                            value={typeof values.AssignedTo === "string" ? values.AssignedTo : values.AssignedTo?.id}
                            request={getAllEmployees}
                            itemTitleField="username"
                            itemValueField="id"
                            keyField="id"
                            name="AssignedTo"
                            label="Assigned To"
                            onChange={handleChange}
                            error={Boolean(errors.AssignedTo)}
                        />
                        <FieldSelect
                            value={typeof values.CreatedBy === "string" ? values.CreatedBy : values.CreatedBy?.id}
                            request={getAllEmployees}
                            itemTitleField="username"
                            itemValueField="id"
                            keyField="id"
                            name="CreatedBy"
                            label="Created By"
                            onChange={handleChange}
                            error={Boolean(errors.CreatedBy)}
                        />
                        <TextField
                            style={{ gridColumnEnd: "span 2" }}
                            name="subject"
                            value={values.subject}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(errors.subject)}
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
                error={Boolean(errors.subject)}
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
                error={Boolean(errors.description)}
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
                value={typeof values.AssignedTo === "string" ? values.AssignedTo : values.AssignedTo?.id}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="AssignedTo"
                label="Assigned To"
                onChange={handleChange}
                error={Boolean(errors.AssignedTo)}
            />
            <FieldSelect
                value={typeof values.CreatedBy === "string" ? values.CreatedBy : values.CreatedBy?.id}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="CreatedBy"
                label="Created By"
                onChange={handleChange}
                error={Boolean(errors.CreatedBy)}
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
                error={Boolean(errors.response)}
            />
        </Box>
    );
};
