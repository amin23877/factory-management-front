import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, useMediaQuery } from "@material-ui/core";
import DateTimePicker from "../../../app/DateTimePicker";

import Button from "../../../app/Button";
import { FieldSelect } from "../../../app/Inputs";

import { getPO } from "../../../api/po";
import { getTicketStatus } from "../../../api/ticketStatus";
import { getTicketTags } from "../../../api/ticketTag";
import { getTicketCategory } from "../../../api/ticketCategory";
import TextField from "../../../app/TextField";
import { getAllEmployees } from "../../../api/employee";
import LinkSelect from "../../../app/Inputs/LinkFields";
import { formatTimestampToDate } from "../../../logic/date";
import { getAllModelContact } from "../../../api/contact";
import { getCustomers } from "../../../api/customer";
import useSWR from "swr";

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
    const phone = useMediaQuery("(max-width:900px)");
    const { data: item } = useSWR(`/item/${values.UnitId?.ItemId}`);

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
                    value={values.UnitId.SOId}
                    label="SO ID"
                    path="/so"
                    filterLabel="number"
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(so) => so?.number}
                    getOptionValue={(so) => so?.id}
                    onChange={(e, nv) => {
                        setFieldValue("SOId", nv?.id);
                    }}
                    onBlur={handleBlur}
                    url="/panel/so"
                    disabled
                    choseItem={{ id: values.UnitId.SOId, number: values.originalSONo }}
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
                    choseItem={{ id: values.UnitId.ItemId, no: item?.no }}
                />
                <LinkSelect
                    value={values.UnitId.id}
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
                    choseItem={values.UnitId}
                />
                <TextField value={values.WarrantyId?.number} label="Warranty" disabled />
                <TextField value={formatTimestampToDate(values.WarrantyId?.endDate)} label="Exp. Date" disabled />
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
export const EntitiesForm = ({
    handleChange,
    handleBlur,
    values,
    setFieldValue,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
    setFieldValue: any;
}) => {
    const phone = useMediaQuery("(max-width:900px)");

    return (
        <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr 1fr"} gridColumnGap={10}>
            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} my={1}>
                <LinkSelect
                    value={typeof values.repId === "string" ? values.repId : values.repId?.id}
                    label="rep / Agency"
                    path="/customer"
                    filterLabel="name"
                    request={getCustomers}
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(cus) => cus?.name}
                    getOptionValue={(cus) => cus?.id}
                    onChange={(e, nv) => {
                        setFieldValue("repId", nv?.id);
                    }}
                    onBlur={handleBlur}
                    choseItem={values.repId}
                    url="/panel/customer"
                />

                <TextField value={values.repId?.address} label="Address" disabled />
                <TextField
                    value={values.repId?.city}
                    name="city"
                    label="City"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
                <TextField
                    value={values.repId?.state}
                    name="state"
                    label="State"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
                <TextField
                    value={values.repId?.zipcode}
                    name="zipCode"
                    label="Zip Code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
            </Box>
            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} my={1}>
                <LinkSelect
                    value={typeof values.clientId === "string" ? values.clientId : values.clientId?.id}
                    label="clientId"
                    request={getCustomers}
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(cus) => cus?.name}
                    getOptionValue={(cus) => cus?.id}
                    onChange={(e, nv) => {
                        setFieldValue("clientId", nv?.id);
                    }}
                    onBlur={handleBlur}
                    url="/panel/customer"
                    path="/customer"
                    filterLabel="name"
                    choseItem={values.clientId}
                />
                <TextField
                    value={values.contact}
                    name="contact"
                    label="Contact Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.email}
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.phone}
                    name="phone"
                    label="Phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.unitPricingLevel}
                    name="Unit Pricing Level"
                    label="Unit Pricing Level"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
            </Box>
            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} my={1}>
                <TextField
                    value={values.requesterName}
                    name="requesterName"
                    label="requesterName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.requesterMail}
                    name="requesterMail"
                    label="requesterMail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.requesterPhone}
                    name="requesterPhone"
                    label="requesterPhone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {!phone && <div style={{ height: "80px", width: "100%" }}></div>}
            </Box>
            <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} my={1}>
                <FieldSelect
                    label="24 Hour Contact"
                    name="twentyFourContact"
                    request={
                        typeof values.clientId === "string"
                            ? () => getAllModelContact("customer", values.clientId)
                            : () => getAllModelContact("customer", values.clientId?.id)
                    }
                    itemTitleField="lastName"
                    itemValueField="id"
                    value={
                        typeof values.twentyFourContact === "string"
                            ? values.twentyFourContact
                            : values.twentyFourContact?.id
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!values.clientId}
                />
                <FieldSelect
                    label="Phone"
                    name="twentyFourContact"
                    request={
                        typeof values.clientId === "string"
                            ? () => getAllModelContact("customer", values.clientId)
                            : () => getAllModelContact("customer", values.clientId?.id)
                    }
                    itemTitleField="phone"
                    itemValueField="id"
                    value={
                        typeof values.twentyFourContact === "string"
                            ? values.twentyFourContact
                            : values.twentyFourContact?.id
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
                <FieldSelect
                    label="Email"
                    name="twentyFourContact"
                    request={
                        typeof values.clientId === "string"
                            ? () => getAllModelContact("customer", values.clientId)
                            : () => getAllModelContact("customer", values.clientId?.id)
                    }
                    itemTitleField="email"
                    itemValueField="id"
                    value={
                        typeof values.twentyFourContact === "string"
                            ? values.twentyFourContact
                            : values.twentyFourContact?.id
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
                {!phone && <div style={{ height: "80px", width: "100%" }}></div>}
            </Box>
        </Box>
    );
};

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
    const phone = useMediaQuery("(max-width:900px)");
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
