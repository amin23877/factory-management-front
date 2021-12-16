import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, useMediaQuery } from "@material-ui/core";
import DateTimePicker from "../../../app/DateTimePicker";

import { Autocomplete } from "@material-ui/lab";
import { Form } from "formik";
import useSWR from "swr";

import Button from "../../../app/Button";
import { ArraySelect, FieldSelect } from "../../../app/Inputs";
import { getAllModelContact, getContacts } from "../../../api/contact";
import { getSO } from "../../../api/so";
import { ILineService } from "../../../api/lineService";
import { getCustomers } from "../../../api/customer";
import { getPO } from "../../../api/po";
import { getTicketStatus } from "../../../api/ticketStatus";
import { getTicketTags } from "../../../api/ticketTag";
import { getTicketCategory } from "../../../api/ticketCategory";
import { getQuotes } from "../../../api/quote";
import TextField from "../../../app/TextField";
import { getAllEmployees } from "../../../api/employee";
import { getAllUnits } from "../../../api/units";
import { getItems } from "../../../api/items";

export default function TicketForm({
    values,
    errors,
    handleChange,
    handleBlur,
    handleDelete,
    setFieldValue,
}: {
    values: any;
    errors: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
    handleDelete?: () => void;
    setFieldValue: (a: any, b: any) => void;
}) {
    // const selectedLineService = values ? values.LineServiceRecordId : null;
    const [selectedLineService, setSelectedLineService] = useState<ILineService>(values.LineServiceRecordId);
    const [SOId, setSOId] = useState<string>(values.LineServiceRecordId?.SOId);
    const { data: services } = useSWR(SOId ? `/lineservice?SOId=${SOId}` : null);
    const phone = useMediaQuery("(max-width:600px)");

    return (
        <>
            <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"} style={{ gap: 5 }}>
                <DateTimePicker
                    name="date"
                    value={values.date || null}
                    onChange={(d) => setFieldValue("date", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.date)}
                    helperText={errors.date}
                    size="small"
                    placeholder="Date"
                    label="Date"
                />
                <DateTimePicker
                    name="deadline"
                    value={values.deadline || null}
                    onChange={(d) => setFieldValue("deadline", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.deadline)}
                    helperText={errors.deadline}
                    size="small"
                    placeholder="Deadline"
                    label="Target date"
                />
                <FieldSelect
                    request={getTicketStatus}
                    itemTitleField="name"
                    itemValueField="id"
                    name="status"
                    label="Status"
                    fullWidth
                    onChange={handleChange}
                    value={typeof values.status === "string" ? values.status : values.status?.id}
                    error={Boolean(errors.status)}
                />
                <FieldSelect
                    itemValueField="id"
                    itemTitleField="name"
                    request={getTicketTags}
                    name="Tags"
                    value={values.Tags ? (typeof values.Tags === "string" ? values.Tags : values?.Tags[0]?.id) : ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.Tags)}
                    label="Tag"
                />
                <FieldSelect
                    request={getTicketCategory}
                    itemTitleField="name"
                    itemValueField="id"
                    name=" category"
                    label="Category"
                    fullWidth
                    onChange={handleChange}
                    value={typeof values.category === "string" ? values.category : values.category?.id}
                    error={Boolean(errors.category)}
                />
                <TextField
                    name="number"
                    value={values.number}
                    label="Ticket Number"
                    placeholder="Ticket Number"
                    disabled
                />
                <FieldSelect
                    label="SO Number"
                    value={SOId ? SOId : undefined}
                    request={getSO}
                    itemTitleField="number"
                    itemValueField="id"
                    onChange={(e) => {
                        setSOId(e.target.value);
                    }}
                />
                <FieldSelect
                    value={typeof values.QuoteId === "string" ? values.QuoteId : values.QuoteId?.id}
                    name="QuoteId"
                    label="Quote ID"
                    request={getQuotes}
                    itemTitleField="number"
                    itemValueField="id"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                />
                <FieldSelect
                    label="Device Number"
                    name="ItemId"
                    value={values.ItemId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    request={getItems}
                    getOptionList={(data) => data.result}
                    itemTitleField="name"
                    itemValueField="id"
                />
                <FieldSelect
                    value={typeof values.UnitId === "string" ? values.UnitId : values.UnitId?.id}
                    name="UnitId"
                    label="Unit Number"
                    request={getAllUnits}
                    itemTitleField="number"
                    itemValueField="id"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                />
                <Autocomplete
                    disabled={!SOId}
                    value={selectedLineService}
                    options={services ? services : []}
                    getOptionLabel={(option: any) => option?.ServiceId?.name}
                    onChange={(e, nv) => {
                        nv && setSelectedLineService(nv);
                        nv && nv.id && setFieldValue("LineServiceRecordId", nv.id);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Warranty"
                            placeholder="Warranty"
                            error={Boolean(errors.LineServiceRecordId)}
                            helperText={errors.LineServiceRecordId}
                        />
                    )}
                />
                <DateTimePicker
                    name="expireDate"
                    value={values.expireDate || null}
                    onChange={(d) => setFieldValue("expireDate", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.expireDate)}
                    helperText={errors.expireDate}
                    size="small"
                    placeholder="Exp. Date"
                    label="Exp. Date"
                />
                <FieldSelect
                    value={typeof values.assignedTo === "string" ? values.assignedTo : values.assignedTo?.id}
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    keyField="id"
                    name="assignedTo"
                    label="Assigned To"
                    onChange={handleChange}
                    error={Boolean(errors.assignedTo)}
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
                    error={Boolean(errors.createdBy)}
                />
                <TextField
                    name="subject"
                    value={values.subject}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.subject)}
                    label="Subject"
                    style={phone ? { gridColumnEnd: "span 2" } : {}}
                />
                <div
                    style={
                        phone
                            ? { gridColumnEnd: "span 2", display: "grid", gridTemplateColumns: "1fr", gap: "10px" }
                            : { gridColumnEnd: "span 3", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }
                    }
                >
                    <TextField
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        placeholder="Description"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <TextField
                        name=" response"
                        value={values.response}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.response)}
                        helperText={errors.response}
                        placeholder="Response"
                        label="Response"
                        fullWidth
                        multiline
                        rows={3}
                    />
                </div>
            </Box>
            <Box width="100%">
                <FormControlLabel
                    name="fsh"
                    label="Help"
                    control={<Checkbox checked={values.fsh} onChange={handleChange} />}
                />
                {!values.id ? (
                    <>
                        <Button type="submit" kind="edit" style={{ marginRight: "0.5em", width: "200px" }}>
                            Book a job
                        </Button>
                    </>
                ) : (
                    <>
                        <Button type="submit" kind="edit" style={{ marginRight: "0.5em" }}>
                            Save
                        </Button>
                        <Button kind="delete" onClick={handleDelete ? handleDelete : () => {}}>
                            Delete
                        </Button>
                    </>
                )}
            </Box>
        </>
    );
}
export function TechnicianForm({
    values,
    errors,
    handleChange,
    handleBlur,
    handleDelete,
    setFieldValue,
}: {
    values: any;
    errors: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
    handleDelete?: () => void;
    setFieldValue: (a: any, b: any) => void;
}) {
    const phone = useMediaQuery("(max-width:600px)");
    return (
        <Box mt={1} display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"} style={{ gap: 10 }}>
            <TextField
                name="vendorTech"
                value={values.vendorTech}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.vendorTech)}
                helperText={errors.vendorTech}

                placeholder="Vendor Tech"
            />
            <TextField
                name="vendorEmail"
                value={values.vendorEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.vendorEmail)}
                helperText={errors.vendorEmail}

                placeholder="Vendor Email"
            />
            <FieldSelect
                itemValueField="id"
                itemTitleField="number"
                request={getPO}
                name="POId"
                value={typeof values.POId === "string" ? values.POId : values.POId?.id}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Customer PO"
            />
            <TextField
                name="sendPO"
                value={values.sendPO}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.sendPO)}
                helperText={errors.sendPO}
                placeholder="Send PO"
            />
            <TextField
                name="DateSent"
                value={values.DateSent}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.DateSent)}
                helperText={errors.DateSent}
                placeholder="Date sent"
            />
        </Box>
    );
}

export const ContactForm = ({
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
}: {
    values: any;
    errors?: any;
    touched?: any;
    handleBlur: any;
    handleChange: any;
}) => {
    return (
        <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr 1fr">
            <TextField
                value={values.contactName}
                name="contactName"
                label="Contact Name"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.contactNumber}
                name="contactNumber"
                label="Contact Number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.contactMail}
                name="contactMail"
                label="Contact Mail"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ gridColumnEnd: "span 2" }}
            />
        </Box>
    );
};
