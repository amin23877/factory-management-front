import React, { useState } from "react";
import { Box, FormControlLabel, Checkbox, Paper, Tabs, Tab } from "@material-ui/core";

import TextField from "../../../app/TextField";
import { FieldSelect } from "../../../app/Inputs";

import { getAllEmployees } from "../../../api/employee";
import { getSO } from "../../../api/so";
import { getCustomers } from "../../../api/customer";
import { getAllModelContact } from "../../../api/contact";

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
                    value={typeof values.SOId === "string" ? values.SOId : values.SOId?.id}
                    name="SOId"
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
                <TextField value={values.SOId?.issuedBy?.username} label="SO Issued By" disabled />
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
                <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
                    <FieldSelect
                        value={typeof values.repOrAgency === "string" ? values.repOrAgency : values.repOrAgency?.id}
                        request={getCustomers}
                        itemTitleField="name"
                        itemValueField="id"
                        name="repOrAgency"
                        label="rep/ Agency"
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
                        value={values.billingAddressZipcode}
                        name="billingAddressZipcode"
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
                        value={values.shippingAddressZipcode}
                        name="shippingAddressZipcode"
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
