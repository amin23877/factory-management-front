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

import { getAllEmployees } from "../../../api/employee";
import { getContacts } from "../../../api/contact";
import { getCustomers } from "../../../api/customer";
import { getAddresses } from "../../../api/address";
import { getPhones } from "../../../api/phone";
import { getEmails } from "../../../api/emailAddress";
import { getProjects } from "../../../api/project";
import { getAllAgencies } from "../../../api/agency";
import { getQuoteById, getQuotes } from "../../../api/quote";
import { getTickets } from "../../../api/ticket";
import Button from "../../../app/Button";
import SOCus from "../../../PDFTemplates/SOCus";
import SORep from "../../../PDFTemplates/SORep";
import SOAcc from "../../../PDFTemplates/SOAcc";
import { exportPdf } from "../../../logic/pdf";
import { ISO, ISOComplete } from "../../../api/so";
import { createAModelDocument } from "../../../api/document";
import { formatTimestampToDate } from "../../../logic/date";

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

                        agency,
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

                        agency,
                        requester,
                        ClientId,
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
                    value={values.QuoteId}
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
                    value={values.ProjectId}
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
                />
                <TextField value={values.csa} name="csa" label="CSA" onChange={handleChange} />

                {/* <TextField
                value={values.freightTerms}
                name="freightTerms"
                label="Freight Terms"
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <TextField
                value={values.paymentTerms}
                name="paymentTerms"
                label="Payment Terms"
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <TextField
                value={values.carrier}
                name="carrier"
                label="Carrier"
                onChange={handleChange}
                onBlur={handleBlur}
                />
                
                <FieldSelect
                value={values.issuedBy}
                name="issuedBy"
                label="Issued By"
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <FieldSelect
                value={values.DivisionId}
                name="DivisionId"
                label="Division"
                request={getAllDivison}
                itemTitleField="name"
                itemValueField="id"
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <ArraySelect
                style={{ gridColumnEnd: "span 2" }}
                value={values.status}
                name="status"
                label="Status"
                onChange={handleChange}
                onBlur={handleBlur}
                items={["New", "Pending", "Fulfiled"]}
                />
                <FormControlLabel
                name="expodate"
                control={<Checkbox checked={Boolean(values.expodate)} />}
                label="Expodate"
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <FormControlLabel
                name="noTaxClient"
                control={<Checkbox checked={Boolean(values.noTaxClient)} />}
                label="No tax client"
                onChange={handleChange}
                onBlur={handleBlur}
            /> */}
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
                    name="call"
                    control={<Checkbox checked={Boolean(values.call)} />}
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
            <Box my={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                <TextField
                    value={values.rep}
                    name="rep"
                    label="Rep / Agency"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.address}
                    name="address"
                    label="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField value={values.city} name="city" label="City" onChange={handleChange} onBlur={handleBlur} />
                <TextField
                    value={values.state}
                    name="state"
                    label="State"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.zipCode}
                    name="zipCode"
                    label="Zip Code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>
            <Box my={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                <TextField
                    value={values.requester}
                    name="requester"
                    label="Requester"
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
                <div />
                <div />
                <div />
            </Box>
            <Box my={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                <TextField
                    value={values.client}
                    name="client"
                    label="Client"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.contactName}
                    name="contactName"
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
                />
            </Box>
            <Box my={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                <TextField
                    value={values.fullTimeContact}
                    name="fullTimeContact"
                    label="24 Hour Contact"
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
                    value={values.email}
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div />
                <div />
                <div />
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
            {/* Company Attn Address City State Zip Code Country Phone Email
             Company Attn Address City State Zip Code Country Phone Email */}
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
                <Box my={1} display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={10} gridRowGap={10}>
                    <FieldSelect
                        value={values.billingCompany ? values.billingCompany : ""}
                        request={getAddresses}
                        itemTitleField="Company"
                        itemValueField="id"
                        keyField="id"
                        name="billingCompany"
                        label="Company"
                        onChange={handleChange}
                    />
                    <FieldSelect
                        value={values.billingAttn ? values.billingAttn : ""}
                        request={getAddresses}
                        itemTitleField="Attn"
                        itemValueField="id"
                        keyField="id"
                        name="billingAttn"
                        label="Attn"
                        onChange={handleChange}
                    />

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
                        value={values.billingCity ? values.billingCity : ""}
                        request={getAddresses}
                        itemTitleField="city"
                        itemValueField="id"
                        keyField="id"
                        name="billingCity"
                        label="City"
                        onChange={handleChange}
                    />
                    <FieldSelect
                        value={values.billingState ? values.billingState : ""}
                        request={getAddresses}
                        itemTitleField="state"
                        itemValueField="id"
                        keyField="id"
                        name="billingState"
                        label="State"
                        onChange={handleChange}
                    />
                    <FieldSelect
                        value={values.billingZipCode ? values.billingZipCode : ""}
                        request={getAddresses}
                        itemTitleField="zipCode"
                        itemValueField="id"
                        keyField="id"
                        name="billingZipCode"
                        label="Zip Code"
                        onChange={handleChange}
                    />
                    <FieldSelect
                        value={values.billingCountry ? values.billingCountry : ""}
                        request={getAddresses}
                        itemTitleField="country"
                        itemValueField="id"
                        keyField="id"
                        name="billingCountry"
                        label="Country"
                        onChange={handleChange}
                    />
                    {/* <FieldSelect
                        value={values.billingContact ? values.billingContact : ""}
                        request={getContacts}
                        itemTitleField="lastName"
                        itemValueField="id"
                        keyField="id"
                        name="billingContact"
                        label="Billing Contact"
                        onChange={handleChange}
                    /> */}
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
                </Box>
            )}
            {activeTab === 1 && (
                <>
                    <Paper
                        style={{
                            margin: "0.5em 0",
                            padding: "0 0.5em 0 1em",
                            backgroundColor: "#eee",
                            gridColumnEnd: "span 4",
                        }}
                    >
                        <FormControlLabel
                            name="willCall"
                            control={<Checkbox checked={Boolean(values.willCall)} />}
                            label="Will Call"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Paper>
                    <Box
                        my={1}
                        display="grid"
                        gridTemplateColumns="1fr 1fr 1fr"
                        gridGap={10}
                        gridRowGap={10}
                        gridColumnGap={10}
                    >
                        {/* <FieldSelect
                        value={values.shippingContact ? values.shippingContact : ""}
                        request={getContacts}
                        itemTitleField="lastName"
                        itemValueField="id"
                        keyField="id"
                        name="shippingContact"
                        label="Shipping Contact"
                        onChange={handleChange}
                    /> */}
                        <FieldSelect
                            value={values.shippingCompany ? values.shippingCompany : ""}
                            request={getAddresses}
                            itemTitleField="Company"
                            itemValueField="id"
                            keyField="id"
                            name="shippingCompany"
                            label="Company"
                            onChange={handleChange}
                            disabled={Boolean(values.willCall)}
                        />
                        <FieldSelect
                            value={values.shippingAttn ? values.shippingAttn : ""}
                            request={getAddresses}
                            itemTitleField="Attn"
                            itemValueField="id"
                            keyField="id"
                            name="shippingAttn"
                            label="Attn"
                            onChange={handleChange}
                            disabled={Boolean(values.willCall)}
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
                            disabled={Boolean(values.willCall)}
                        />
                        <FieldSelect
                            value={values.shippingCity ? values.shippingCity : ""}
                            request={getAddresses}
                            itemTitleField="city"
                            itemValueField="id"
                            keyField="id"
                            name="shippingCity"
                            label="City"
                            onChange={handleChange}
                            disabled={Boolean(values.willCall)}
                        />
                        <FieldSelect
                            value={values.shippingState ? values.shippingState : ""}
                            request={getAddresses}
                            itemTitleField="state"
                            itemValueField="id"
                            keyField="id"
                            name="shippingState"
                            label="State"
                            onChange={handleChange}
                            disabled={Boolean(values.willCall)}
                        />
                        <FieldSelect
                            value={values.shippingZipCode ? values.shippingZipCode : ""}
                            request={getAddresses}
                            itemTitleField="zipCode"
                            itemValueField="id"
                            keyField="id"
                            name="shippingZipCode"
                            label="Zip Code"
                            onChange={handleChange}
                            disabled={Boolean(values.willCall)}
                        />
                        <FieldSelect
                            value={values.shippingCountry ? values.shippingCountry : ""}
                            request={getAddresses}
                            itemTitleField="country"
                            itemValueField="id"
                            keyField="id"
                            name="shippingCountry"
                            label="Country"
                            onChange={handleChange}
                            disabled={Boolean(values.willCall)}
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
                            disabled={Boolean(values.willCall)}
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
                            disabled={Boolean(values.willCall)}
                        />
                    </Box>
                </>
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
                        value={values.commissionBaseAmt}
                        name="commissionBaseAmt"
                        label="Commission Base Amt"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.regularCommission}
                        name="regularCommission"
                        label="Regular Commission %"
                        type="number"
                        placeholder="0.00%"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.regularCommission * values.price * values.quantity}
                        name="regularCommission"
                        label="Regular Commission $"
                        placeholder="0.00$"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        disabled
                    />
                    <TextField
                        value={values.overageCommission}
                        name="overageCommission"
                        label="Overage Commission"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        value={values.totalCommission}
                        name="totalCommission"
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
                        value={values.cost}
                        name="cost"
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
                    <TextField value={values.margin} name="margin" label="Margin" disabled />
                    <TextField value={values.marginPercent} name="marginPercent" label="Margin %" disabled />
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
                }}
            >
                <FormControlLabel
                    // style={{ gridColumnEnd: "span 2" }}
                    name="release"
                    control={<Checkbox checked={Boolean(values.release)} />}
                    label="Release to Production"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={Boolean(values.release)}
                />
            </Paper>
            <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                <TextField
                    value={values.number}
                    name="number"
                    label="Customer PO"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={formatTimestampToDate(values.createdAt)}
                    name="POReceivedDate"
                    label="PO Received Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FieldSelect
                    value={values.issuedBy}
                    name="issuedBy"
                    label="Issued By"
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={formatTimestampToDate(values.releaseDate)}
                    name="releaseDate"
                    label="Release Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={formatTimestampToDate(values.expedite)}
                    name="expedite"
                    label="Expedite"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    style={{ gridColumnEnd: "span 2" }}
                    value={values.status}
                    name="status"
                    label="SO Status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    items={["New", "Pending", "Fulfilled"]}
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
                value={values.estShipDate}
                name="estShipDate"
                label="Estimated ship date"
                onChange={(date) => setFieldValue("estShipDate", date)}
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
                value={values.actShipDate}
                name="actShipDate"
                label="Actual ship date"
                onChange={(date) => setFieldValue("actShipDate", date)}
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
                value={values.agency ? values.agency : ""}
                request={getAllAgencies}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="agency"
                label="Agency"
                onChange={handleChange}
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
                value={values.ClientId ? values.ClientId : ""}
                request={getCustomers}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="ClientId"
                label="Client"
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
    createdSO?: ISO;
    data?: ISOComplete;
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
                const generatedPdf = await exportPdf(divToPrintAcc.current);
                console.log(generatedPdf);
                const resp = await createAModelDocument(
                    "so",
                    createdSO.id,
                    generatedPdf,
                    `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                    `SO_ACC_${createdSO.number}.pdf`
                );
                if (resp) {
                    if (divToPrintRep.current) {
                        const generatedPdf = await exportPdf(divToPrintRep.current);
                        console.log(generatedPdf);
                        const resp = await createAModelDocument(
                            "so",
                            createdSO.id,
                            generatedPdf,
                            `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                            `SO_REP_${createdSO.number}.pdf`
                        );
                        if (resp) {
                            if (divToPrintCus.current) {
                                const generatedPdf = await exportPdf(divToPrintCus.current);
                                console.log(generatedPdf);
                                const resp = await createAModelDocument(
                                    "so",
                                    createdSO.id,
                                    generatedPdf,
                                    `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                                    `SO_CUS_${createdSO.number}.pdf`
                                );
                                if (resp) {
                                    onDone();
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCanSave(true);
            setIsUploading(false);
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
                <Button kind="add" onClick={handleSaveDocument}>
                    Save
                </Button>
                {isUploading && <LinearProgress />}
            </Box>
        </Box>
    );
};
