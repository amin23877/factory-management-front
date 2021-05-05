import React from "react";
import { Typography, Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";

import TextField from "../../app/TextField";
import { FieldSelect, ArraySelect } from "../../app/Inputs";

import { getAllEmployees } from "../../api/employee";
import { getContacts } from "../../api/contact";
import { getClients } from "../../api/client";
import { getProjects } from "../../api/project";

export const GeneralForm = ({
    handleChange,
    handleBlur,
    values,
    edit,
}: {
    edit?: boolean;
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} id="general">
            <Typography variant="h6">General</Typography>
            {edit && <TextField label="number" value={values.number} style={{ width: "100%" }} disabled />}
            <Box display="flex" justifyContent="space-between">
                <TextField
                    style={{ flex: 1, marginRight: 8 }}
                    value={values.entryDate ? values.entryDate.substr(0, 10) : ""}
                    name="entryDate"
                    label="Entry Date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
                <TextField
                    style={{ flex: 1 }}
                    value={values.expireDate ? values.expireDate.substr(0, 10) : ""}
                    name="expireDate"
                    label="Expire Date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                />
            </Box>
            <Box display="flex" justifyContent="space-between">
                <FieldSelect
                    style={{ flex: 1, marginRight: 8 }}
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
                    style={{ flex: 1 }}
                    value={values.requester}
                    request={getContacts}
                    itemTitleField="name"
                    itemValueField="id"
                    keyField="id"
                    name="requester"
                    label="Requester"
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <FieldSelect
                style={{ width: "100%" }}
                value={values.ClientId}
                request={getClients}
                itemTitleField="name"
                itemValueField="id"
                name="ClientId"
                label="Client"
                onChange={handleChange}
            />
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
            <Typography variant="h6" style={{ margin: "15px", marginLeft: "0px" }}>
                Terms
            </Typography>
            <ArraySelect
                style={{ width: "100%" }}
                value={values.status}
                name="status"
                label="Quote Status"
                onChange={handleChange}
                onBlur={handleBlur}
                items={["New", "Pending", "Fulfiled"]}
            />
            <TextField
                style={{ width: "100%" }}
                value={values.frieghtTerms}
                name="frieghtTerms"
                label="Frieght Terms"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                style={{ width: "100%" }}
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
            <Typography variant="h6" style={{ margin: "15px", marginLeft: "0px" }}>
                Deposit
            </Typography>
            <TextField
                style={{ width: "100%" }}
                value={values.deposit}
                name="deposit"
                label="Deposit"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                style={{ width: "100%" }}
                value={values.depositAmount}
                name="depositAmount"
                label="Deposit Amount"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <FormControl style={{ margin: "0.5em" }}>
                <FormLabel>Deposit</FormLabel>
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
            <Typography variant="h6" style={{ margin: "15px", marginLeft: "0px" }}>
                Ship date and Commission
            </Typography>
            <TextField
                style={{ width: "100%" }}
                value={values.estimatedShipDate ? values.estimatedShipDate.substr(0, 10) : ""}
                name="estimatedShipDate"
                label="Estimated Ship Date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                style={{ width: "100%" }}
                value={values.commissionLabel}
                name="commissionLabel"
                label="Commission Label"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                style={{ width: "100%" }}
                value={values.regularCommission}
                name="regularCommission"
                label="Regular Commission"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
            />
            <TextField
                style={{ width: "100%" }}
                value={values.overageCommission}
                name="overageCommission"
                label="Overage Commission"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
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
