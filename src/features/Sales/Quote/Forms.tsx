import React, { useRef, useState } from "react";
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
import { getProjects } from "../../../api/project";
import { getItems } from "../../../api/items";
import { exportPdf } from "../../../logic/pdf";
import { getTickets } from "../../../api/ticket";
import QuotePDF from "../../../PDFTemplates/Quote";
import { createAModelDocument } from "../../../api/document";
import { IQuoteComplete } from "../../../api/quote";
// import { getContacts } from "../../../api/contact";
import { getCustomers } from "../../../api/customer";
import LinkSelect from "../../../app/Inputs/LinkFields";
import { getSO } from "../../../api/so";

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

    const [isUploading, setIsUploading] = useState(false);

    const handleSaveDocument = async () => {
        try {
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
                    getOptionList={(data) => data.result}
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
            <Box my={1} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridColumnGap={5} gridRowGap={5}>
                {edit && <TextField label="Quote ID" value={values.number} disabled />}
                {/* {edit && <TextField label="SO ID" value={values.number} style={{ width: "100%" }} disabled />} */}
                {edit && (
                    <LinkSelect
                        value={typeof values.SOId === "string" ? values.SOId : values.SOId}
                        label="SO ID"
                        request={getSO}
                        getOptionList={(resp) => resp?.result}
                        getOptionLabel={(so) => so?.number}
                        getOptionValue={(so) => so?.id}
                        onChange={(e, nv) => {
                            setFieldValue("SOId", nv?.id);
                        }}
                        onBlur={handleBlur}
                        url="/panel/so"
                        disabled
                    />
                )}
                <DateTimePicker
                    style={{ fontSize: "0.8rem" }}
                    size="small"
                    value={values.entryDate}
                    name="entryDate"
                    label="Entry Date"
                    onChange={(date) => setFieldValue("entryDate", date)}
                    onBlur={handleBlur}
                />
                <DateTimePicker
                    style={{ fontSize: "0.8rem" }}
                    size="small"
                    value={values.expireDate}
                    name="expireDate"
                    label="Expire Date"
                    onChange={(date) => setFieldValue("expireDate", date)}
                    onBlur={handleBlur}
                />
                <TextField value={values.location} name="location" label="Location" onChange={handleChange} />
                <LinkSelect
                    value={typeof values.ProjectId === "string" ? values.ProjectId : values.ProjectId}
                    label="Project Name"
                    request={getProjects}
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(project) => project?.name}
                    getOptionValue={(project) => project?.id}
                    onChange={(e, nv) => {
                        setFieldValue("ProjectId", nv?.id);
                    }}
                    onBlur={handleBlur}
                    url="/panel/project"
                />
                <FieldSelect
                    value={typeof values.salesperson === "string" ? values.salesperson : values.salesperson?.id}
                    request={getAllEmployees}
                    itemTitleField="username"
                    itemValueField="id"
                    keyField="id"
                    name="salesperson"
                    label="Sales person"
                    onChange={handleChange}
                />
                <TextField value={values.leadTime} name="leadTime" label="Lead Time" onChange={handleChange} />
                <TextField
                    value={values.note}
                    style={{ gridColumnEnd: "span 4" }}
                    name="note"
                    label="Note"
                    onChange={handleChange}
                    multiline
                    rows={3}
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
        <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
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
                value={values.freightTerms}
                name="freightTerms"
                label="Freight Terms"
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

export const EntitiesTab = ({
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
        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr " gridColumnGap={5}>
            <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={5}>
                {/* <FieldSelect
                    value={typeof values.repOrAgency === "string" ? values.repOrAgency : values.repOrAgency?.id}
                    getOptionList={(resp) => resp.result}
                    request={getCustomers}
                    itemTitleField="name"
                    itemValueField="id"
                    name="repOrAgency"
                    label="rep / Agency"
                    onChange={handleChange}
                    onBlur={handleBlur}
                /> */}
                <LinkSelect
                    value={typeof values.repOrAgency === "string" ? values.repOrAgency : values.repOrAgency?.id}
                    label="rep / Agency"
                    request={getCustomers}
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(cus) => cus?.name}
                    getOptionValue={(cus) => cus?.id}
                    onChange={(e, nv) => {
                        setFieldValue("repOrAgency", nv?.id);
                    }}
                    onBlur={handleBlur}
                    url="/panel/customer"
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
            <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={5}>
                <TextField
                    value={values.requesterName}
                    name="requesterName"
                    label="Requester Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.requesterMail}
                    name="requesterMail"
                    label="Requester Mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField
                    value={values.requesterPhone}
                    name="requesterPhone"
                    label="Requester Phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <TextField style={{ opacity: 0 }} />
                <TextField style={{ opacity: 0 }} />
            </Box>
            <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={5}>
                {/* <TextField
                    value={values.client}
                    name="client"
                    label="Client"
                    onChange={handleChange}
                    onBlur={handleBlur}
                /> */}
                {/* <FieldSelect
                    value={typeof values.client === "string" ? values.client : values.client?.id}
                    getOptionList={(resp) => resp.result}
                    request={getCustomers}
                    itemTitleField="name"
                    itemValueField="id"
                    name="client"
                    label="Client"
                    onChange={handleChange}
                /> */}
                <LinkSelect
                    value={typeof values.client === "string" ? values.client : values.client?.id}
                    label="Client"
                    request={getCustomers}
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(cus) => cus?.name}
                    getOptionValue={(cus) => cus?.id}
                    onChange={(e, nv) => {
                        setFieldValue("client", nv?.id);
                    }}
                    onBlur={handleBlur}
                    url="/panel/customer"
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
        </Box>
    );
};

export const CommissionTab = ({
    add,
    handleChange,
    handleBlur,
    values,
}: {
    add?: boolean;
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
}) => {
    return (
        <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={5} gridGap={5}>
            <TextField
                style={{ gridColumnEnd: "span 2" }}
                value={values.commissionLabel}
                name="commissionLabel"
                label="Commission Rate"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                style={add ? { gridColumnEnd: "span 2" } : {}}
                value={values.regularCommission}
                name="regularCommission"
                label="Regular Commission %"
                type="number"
                placeholder="0.00%"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {!add && (
                <TextField
                    value={values.regularCommission * values.price * values.quantity}
                    name="regularCommission"
                    label="Regular Commission $"
                    placeholder="0.00$"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    disabled
                />
            )}
            <TextField
                style={{ gridColumnEnd: "span 2" }}
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
