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
import { getQuoteById, getQuotes } from "../../api/quote";
import { getAllDivison } from "../../api/division";

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
    const [selectedQuote, setSelectedQuote] = useState<number>();

    useEffect(() => {
        if (selectedQuote) {
            getQuoteById(selectedQuote)
                .then((d) => {
                    const {
                        frieghtTerms,
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
                        frieghtTerms,
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
        <Box m={1}>
            <Typography variant="h6">General</Typography>
            <div style={{ width: "100%", display: "flex" }}>
                <TextField
                    style={{ flex: 1 }}
                    value={values.freightTerms}
                    name="freightTerms"
                    label="freightTerms"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
            </div>
            <div style={{ width: "100%", display: "flex" }}>
                <TextField
                    style={{ flex: 1, marginRight: 8 }}
                    value={values.paymentTerms}
                    name="paymentTerms"
                    label="paymentTerms"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
                <TextField
                    style={{ flex: 1 }}
                    value={values.carrier}
                    name="carrier"
                    label="carrier"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
            </div>

            <FieldSelect
                style={{ flex: 1, width: "100%" }}
                value={values.QuoteId}
                name="QuoteId"
                label="QuoteId"
                request={getQuotes}
                itemTitleField="number"
                itemValueField="id"
                onChange={(e) => {
                    setSelectedQuote(e.target.value as number);
                    handleChange(e);
                }}
                onBlur={handleBlur}
            />
            <FieldSelect
                style={{ flex: 1, width: "100%" }}
                value={values.issuedBy}
                name="issuedBy"
                label="issuedBy"
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FieldSelect
                style={{ flex: 1, width: "100%" }}
                value={values.DivisionId}
                name="DivisionId"
                label="DivisionId"
                request={getAllDivison}
                itemTitleField="name"
                itemValueField="id"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <ArraySelect
                style={{ flex: 1, width: "100%" }}
                value={values.status}
                name="status"
                label="Status"
                onChange={handleChange}
                onBlur={handleBlur}
                items={["New", "Pending", "Fulfiled"]}
            />

            <FormControlLabel
                style={{ marginLeft: "5px" }}
                name="expodate"
                value={String(values.expodate)}
                control={<Checkbox checked={Boolean(values.expodate)} />}
                label="Expodate"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FormControlLabel
                style={{ marginLeft: "5px" }}
                name="noTaxClient"
                value={String(values.noTaxClient)}
                control={<Checkbox checked={Boolean(values.noTaxClient)} />}
                label="No tax client"
                onChange={handleChange}
                onBlur={handleBlur}
            />
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
            <Box mt={1}>
                <TextField
                    style={{ width: "100%" }}
                    value={values.estShipDate ? values.estShipDate.substr(0, 10) : ""}
                    name="estShipDate"
                    label="Estimated ship date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
                <TextField
                    style={{ width: "100%" }}
                    value={values.actShipDate ? values.actShipDate.substr(0, 10) : ""}
                    name="actShipDate"
                    label="Actual ship date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
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
                    fullWidth
                />
                <FieldSelect
                    value={values.shippingContact ? values.shippingContact : ""}
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
                    value={values.shippingPhone ? values.shippingPhone : ""}
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
                    value={values.shippingEmail ? values.shippingEmail : ""}
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
            <Typography variant="h6" style={{ marginBottom: 10 }}>
                Billing
            </Typography>
            <FieldSelect
                value={values.billingAddress ? values.billingAddress : ""}
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
                value={values.billingContact ? values.billingContact : ""}
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
                value={values.billingPhone ? values.billingPhone : ""}
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
                value={values.billingEmail ? values.billingEmail : ""}
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
                value={values.agency ? values.agency : ""}
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
                value={values.requester ? values.requester : ""}
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
                value={values.ClientId ? values.ClientId : ""}
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
                value={values.ProjectId ? values.ProjectId : ""}
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
