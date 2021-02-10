import React from "react";
import { Typography, TextField, Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";

import { FieldSelect, ArraySelect } from "../../app/Inputs";

import { getAllEmployees } from "../../api/employee";
import { getContacts } from "../../api/contact";
import { getClients } from "../../api/client";
import { getAddresses } from "../../api/address";
import { getPhones } from "../../api/phone";
import { getEmails } from "../../api/emailAddress";
import { getProjects } from "../../api/project";

export const GeneralForm = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} id="general">
            <Typography variant="h6">General</Typography>
            <TextField
                value={values.entryDate.substr(0, 10)}
                name="entryDate"
                label="Entry Date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
            />
            <TextField
                value={values.expireDate.substr(0, 10)}
                name="expireDate"
                label="Expire Date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
            />
            <TextField value={values.location} name="location" label="locaton" onChange={handleChange} onBlur={handleBlur} fullWidth />
            <TextField value={values.leadTime} name="leadTime" label="lead Time" onChange={handleChange} onBlur={handleBlur} fullWidth />

            <FieldSelect
                value={values.salesperson}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="salesperson"
                label="Sales person"
                onChange={handleChange}
                fullWidth
            />
            <FieldSelect
                value={values.requester}
                request={getContacts}
                itemTitleField="lastName"
                itemValueField="id"
                keyField="id"
                name="requester"
                label="Requester"
                onChange={handleChange}
                fullWidth
            />
            <FieldSelect
                value={values.client}
                request={getClients}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="client"
                label="Client"
                onChange={handleChange}
                fullWidth
            />
            <FormControl style={{ margin: "0.5em" }}>
                <FormLabel>Is this client No Tax?</FormLabel>
                <RadioGroup value={String(values.noTaxClient)} name="noTaxClient" onChange={handleChange} style={{ flexDirection: "row" }}>
                    <FormControlLabel control={<Radio />} label="Yes" value="true" />
                    <FormControlLabel control={<Radio />} label="No" value="false" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export const ShippingTab = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} id="shipping">
            <Typography variant="h6">Shipping</Typography>
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
                <FormLabel>Is this shipping for Client or Agency?</FormLabel>
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
        <Box my={1} id="billing">
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
                <FormLabel>Is this billing for Client or Agency?</FormLabel>
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
        <Box my={1} id="terms">
            <Typography variant="h6">Terms</Typography>
            <TextField
                value={values.department}
                name="department"
                label="Department"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                value={values.acctStatus}
                name="acctStatus"
                label="acctStatus"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                value={values.creditTerms}
                name="creditTerms"
                label="Credit Terms"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />

            <ArraySelect
                value={values.quoteStatus}
                name="quoteStatus"
                label="Quote Status"
                onChange={handleChange}
                onBlur={handleBlur}
                items={["New", "Pending", "Fulfiled"]}
            />
            <TextField
                value={values.frieghtTerms}
                name="frieghtTerms"
                label="Frieght Terms"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                value={values.paymentTerms}
                name="paymentTerms"
                label="Payment Terms"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
        </Box>
    );
};

export const DepositTab = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} id="deposit">
            <Typography variant="h6">Deposit</Typography>
            <TextField
                value={values.deposit}
                name="deposit"
                label="Deposit"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                value={values.depositAmount}
                name="depositAmount"
                label="Deposit Amount"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <FormControl style={{ margin: "0.5em" }}>
                <FormLabel>Is Deposit Required?</FormLabel>
                <RadioGroup
                    name="depositRequired"
                    value={String(values.depositRequired)}
                    onChange={handleChange}
                    style={{ flexDirection: "row" }}
                >
                    <FormControlLabel control={<Radio />} label="Yes" value="true" />
                    <FormControlLabel control={<Radio />} label="No" value="false" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export const CommissionTab = ({
    handleChange,
    handleBlur,
    values,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} id="commission">
            <Typography variant="h6">Ship date and Commission</Typography>
            <TextField
                value={values.estimatedShipDate.substr(0, 10)}
                name="estimatedShipDate"
                label="Estimated Ship Date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
            />
            <TextField
                value={values.commissionLabel}
                name="commissionLabel"
                label="Commission Label"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                value={values.regularCommission}
                name="regularCommission"
                label="Regular Commission"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                value={values.overageCommission}
                name="overageCommission"
                label="Overage Commission"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />

            <FieldSelect
                value={values.EmployeeId}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                keyField="id"
                name="EmployeeId"
                label="Employee"
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
