import React, { useEffect, useState, useRef } from "react";
import {
    Typography,
    Box,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
} from "@material-ui/core";


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
import { DateTimePicker } from "@material-ui/pickers";
import { getJobs } from "../../api/job";
import Button from "../../app/Button";
import SOCus from '../../PDFTemplates/SOCus';
import SORep from '../../PDFTemplates/SORep';
import SOAcc from '../../PDFTemplates/SOAcc';
import { exportPdf } from "../../logic/pdf";



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
    const [selectedQuote, setSelectedQuote] = useState<string>();

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
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
            <TextField
                value={values.freightTerms}
                name="freightTerms"
                label="freightTerms"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.paymentTerms}
                name="paymentTerms"
                label="paymentTerms"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.carrier}
                name="carrier"
                label="carrier"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FieldSelect
                value={values.QuoteId}
                name="QuoteId"
                label="QuoteId"
                request={getQuotes}
                itemTitleField="number"
                itemValueField="id"
                onChange={(e) => {
                    setSelectedQuote(e.target.value as string);
                    handleChange(e);
                }}
                onBlur={handleBlur}
            />
            <FieldSelect
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
                style={{ gridColumnEnd: "span 2" }}
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
            <FormControlLabel
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
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
            <DateTimePicker
                style={{ gridColumnEnd: "span 2" }}
                // value={values.estShipDate ? values.estShipDate.substr(0, 10) : ""}
                value={values.estShipDate}
                name="estShipDate"
                label="Estimated ship date"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <DateTimePicker
                style={{ gridColumnEnd: "span 2" }}
                // value={values.actShipDate ? values.actShipDate.substr(0, 10) : ""}
                value={values.actShipDate}
                name="actShipDate"
                label="Actual ship date"
                onChange={handleChange}
                onBlur={handleBlur}
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
            />
            <FormControl style={{ gridColumnEnd: "span 2" }}>
                <FormLabel>Client or Agency</FormLabel>
                <RadioGroup
                    style={{ flexDirection: "row" }}
                    name="shippingEntitiy"
                    value={String(values.shippingEntitiy)}
                    onChange={handleChange}
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
        <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
            <FieldSelect
                value={values.billingAddress ? values.billingAddress : ""}
                request={getAddresses}
                itemTitleField="address"
                itemValueField="id"
                keyField="id"
                name="billingAddress"
                label="billing Address"
                onChange={handleChange}
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
            />
            <FormControl>
                <FormLabel>Client or Agency</FormLabel>
                <RadioGroup
                    name="billingEntitiy"
                    onChange={handleChange}
                    value={values.billingEntitiy}
                    style={{ flexDirection: "row" }}
                >
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
        <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
            <FieldSelect
                value={values.agency ? values.agency : ""}
                request={getAllAgencies}
                itemTitleField="name"
                itemValueField="id"
                keyField="id"
                name="agency"
                label="Agency"
                onChange={handleChange}
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



export const DocumentForm = ({ onDone }: { onDone: () => void }) => {
    const divToPrint = useRef<HTMLElement | null>(null);

    // const classes = useStyles();

    const handleSaveDocument = async () => {
        if (divToPrint.current) {
            await exportPdf(divToPrint.current);
        }
    };

    return (
        <Box>
            <Typography>We made a pdf from your Sales Order, now you can save it</Typography>
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
                    <SOAcc data='amin'/>
                    <SORep data='amin' />
                    <SOCus data='amin' />
                </div>
            </div>

            <Box textAlign="right">
                <Button kind="add" onClick={handleSaveDocument}>
                    Save
                </Button>
                {/* {isUploading && <LinearProgress />} */}
            </Box>
        </Box >
    );
};