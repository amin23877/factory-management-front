import React, { useEffect, useState, useRef, Fragment } from "react";
import {
    Typography,
    Box,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
    LinearProgress,
    Paper,
    Tabs,
    Tab,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import TextField from "../../../app/TextField";
import { FieldSelect, ArraySelect } from "../../../app/Inputs";
import Button from "../../../app/Button";

import { getAllEmployees } from "../../../api/employee";
import { getAllModelContact, getContacts } from "../../../api/contact";
import { getCustomers } from "../../../api/customer";
import { getAddresses } from "../../../api/address";
import { getPhones } from "../../../api/phone";
import { getEmails } from "../../../api/emailAddress";
import { getProjects } from "../../../api/project";
import { getQuoteById, getQuotes } from "../../../api/quote";
import { getTickets } from "../../../api/ticket";
import { ISO, ISOComplete } from "../../../api/so";
import { createAModelDocument } from "../../../api/document";

import { exportPdf } from "../../../logic/pdf";
import { formatTimestampToDate } from "../../../logic/date";

import SOCus from "../../../PDFTemplates/SOCus";
import SORep from "../../../PDFTemplates/SORep";
import SOAcc from "../../../PDFTemplates/SOAcc";
import { getPO } from "../../../api/po";

export const GeneralForm = ({
    handleChange,
    handleBlur,
    onChangeInit,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
    onChangeInit: (data: any) => void;
}) => {
    const [selectedQuote, setSelectedQuote] = useState<string>();

    useEffect(() => {
        if (selectedQuote) {
            getQuoteById(selectedQuote)
                .then((d) => {
                    const {
                        freightTerms,
                        paymentTerms,
                        carrier,
                        issuedBy,
                        status,
                        expodate,

                        estShipDate,
                        actShipDate,
                        shippingAddress,
                        shippingContact,
                        shippingPhone,
                        shippingEmail,
                        shippingEntitiy,

                        billingContact,
                        billingPhone,
                        billingEmail,
                        billingAddress,
                        billingEntitiy,

                        requester,
                        ClientId,
                        ProjectId,
                    } = d;
                    onChangeInit({
                        ...values,
                        freightTerms,
                        paymentTerms,
                        carrier,
                        issuedBy,
                        status,
                        expodate,

                        estShipDate,
                        actShipDate,
                        shippingAddress,
                        shippingContact,
                        shippingPhone,
                        shippingEmail,
                        shippingEntitiy,

                        billingContact,
                        billingPhone,
                        billingEmail,
                        billingAddress,
                        billingEntitiy,

                        requester,
                        ProjectId,
                    });
                })
                .catch((e) => console.log(e));
        }
    }, [selectedQuote]);

    return (
        <Fragment>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                <TextField
                    value={values.number}
                    name="number"
                    label="SO ID"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FieldSelect
                    value={typeof values.QuoteId === "string" ? values.QuoteId : values.QuoteId?.id}
                    name="QuoteId"
                    label="Quote ID"
                    request={getQuotes}
                    itemTitleField="number"
                    itemValueField="id"
                    onChange={(e) => {
                        setSelectedQuote(e.target.value as string);
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.invoice}
                    name="invoice"
                    label="Invoice ID"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField value={formatTimestampToDate(values.createdAt)} name="createdAt" label="SO Date" disabled />
                <ArraySelect
                    value={values.warranty}
                    name="warranty"
                    label="Warranty"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    items={[]}
                />
                <FieldSelect
                    value={typeof values.ProjectId === "string" ? values.ProjectId : values.ProjectId?.id}
                    request={getProjects}
                    itemTitleField="name"
                    itemValueField="id"
                    keyField="id"
                    name="ProjectId"
                    label="Project Name"
                    onChange={handleChange}
                />

                <TextField value={values.location} name="location" label="Location" onChange={handleChange} />
                <TextField value={values.leadTime} name="leadTime" label="Lead Time" onChange={handleChange} />
                <TextField
                    value={values.acknowledgeDate}
                    name="acknowledgeDate"
                    label="Date acknowledged "
                    onChange={handleChange}
                    disabled
                />
                <TextField value={values.csa} name="csa" label="CSA" onChange={handleChange} />
            </Box>
            <Paper
                style={{
                    margin: "0.5em 0",
                    padding: "0 0.5em 0 1em",
                    backgroundColor: "#eee",
                    gridColumnEnd: "span 4",
                }}
            >
                <FormControlLabel
                    name="callADayBeforeDelivery"
                    control={<Checkbox checked={Boolean(values.callADayBeforeDelivery)} />}
                    label="Call 24 hours before delivery"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Paper>
        </Fragment>
    );
};

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
        <Box my={1} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridColumnGap={10}>
            <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
                <FieldSelect
                    value={typeof values.repOrAgency === "string" ? values.repOrAgency : values.repOrAgency?.id}
                    request={getCustomers}
                    itemTitleField="name"
                    itemValueField="id"
                    name="repOrAgency"
                    label="repOrAgency / Agency"
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
                    name="contactName"
                    label="Contact Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
                <TextField
                    value={values.contact?.email}
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
                <TextField
                    value={values.contact?.lastName}
                    name="phone"
                    label="Phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
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
    );
};

export const AddressesForm = ({
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
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Tabs
                textColor="primary"
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
                variant="scrollable"
                style={{ maxWidth: 600 }}
            >
                <Tab label="Billing Address" />
                <Tab label="Shipping Address" />
            </Tabs>
            {activeTab === 0 && (
                <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridRowGap={10}>
                    <TextField
                        value={values.billingAddressCompany}
                        name="billingAddressCompany"
                        label="Company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressAttn}
                        name="billingAddressAttn"
                        label="Attn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <TextField
                        value={values.billingAddressAddress}
                        name="billingAddressAddress"
                        label="Billing Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressCity}
                        name="billingAddressCity"
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressState}
                        name="billingAddressState"
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressZipCode}
                        name="billingAddressZipCode"
                        label="Zip Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressCountry}
                        name="billingAddressCountry"
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressPhone}
                        name="billingAddressPhone"
                        label="Billing Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.billingAddressEmail}
                        name="billingAddressEmail"
                        label="Billing Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ gridColumnEnd: "span 2" }}
                    />
                </Box>
            )}
            {activeTab === 1 && (
                <Box
                    my={1}
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gridGap={10}
                    gridRowGap={10}
                    gridColumnGap={10}
                >
                    <TextField
                        value={values.shippingAddressCompany}
                        name="shippingAddressCompany"
                        label="Company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressAttn}
                        name="shippingAddressAttn"
                        label="Attn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressAddress}
                        label="Shipping Address"
                        name="shippingAddressAddress"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressCity}
                        name="shippingAddressCity"
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressState}
                        name="shippingAddressState"
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressZipCode}
                        name="shippingAddressZipCode"
                        label="Zip Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressCountry}
                        name="shippingAddressCountry"
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressPhone}
                        name="shippingAddressPhone"
                        label="Shipping Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.shippingAddressEmail}
                        name="shippingAddressEmail"
                        label="Shipping Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ gridColumnEnd: "span 2" }}
                    />
                </Box>
            )}
        </>
    );
};

export const AccountingForm = ({
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
    const [activeTab, setActiveTab] = useState(0);
    return (
        <Fragment>
            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                <TextField
                    value={values.requestApproval}
                    name="requestApproval"
                    label=" Request Approval"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={formatTimestampToDate(values.createdAt)}
                    name="toBeInvoicedDate"
                    label="To be Invoiced Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>
            <Tabs
                textColor="primary"
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
                variant="scrollable"
                style={{ maxWidth: 600 }}
            >
                <Tab label="Commissions" />
                <Tab label="Cost" />
            </Tabs>
            {activeTab === 0 && (
                <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridGap={10}>
                    <TextField
                        style={{ gridColumnEnd: "span 2" }}
                        value={values.commisionBaseAmt}
                        name="commisionBaseAmt"
                        label="Commission Base Amt"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.regularCommision}
                        name="regularCommision"
                        label="Regular Commission %"
                        type="number"
                        placeholder="0.00%"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.regularCommision}
                        name="regularCommision"
                        label="Regular Commission $"
                        placeholder="0.00$"
                        disabled
                    />
                    <TextField
                        value={values.overageCommision}
                        name="overageCommision"
                        label="Overage Commission"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.totalCommision}
                        name="totalCommision"
                        label="Total Commission"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Box>
            )}
            {activeTab === 1 && (
                <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridGap={10}>
                    <TextField
                        style={{ gridColumnEnd: "span 2" }}
                        value={values.soCost}
                        name="soCost"
                        label="SO Cost"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.partsCost}
                        name="partsCost"
                        label="Parts Cost"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.labor}
                        name="labor"
                        label="Labor"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.margin}
                        name="margin"
                        label="Margin"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={(values.margin / values.soCost) * 100}
                        name="marginPercent"
                        label="Margin %"
                        disabled
                    />
                </Box>
            )}
        </Fragment>
    );
};

export const ApprovalForm = ({
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
        <Fragment>
            <Paper
                style={{
                    margin: "1em 0",
                    padding: "0 0.5em 0 1em",
                    backgroundColor: "#eee",
                    gridColumnEnd: "span 4",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                }}
            >
                <FormControlLabel
                    name="releaseToProduction"
                    control={<Checkbox checked={Boolean(values.releaseToProduction)} />}
                    label="Release to Production"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={Boolean(values.releaseToProduction)}
                />
                <FormControlLabel
                    name="expedite"
                    control={<Checkbox checked={Boolean(values.expedite)} />}
                    label="Expedite"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Paper>
            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
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
                    value={formatTimestampToDate(values.POId?.createdAt)}
                    name="POReceivedDate"
                    label="PO Received Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
                <FieldSelect
                    value={typeof values.issuedBy === "string" ? values.issuedBy : values.issuedBy?.id}
                    name="issuedBy"
                    label="Issued By"
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.releaseDate ? formatTimestampToDate(values.releaseDate) : ""}
                    name="releaseDate"
                    label="Release Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                />
                <ArraySelect
                    value={values.warranty}
                    name="warranty"
                    label="Warranty"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    items={[]}
                />
                <ArraySelect
                    value={values.status}
                    name="status"
                    label="SO Status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    items={["New", "Pending", "Fulfilled", "Shipped"]}
                />
            </Box>
        </Fragment>
    );
};

export const ShippingForm = ({
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
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
            <DateTimePicker
                style={{ gridColumnEnd: "span 2" }}
                size="small"
                value={values.estimatedShipDate}
                name="estimatedShipDate"
                label="Estimated ship date"
                onChange={(date) => setFieldValue("estimatedShipDate", date)}
                onBlur={handleBlur}
            />
            <DateTimePicker
                style={{ gridColumnEnd: "span 2" }}
                size="small"
                value={values.orgShipDate}
                name="orgShipDate"
                label="Original ship date"
                onChange={(date) => setFieldValue("orgShipDate", date)}
                onBlur={handleBlur}
            />
            <DateTimePicker
                style={{ gridColumnEnd: "span 2" }}
                size="small"
                value={values.actualShipDate}
                name="actualShipDate"
                label="Actual ship date"
                onChange={(date) => setFieldValue("actualShipDate", date)}
                onBlur={handleBlur}
            />

            {/* 
             <FieldSelect
                value={values.shippingContact ? values.shippingContact : ""}
                request={getContacts}
                itemTitleField="lastName"
                itemValueField="id"
                keyField="id"
                name="shippingContact"
                label="Shipping Contact"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.shippingAddress ? values.shippingAddress : ""}
                name="shippingAddress"
                request={getAddresses}
                itemTitleField="address"
                itemValueField="id"
                keyField="id"
                label="Shipping Address"
                onChange={handleChange}
                onBlur={handleBlur}
            />
           
            <FieldSelect
                value={values.shippingEmail ? values.shippingEmail : ""}
                request={getEmails}
                itemTitleField="email"
                itemValueField="id"
                keyField="id"
                name="shippingEmail"
                label="Shipping Email"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.shippingPhone ? values.shippingPhone : ""}
                request={getPhones}
                itemTitleField="phone"
                itemValueField="id"
                keyField="id"
                name="shippingPhone"
                label="Shipping Phone"
                onChange={handleChange}
            />
            <FormControl style={{ gridColumnEnd: "span 2" }}>
                <FormLabel>Shipping Client or Agency</FormLabel>
                <RadioGroup
                    style={{ flexDirection: "row" }}
                    name="shippingEntitiy"
                    value={String(values.shippingEntitiy)}
                    onChange={handleChange}
                >
                    <FormControlLabel control={<Radio />} label="Client" value="client" />
                    <FormControlLabel control={<Radio />} label="Agency" value="agency" />
                </RadioGroup>
            </FormControl> */}
        </Box>
    );
};

export const BillingTab = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10}>
            <FieldSelect
                value={values.billingAddress ? values.billingAddress : ""}
                request={getAddresses}
                itemTitleField="address"
                itemValueField="id"
                keyField="id"
                name="billingAddress"
                label="Billing Address"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.billingContact ? values.billingContact : ""}
                request={getContacts}
                itemTitleField="lastName"
                itemValueField="id"
                keyField="id"
                name="billingContact"
                label="Billing Contact"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.billingPhone ? values.billingPhone : ""}
                request={getPhones}
                itemTitleField="phone"
                itemValueField="id"
                keyField="id"
                name="billingPhone"
                label="Billing Phone"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.billingEmail ? values.billingEmail : ""}
                request={getEmails}
                itemTitleField="email"
                itemValueField="id"
                keyField="id"
                name="billingEmail"
                label="Billing Email"
                onChange={handleChange}
            />
            <FormControl>
                <FormLabel>Billing Client or Agency</FormLabel>
                <RadioGroup
                    name="billingEntitiy"
                    onChange={handleChange}
                    value={values.billingEntitiy}
                    style={{ flexDirection: "row" }}
                >
                    <FormControlLabel control={<Radio />} label="Client" value="client" />
                    <FormControlLabel control={<Radio />} label="Agency" value="agency" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export const TermsTab = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
            <FieldSelect
                request={getCustomers}
                itemTitleField="name"
                itemValueField="id"
                value={values.repOrAgency}
                name="repOrAgency"
                label="Rep / Agency"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FieldSelect
                value={values.requester ? values.requester : ""}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="requester"
                label="Requester"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.CustomerId ? values.CustomerId : ""}
                request={getCustomers}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="CustomerId"
                label="Customer"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.ProjectId ? values.ProjectId : ""}
                request={getProjects}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="ProjectId"
                label="Project"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.JobId ? values.JobId : ""}
                request={getTickets}
                itemTitleField="description"
                itemValueField="id"
                keyField="id"
                name="JobId"
                label="Job"
                onChange={handleChange}
            />
        </Box>
    );
};

export const DocumentForm = ({
    onDone,
    createdSO,
    data,
}: {
    onDone: () => void;
    createdSO: ISO;
    data: ISOComplete;
}) => {
    const divToPrintAcc = useRef<HTMLElement | null>(null);
    const divToPrintRep = useRef<HTMLElement | null>(null);
    const divToPrintCus = useRef<HTMLElement | null>(null);

    // const classes = useStyles();
    const [canSave, setCanSave] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleSaveDocument = async () => {
        try {
            setCanSave(false);
            setIsUploading(true);
            if (divToPrintAcc.current && createdSO?.id) {
                const generatedAccPdf = await exportPdf(divToPrintAcc.current);
                await createAModelDocument(
                    "so",
                    createdSO.id,
                    generatedAccPdf,
                    `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                    `SO_ACC_${createdSO.number}.pdf`
                );
            }
            if (divToPrintRep.current) {
                const generatedRepPdf = await exportPdf(divToPrintRep.current);
                await createAModelDocument(
                    "so",
                    createdSO.id,
                    generatedRepPdf,
                    `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                    `SO_REP_${createdSO.number}.pdf`
                );
            }
            if (divToPrintCus.current) {
                const generatedCusPdf = await exportPdf(divToPrintCus.current);
                await createAModelDocument(
                    "so",
                    createdSO.id,
                    generatedCusPdf,
                    `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                    `SO_CUS_${createdSO.number}.pdf`
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCanSave(true);
            setIsUploading(false);
            onDone();
        }
    };

    return (
        <Box>
            <Typography>We made a pdf from your Sales Order, now you can save it</Typography>
            <div style={{ height: 400, overflowY: "auto" }}>
                <div id="myMm" style={{ height: "1mm" }} />
                <h1>Accounting doc :</h1>
                <div
                    id="divToPrint"
                    ref={(e) => (divToPrintAcc.current = e)}
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <SOAcc data={data} />
                </div>
                <h1>Representative doc :</h1>
                <div
                    id="divToPrint1"
                    ref={(e) => (divToPrintRep.current = e)}
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <SORep data={data} />
                </div>
                <h1>Customer doc :</h1>
                <div
                    id="divToPrint2"
                    ref={(e) => (divToPrintCus.current = e)}
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <SOCus data={data} />
                </div>
            </div>

            <Box textAlign="right">
                <Button disabled={isUploading} kind="add" onClick={handleSaveDocument}>
                    Save
                </Button>
                {isUploading && <LinearProgress />}
            </Box>
        </Box>
    );
};
