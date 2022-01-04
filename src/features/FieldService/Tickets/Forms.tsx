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
import LinkSelect from "../../../app/Inputs/LinkFields";
import { formatTimestampToDate } from "../../../logic/date";

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
    const [selectedLineService, setSelectedLineService] = useState<ILineService>(values.LineServiceRecordId);
    const [SOId, setSOId] = useState<string>(values.LineServiceRecordId?.SOId);
    const { data: services } = useSWR(SOId ? `/lineservice?SOId=${SOId}` : null);
    const phone = useMediaQuery("(max-width:1200px)");

    return (
        <>
            <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"} style={{ gap: 10 }}>
                <DateTimePicker
                    name="startDate"
                    value={values.startDate || null}
                    onChange={(d) => setFieldValue("startDate", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.startDate)}
                    helperText={errors.startDate}
                    size="small"
                    label="Date"
                />
                <DateTimePicker
                    name="targetDate"
                    value={values.targetDate || null}
                    onChange={(d) => setFieldValue("targetDate", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.targetDate)}
                    helperText={errors.targetDate}
                    size="small"
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
                <TextField name="number" value={values.number} label="Ticket Number" disabled />
                <LinkSelect
                    value={typeof values.SOId === "string" ? values.SOId : values.SOId}
                    label="SO ID"
                    path="/so"
                    filterLabel="number"
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(so) => so?.number}
                    getOptionValue={(so) => so?.id}
                    onChange={(e, nv) => {
                        setFieldValue("SOId", nv?.id);
                        setSOId(nv.id);
                    }}
                    onBlur={handleBlur}
                    url="/panel/so"
                />
                <LinkSelect
                    filterLabel="no"
                    path="/item"
                    value={values.UnitId.ItemId}
                    label="Device"
                    getOptionList={(resp) => resp.result}
                    getOptionLabel={(item) => item?.no}
                    getOptionValue={(item) => item?.id}
                    url="/panel/inventory"
                    disabled
                />
                <LinkSelect
                    value={typeof values.UnitId === "string" ? values.UnitId : values.UnitId?.id}
                    label="Unit"
                    path="/unit"
                    filterLabel="number"
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(unit) => unit?.number}
                    getOptionValue={(unit) => unit?.id}
                    onChange={(e, nv) => {
                        setFieldValue("UnitId", nv?.id);
                    }}
                    onBlur={handleBlur}
                    url="/panel/production"
                />
                <TextField value={values.WarrantyId.number} label="Warranty" disabled />
                <TextField value={formatTimestampToDate(values.WarrantyId.endDate)} label="Exp. Date" disabled />
                <FieldSelect
                    value={typeof values.assigneeId === "string" ? values.assigneeId : values.assigneeId?.id}
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    keyField="id"
                    name="assigneeId"
                    label="Assigned To"
                    onChange={handleChange}
                    error={Boolean(errors.assigneeId)}
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
    const phone = useMediaQuery("(max-width:1200px)");
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
        <Box mt={1} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr 1fr">
            <TextField
                value={values.contact}
                name="contact"
                label="Contact Name"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.phone}
                name="phone"
                label="Contact Number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.email}
                name="email"
                label="Contact Mail"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ gridColumnEnd: "span 2" }}
            />
        </Box>
    );
};
