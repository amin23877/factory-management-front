import React, { useEffect, useRef, useState } from "react";
import {
    LinearProgress,
    Typography,
    Box,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import TextField from "../../../app/TextField";
import Button from "../../../app/Button";
import { FieldSelect, ArraySelect } from "../../../app/Inputs";
import { getAllEmployees } from "../../../api/employee";
import { getContacts } from "../../../api/contact";
import { getClients } from "../../../api/client";
import { getProjects } from "../../../api/project";
import { getItems } from "../../../api/items";
import { exportPdf } from "../../../logic/pdf";
import { getJobs } from "../../../api/job";
import QuotePDF from "../../../PDFTemplates/Quote";
import { createAModelDocument } from "../../../api/document";
import { IQuoteComplete } from "../../../api/quote";

export const DocumentForm = ({
    onDone,
    createdQoute,
    data,
}: {
    onDone: () => void;
    createdQoute: any;
    data: IQuoteComplete;
}) => {
    const divToPrint = useRef<HTMLElement | null>(null);

    const [canSave, setCanSave] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleSaveDocument = async () => {
        try {
            setCanSave(false);
            setIsUploading(true);
            if (divToPrint.current && createdQoute.id) {
                const generatedPdf = await exportPdf(divToPrint.current);
                console.log(generatedPdf);
                const resp = await createAModelDocument(
                    "quote",
                    createdQoute.id,
                    generatedPdf,
                    `${new Date().toJSON().slice(0, 19)} - ${createdQoute.number}`,
                    `PO_${createdQoute.number}.pdf`
                );
                if (resp) {
                    onDone();
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
                    <QuotePDF data={data} createdQuote={createdQoute} />
                </div>
            </div>
            <Box textAlign="right">
                <Button disabled={false} kind="add" onClick={handleSaveDocument}>
                    Save
                </Button>
                {isUploading && <LinearProgress />}
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
                    getOptionList={(data) => data.items}
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
    setFieldValue,
}: {
    edit?: boolean;
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
    setFieldValue: any;
}) => {
    return (
        <>
            <Typography variant="h6">General</Typography>
            <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
                {edit && <TextField label="number" value={values.number} style={{ width: "100%" }} disabled />}
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
                <TextField value={values.leadTime} name="leadTime" label="Lead Time" onChange={handleChange} />
                <DateTimePicker
                    size="small"
                    value={values.entryDate}
                    name="entryDate"
                    label="Entry Date"
                    onChange={(date) => setFieldValue("entryDate", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    size="small"
                    value={values.expireDate}
                    name="expireDate"
                    label="Expire Date"
                    onChange={(date) => setFieldValue("expireDate", date)}
                    onBlur={handleBlur}
                />

                <DateTimePicker
                    size="small"
                    value={values.estimatedShipDate}
                    name="estimatedShipDate"
                    label="Estimated Ship Date"
                    onChange={(date) => setFieldValue("estimatedShipDate", date)}
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
            <FieldSelect
                value={values.JobId ? values.JobId : ""}
                request={getJobs}
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