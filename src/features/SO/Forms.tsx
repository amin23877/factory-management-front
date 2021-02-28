import React, { useEffect, useState } from "react";
import { Typography, Box, FormControl, FormLabel, FormControlLabel, Checkbox, RadioGroup, Radio } from "@material-ui/core";

import TextField from "../../app/TextField";
import { FieldSelect, ArraySelect } from "../../app/Inputs";

import { getAllEmployees } from "../../api/employee";
import { getContacts } from "../../api/contact";
import { getClients } from "../../api/client";
import { getAddresses } from "../../api/address";
import { getPhones } from "../../api/phone";
import { getEmails } from "../../api/emailAddress";
import { getProjects } from "../../api/project";
import { getAllAgencies } from "../../api/agency";
import { getQuotes } from "../../api/quote";

export const GeneralForm = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        getQuotes()
            .then((d) => setQuotes(d))
            .catch((e) => console.log(e));
    }, []);

    return (
        <Box m={1}>
            <Typography variant="h6">General</Typography>
            <TextField value={values.number} name="number" label="number" onChange={handleChange} onBlur={handleBlur} />
            <TextField
                value={values.quotenumber}
                name="quotenumber"
                label="quotenumber"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField value={values.location} name="location" label="location" onChange={handleChange} onBlur={handleBlur} fullWidth />
            <TextField value={values.leadTime} name="leadTime" label="leadTime" onChange={handleChange} onBlur={handleBlur} fullWidth />
            <TextField
                value={values.freightTerms}
                name="freightTerms"
                label="freightTerms"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                value={values.paymentTerms}
                name="paymentTerms"
                label="paymentTerms"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField value={values.carrier} name="carrier" label="carrier" onChange={handleChange} onBlur={handleBlur} fullWidth />

            <FieldSelect
                value={values.issuedBy}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="issuedBy"
                label="Issued by"
                onChange={handleChange}
            />
            <Box display="flex" alignItems="center">
                <ArraySelect
                    value={values.status}
                    name="status"
                    label="Status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    items={["New", "Pending", "Fulfiled"]}
                />
                <FormControlLabel
                    name="expodate"
                    value={String(values.expodate)}
                    control={<Checkbox checked={Boolean(values.expodate)} />}
                    label="Expodate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>
        </Box>
    );
};

export const ShippingForm = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box m={1}>
            <Typography variant="h6">Shipping</Typography>
            <Box>
                <TextField
                    value={values.estShipDate ? values.estShipDate.substr(0, 10) : ""}
                    name="estShipDate"
                    label="Estimated ship date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
                <TextField
                    value={values.actShipDate ? values.actShipDate.substr(0, 10) : ""}
                    name="actShipDate"
                    label="Actual ship date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
                <FieldSelect
                    value={values.shippingAddress}
                    name="shippingAddress"
                    request={getAddresses}
                    itemTitleField="address"
                    itemValueField="id"
                    keyField="id"
                    label="Shipping Address"
                    onChange={handleChange}
                    fullWidth
                />
                <FieldSelect
                    value={values.shippingContact}
                    request={getContacts}
                    itemTitleField="lastName"
                    itemValueField="id"
                    keyField="id"
                    name="shippingContact"
                    label="Shipping Contact"
                    onChange={handleChange}
                    fullWidth
                />
                <FieldSelect
                    value={values.shippingPhone}
                    request={getPhones}
                    itemTitleField="phone"
                    itemValueField="id"
                    keyField="id"
                    name="shippingPhone"
                    label="Shipping Phone"
                    onChange={handleChange}
                    fullWidth
                />
                <FieldSelect
                    value={values.shippingEmail}
                    request={getEmails}
                    itemTitleField="email"
                    itemValueField="id"
                    keyField="id"
                    name="shippingEmail"
                    label="Shipping Email"
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl style={{ margin: "0.5em" }}>
                    <FormLabel>Client or Agency</FormLabel>
                    <RadioGroup
                        name="shippingEntitiy"
                        value={String(values.shippingEntitiy)}
                        onChange={handleChange}
                        style={{ flexDirection: "row" }}
                    >
                        <FormControlLabel control={<Radio />} label="Client" value="client" />
                        <FormControlLabel control={<Radio />} label="Agency" value="agency" />
                    </RadioGroup>
                </FormControl>
            </Box>
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
        <Box m={1} id="billing">
            <Typography variant="h6">Billing</Typography>
            <FieldSelect
                value={values.billingAddress}
                request={getAddresses}
                itemTitleField="address"
                itemValueField="id"
                keyField="id"
                name="billingAddress"
                label="billing Address"
                onChange={handleChange}
                fullWidth
            />
            <FieldSelect
                value={values.billingContact}
                request={getContacts}
                itemTitleField="lastName"
                itemValueField="id"
                keyField="id"
                name="billingContact"
                label="billing Contact"
                onChange={handleChange}
                fullWidth
            />
            <FieldSelect
                value={values.billingPhone}
                request={getPhones}
                itemTitleField="phone"
                itemValueField="id"
                keyField="id"
                name="billingPhone"
                label="billing Phone"
                onChange={handleChange}
                fullWidth
            />
            <FieldSelect
                value={values.billingEmail}
                request={getEmails}
                itemTitleField="email"
                itemValueField="id"
                keyField="id"
                name="billingEmail"
                label="billing Email"
                onChange={handleChange}
                fullWidth
            />
            <FormControl style={{ margin: "0.5em" }}>
                <FormLabel>Client or Agency</FormLabel>
                <RadioGroup name="billingEntitiy" onChange={handleChange} value={values.billingEntitiy} style={{ flexDirection: "row" }}>
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
        <Box m={1}>
            <FieldSelect
                value={values.agency}
                request={getAllAgencies}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="agency"
                label="Agency"
                onChange={handleChange}
                fullWidth
            />
            <FieldSelect
                value={values.requester}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="requester"
                label="requester"
                onChange={handleChange}
                fullWidth
            />
            <FieldSelect
                value={values.ClientId}
                request={getClients}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="ClientId"
                label="Client"
                onChange={handleChange}
                fullWidth
            />
            <FieldSelect
                value={values.ProjectId}
                request={getProjects}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="ProjectId"
                label="Project"
                onChange={handleChange}
                fullWidth
            />
        </Box>
    );
};
