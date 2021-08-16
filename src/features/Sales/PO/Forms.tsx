import React, { useEffect, useState, Fragment } from "react";
import { Box, FormControlLabel, Checkbox, Paper, Tabs, Tab } from "@material-ui/core";

import TextField from "../../../app/TextField";
import { FieldSelect } from "../../../app/Inputs";

import { getAllEmployees } from "../../../api/employee";
import { getAddresses } from "../../../api/address";
import { getPhones } from "../../../api/phone";
import { getEmails } from "../../../api/emailAddress";
import { formatTimestampToDate } from "../../../logic/date";
import { getSO } from "../../../api/so";

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
    const [selectedSO, setSelectedSO] = useState<string>();

    return (
        <Fragment>
            <Box display="grid" gridTemplateColumns="1fr" gridColumnGap={10} gridRowGap={10} my={5}>
                <TextField
                    value={values.number}
                    name="number"
                    label="Customer PO Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FieldSelect
                    value={values.SoId}
                    name="SoId"
                    label="SO Number"
                    request={getSO}
                    itemTitleField="SoId"
                    itemValueField="id"
                    onChange={(e) => {
                        setSelectedSO(e.target.value as string);
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                />
                <TextField
                    value={formatTimestampToDate(values.createdAt)}
                    name="number"
                    label="Customer PO Number"
                    disabled
                />
                <FieldSelect
                    value={values.employeeId}
                    name="employeeId"
                    label="SO Issued By"
                    request={getAllEmployees}
                    itemTitleField="EmployeeId"
                    itemValueField="id"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                />
            </Box>
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
        <Fragment>
            <Box my={1} display="grid" gridTemplateColumns="1fr 1fr 1fr " gridColumnGap={10}>
                <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
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
                    <TextField
                        value={values.city}
                        name="city"
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
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
                <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
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
                    <TextField
                        value={values.phone}
                        name="phone"
                        label="Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        style={{ opacity: 0 }}
                    />
                    <TextField
                        value={values.phone}
                        name="phone"
                        label="Phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        style={{ opacity: 0 }}
                    />
                </Box>
                <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
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
            </Box>
            <Box my={2} display="grid" gridTemplateColumns="1fr  1fr " gridColumnGap={10}>
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
                    style={{ gridColumnEnd: "span 2", marginTop: "10px" }}
                    value={values.email}
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>
        </Fragment>
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
        <Fragment>
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
                <Box my={1} display="grid" gridTemplateColumns=" 1fr 1fr " gridGap={10} gridRowGap={10}>
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
                <Fragment>
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
                        gridTemplateColumns=" 1fr 1fr "
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
                </Fragment>
            )}
        </Fragment>
    );
};
