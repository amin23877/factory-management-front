import React, { useRef } from "react";
import {
    Typography,
    Box,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    LinearProgress,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import { FieldSelect, ArraySelect } from "../../app/Inputs";

import { getAllEmployees } from "../../api/employee";
import { getContacts } from "../../api/contact";
import { getClients } from "../../api/client";
import { getProjects } from "../../api/project";
import { getItems } from "../../api/items";
import { exportPdf } from "../../logic/pdf";

export const DocumentForm = ({ onDone }: { onDone: () => void }) => {
    const divToPrint = useRef<HTMLElement | null>(null);

    const handleSaveDocument = async () => {
        if (divToPrint.current) {
            await exportPdf(divToPrint.current);
        }
    };

    return (
        <Box>
            <Typography>We made a pdf from your Quote, now you can save it</Typography>
            <div style={{ height: 400, overflowY: "auto" }}>
                <div id="myMm" style={{ height: "1mm" }} />
                <div
                    id="divToPrint"
                    ref={(e) => (divToPrint.current = e)}
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <h1>PDF Goes here</h1>
                </div>
            </div>
            <Box textAlign="right">
                <Button kind="add" onClick={handleSaveDocument}>
                    Save
                </Button>
                {/* {isUploading && <LinearProgress />} */}
            </Box>
        </Box>
    );
};

export const LineItemForm = ({
    handleChange,
    handleBlur,
    handleDelete,
    values,
    errors,
    touched,
    LIData,
    isSubmitting,
}: {
    values: any;
    errors: any;
    touched: any;
    LIData: any;
    isSubmitting: boolean;
    handleDelete: () => void;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box>
            <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                <FieldSelect
                    style={{ gridColumnEnd: "span 2" }}
                    label="Item"
                    name="ItemId"
                    value={values.ItemId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    request={getItems}
                    itemTitleField="name"
                    itemValueField="id"
                    error={Boolean(errors.ItemId && touched.ItemId)}
                />
                <TextField
                    placeholder="description"
                    label="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    placeholder="quantity"
                    label="quantity"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.quantity && touched.quantity)}
                    helperText={errors.quantity}
                />
                <TextField
                    placeholder="price"
                    label="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.price && touched.price)}
                    helperText={errors.price}
                />
                <TextField
                    placeholder="index"
                    label="index"
                    name="index"
                    value={values.index}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.index && touched.index)}
                    helperText={errors.index}
                />
                <FormControl style={{ margin: "0.5em" }}>
                    <FormLabel>Tax?</FormLabel>
                    <RadioGroup
                        value={String(values.tax)}
                        name="tax"
                        onChange={handleChange}
                        style={{ flexDirection: "row" }}
                    >
                        <FormControlLabel control={<Radio />} label="Yes" value="true" />
                        <FormControlLabel control={<Radio />} label="No" value="false" />
                    </RadioGroup>
                </FormControl>
            </Box>

            <Box textAlign="center">
                <Button disabled={isSubmitting} type="submit" kind={LIData ? "edit" : "add"}>
                    {LIData ? "Save" : "Add"}
                </Button>
                {LIData && (
                    <Button kind="delete" style={{ margin: "0 1em" }} onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </Box>
        </Box>
    );
};

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
        <>
            <Typography variant="h6">General</Typography>
            <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                {edit && <TextField label="number" value={values.number} style={{ width: "100%" }} disabled />}
                <DateTimePicker
                    value={values.entryDate}
                    name="entryDate"
                    label="Entry Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    value={values.expireDate}
                    name="expireDate"
                    label="Expire Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <FieldSelect
                    value={values.salesperson}
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    keyField="id"
                    name="salesperson"
                    label="Sales person"
                    onChange={handleChange}
                />
                <FieldSelect
                    value={values.requester}
                    request={getContacts}
                    itemTitleField="name"
                    itemValueField="id"
                    keyField="id"
                    name="requester"
                    label="Requester"
                    onChange={handleChange}
                />
                <FieldSelect
                    value={values.ClientId}
                    request={getClients}
                    itemTitleField="name"
                    itemValueField="id"
                    name="ClientId"
                    label="Client"
                    onChange={handleChange}
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
                />
                <DateTimePicker
                    value={values.estimatedShipDate}
                    name="estimatedShipDate"
                    label="Estimated Ship Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>
        </>
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
        <Box my={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
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
            />
            <TextField
                style={{ width: "100%" }}
                value={values.paymentTerms}
                name="paymentTerms"
                label="Payment Terms"
                onChange={handleChange}
                onBlur={handleBlur}
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
        <Box my={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
            <TextField
                value={values.deposit}
                name="deposit"
                label="Deposit"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.depositAmount}
                name="depositAmount"
                label="Deposit Amount"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FormControl>
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
        <Box my={1} display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
            <TextField
                value={values.commissionLabel}
                name="commissionLabel"
                label="Commission Label"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.regularCommission}
                name="regularCommission"
                label="Regular Commission"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.overageCommission}
                name="overageCommission"
                label="Overage Commission"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Box>
    );
};
