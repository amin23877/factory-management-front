import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, Paper, Tabs, Tab } from "@material-ui/core";

import TextField from "../../../app/TextField";
import { FieldSelect } from "../../../app/Inputs";

import { getAllEmployees } from "../../../api/employee";
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
        <>
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
                    itemTitleField="number"
                    itemValueField="id"
                    onChange={(e) => {
                        setSelectedSO(e.target.value as string);
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                />
                <FieldSelect
                    value={values.employeeId}
                    name="employeeId"
                    label="SO Issued By"
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>
        </>
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
        <>
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
                </Box>
            </Box>
        </>
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
