import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import { Form } from "formik";
import useSWR from "swr";

import Button from "../../app/Button";
import { ArraySelect, FieldSelect } from "../../app/Inputs";
import { getAllModelContact, getContacts } from "../../api/contact";
import { getSO } from "../../api/so";
import { ILineService } from "../../api/lineService";
import { getCustomers } from "../../api/customer";
import { getPO } from "../../api/po";
import { getTicketStatus } from "../../api/ticketStatus";
import { getTicketTags } from "../../api/ticketTag";
import { getTicketCategory } from "../../api/ticketCategory";
import { getQuotes } from "../../api/quote";
import TextField from "../../app/TextField";
import { getAllEmployees } from "../../api/employee";
import { getAllUnits } from "../../api/units";
import { getItems } from "../../api/items";

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

    return (
        <Form>
            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr 1fr" style={{ gap: 10 }}>
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
                {/* 
                <FieldSelect
                    name="ContactId"
                    label="Contact"
                    value={values.ContactId}
                    request={getContacts}
                    itemTitleField="lastName"
                    itemValueField="id"
                    onChange={handleChange}
                />
                <DateTimePicker
                    name="callTime"
                    value={values.callTime || null}
                    onChange={(d) => setFieldValue("callTime", d?.toString())}
                    onBlur={handleBlur}
                    error={Boolean(errors.callTime)}
                    helperText={errors.callTime}
                    size="small"
                    placeholder="Call time"
                    label="Call time"
                /> */}

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
                            size="small"
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
                />
                <TextField
                    style={{ gridColumnEnd: "span 3" }}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    size="small"
                    placeholder="Description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                />
                <TextField
                    style={{ gridColumnEnd: "span 3" }}
                    name=" response"
                    value={values.response}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.response)}
                    helperText={errors.response}
                    size="small"
                    placeholder="Response"
                    label="Response"
                    fullWidth
                    multiline
                    rows={4}
                />
                {/* <ArraySelect
                    style={{ gridColumnEnd: "span 2" }}
                    items={["1", "2", "3", "4", "5"]}
                    label="Priority"
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}
                    onBlur={handleBlur}
                /> */}
            </Box>
            <Box mt={1}>
                <FormControlLabel
                    name="fsh"
                    label="Help"
                    control={<Checkbox checked={values.fsh} onChange={handleChange} />}
                />
            </Box>
            <Box display="flex" alignItems="center" mt={1}>
                {!values.id ? (
                    <>
                        <Button type="submit" kind="add" style={{ marginRight: "0.5em" }}>
                            Book a job
                        </Button>
                        {/* <Button>Show calendar</Button> */}
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
        </Form>
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
    return (
        <Form>
            <Box mt={1} display="grid" gridTemplateColumns="1fr" style={{ gap: 10 }}>
                <TextField
                    name="vendorTech"
                    value={values.vendorTech}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.vendorTech)}
                    helperText={errors.vendorTech}
                    size="small"
                    placeholder="Vendor Tech"
                />
                <TextField
                    name="vendorEmail"
                    value={values.vendorEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.vendorEmail)}
                    helperText={errors.vendorEmail}
                    size="small"
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
                    size="small"
                    placeholder="Send PO"
                />
                <TextField
                    name="DateSent"
                    value={values.DateSent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.DateSent)}
                    helperText={errors.DateSent}
                    size="small"
                    placeholder="Date sent"
                />
            </Box>
        </Form>
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
    return (
        <>
            <Box my={1} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridColumnGap={10}>
                <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
                    <FieldSelect
                        value={typeof values.repOrAgency === "string" ? values.repOrAgency : values.repOrAgency?.id}
                        request={getCustomers}
                        itemTitleField="name"
                        itemValueField="id"
                        name="repOrAgency"
                        label="rep / Agency"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField value={values.repOrAgency?.address} label="Address" disabled />
                    <TextField
                        value={values.repOrAgency?.city}
                        name="city"
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    />
                    <TextField
                        value={values.repOrAgency?.state}
                        name="state"
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    />
                    <TextField
                        value={values.repOrAgency?.zipcode}
                        name="zipCode"
                        label="Zip Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    />
                </Box>
                <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
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
                    <TextField style={{ opacity: 0 }} />
                    <TextField style={{ opacity: 0 }} />
                </Box>
                <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
                    {/* <TextField
                    value={values.client}
                    name="client"
                    label="Client"
                    onChange={handleChange}
                    onBlur={handleBlur}
                /> */}
                    <FieldSelect
                        value={typeof values.client === "string" ? values.client : values.client?.id}
                        request={getCustomers}
                        itemTitleField="name"
                        itemValueField="id"
                        name="client"
                        label="Client"
                        onChange={handleChange}
                    />
                    <TextField
                        value={values.contact?.lastName}
                        label="Contact Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    />
                    <TextField
                        value={values.contact?.email}
                        label="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    />
                    <TextField
                        value={values.contact?.lastName}
                        label="Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    />
                    <TextField
                        value={values.unitPricingLevel}
                        label="Unit Pricing Level"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                    />
                </Box>
                <Box my={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                    <FieldSelect
                        label="24 Hour Contact"
                        name="twentyFourContact"
                        request={
                            typeof values.client === "string"
                                ? () => getAllModelContact("customer", values.client)
                                : () => getAllModelContact("customer", values.client?.id)
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
                        disabled={!values.client}
                    />
                    <FieldSelect
                        label="Phone"
                        name="twentyFourContact"
                        request={
                            typeof values.client === "string"
                                ? () => getAllModelContact("customer", values.client)
                                : () => getAllModelContact("customer", values.client?.id)
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
                            typeof values.client === "string"
                                ? () => getAllModelContact("customer", values.client)
                                : () => getAllModelContact("customer", values.client?.id)
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

                    <TextField style={{ opacity: 0 }} />
                    <TextField style={{ opacity: 0 }} />
                </Box>
            </Box>
        </>
    );
};
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
        <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr">
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
            />
        </Box>
    );
};
