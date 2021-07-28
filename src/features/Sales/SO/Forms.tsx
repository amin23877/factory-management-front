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
    LinearProgress,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import TextField from "../../../app/TextField";
import { FieldSelect, ArraySelect } from "../../../app/Inputs";

import { getAllEmployees } from "../../../api/employee";
import { getContacts } from "../../../api/contact";
import { getClients } from "../../../api/client";
import { getAddresses } from "../../../api/address";
import { getPhones } from "../../../api/phone";
import { getEmails } from "../../../api/emailAddress";
import { getProjects } from "../../../api/project";
import { getAllAgencies } from "../../../api/agency";
import { getQuoteById, getQuotes } from "../../../api/quote";
import { getAllDivison } from "../../../api/division";
import { getJobs } from "../../../api/job";
import Button from "../../../app/Button";
import SOCus from "../../../PDFTemplates/SOCus";
import SORep from "../../../PDFTemplates/SORep";
import SOAcc from "../../../PDFTemplates/SOAcc";
import { exportPdf } from "../../../logic/pdf";
import { ISO, ISOComplete } from "../../../api/so";
import { createAModelDocument } from "../../../api/document";

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
                label="Freight Terms"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.paymentTerms}
                name="paymentTerms"
                label="Payment Terms"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <TextField
                value={values.carrier}
                name="carrier"
                label="Carrier"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FieldSelect
                value={values.QuoteId}
                name="QuoteId"
                label="Quote"
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
                label="Issued By"
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FieldSelect
                value={values.DivisionId}
                name="DivisionId"
                label="Division"
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
                control={<Checkbox checked={Boolean(values.expodate)} />}
                label="Expodate"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <FormControlLabel
                name="noTaxClient"
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
    setFieldValue,
}: {
    values: any;
    handleChange: (a: any) => void;
    handleBlur: (a: any) => void;
    setFieldValue: any;
}) => {
    return (
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
            <DateTimePicker
                style={{ gridColumnEnd: "span 2" }}
                size="small"
                value={values.estShipDate}
                name="estShipDate"
                label="Estimated ship date"
                onChange={(date) => setFieldValue("estShipDate", date)}
                onBlur={handleBlur}
            />
            <DateTimePicker
                style={{ gridColumnEnd: "span 2" }}
                size="small"
                value={values.actShipDate}
                name="actShipDate"
                label="Actual ship date"
                onChange={(date) => setFieldValue("actShipDate", date)}
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
                <FormLabel>Shipping Client or Agency</FormLabel>
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
                label="Billing Address"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.billingContact ? values.billingContact : ""}
                request={getContacts}
                itemTitleField="lastName"
                itemValueField="id"
                keyField="id"
                name="billingContact"
                label="Billing Contact"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.billingPhone ? values.billingPhone : ""}
                request={getPhones}
                itemTitleField="phone"
                itemValueField="id"
                keyField="id"
                name="billingPhone"
                label="Billing Phone"
                onChange={handleChange}
            />
            <FieldSelect
                value={values.billingEmail ? values.billingEmail : ""}
                request={getEmails}
                itemTitleField="email"
                itemValueField="id"
                keyField="id"
                name="billingEmail"
                label="Billing Email"
                onChange={handleChange}
            />
            <FormControl>
                <FormLabel>Billing Client or Agency</FormLabel>
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
                label="Requester"
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

export const DocumentForm = ({
    onDone,
    createdSO,
    data,
}: {
    onDone: () => void;
    createdSO?: ISO;
    data?: ISOComplete;
}) => {
    const divToPrintAcc = useRef<HTMLElement | null>(null);
    const divToPrintRep = useRef<HTMLElement | null>(null);
    const divToPrintCus = useRef<HTMLElement | null>(null);

    // const classes = useStyles();
    const [canSave, setCanSave] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleSaveDocument = async () => {
        try {
            setCanSave(false);
            setIsUploading(true);
            if (divToPrintAcc.current && createdSO?.id) {
                const generatedPdf = await exportPdf(divToPrintAcc.current);
                console.log(generatedPdf);
                const resp = await createAModelDocument(
                    "so",
                    createdSO.id,
                    generatedPdf,
                    `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                    `SO_ACC_${createdSO.number}.pdf`
                );
                if (resp) {
                    if (divToPrintRep.current) {
                        const generatedPdf = await exportPdf(divToPrintRep.current);
                        console.log(generatedPdf);
                        const resp = await createAModelDocument(
                            "so",
                            createdSO.id,
                            generatedPdf,
                            `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                            `SO_REP_${createdSO.number}.pdf`
                        );
                        if (resp) {
                            if (divToPrintCus.current) {
                                const generatedPdf = await exportPdf(divToPrintCus.current);
                                console.log(generatedPdf);
                                const resp = await createAModelDocument(
                                    "so",
                                    createdSO.id,
                                    generatedPdf,
                                    `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
                                    `SO_CUS_${createdSO.number}.pdf`
                                );
                                if (resp) {
                                    onDone();
                                }
                            }
                        }
                    }
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
            <Typography>We made a pdf from your Sales Order, now you can save it</Typography>
            <div style={{ height: 400, overflowY: "auto" }}>
                <div id="myMm" style={{ height: "1mm" }} />
                <h1>Accounting doc :</h1>
                <div
                    id="divToPrint"
                    ref={(e) => (divToPrintAcc.current = e)}
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <SOAcc data={data} />
                </div>
                <h1>Representative doc :</h1>
                <div
                    id="divToPrint1"
                    ref={(e) => (divToPrintRep.current = e)}
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <SORep data={data} />
                </div>
                <h1>Customer doc :</h1>
                <div
                    id="divToPrint2"
                    ref={(e) => (divToPrintCus.current = e)}
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "835px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minHeight: "1200px",
                    }}
                >
                    <SOCus data={data} />
                </div>
            </div>

            <Box textAlign="right">
                <Button kind="add" onClick={handleSaveDocument}>
                    Save
                </Button>
                {isUploading && <LinearProgress />}
            </Box>
        </Box>
    );
};
