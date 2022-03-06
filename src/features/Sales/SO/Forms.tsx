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
  Paper,
  Tabs,
  Tab,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";

import DateTimePicker from "app/DateTimePicker";
import TextField from "app/TextField";
import { FieldSelect, ArraySelect, CacheFieldSelect } from "app/Inputs";
import Button from "app/Button";
import LinkSelect from "app/Inputs/LinkFields";

import { getAllEmployees } from "api/employee";
import { getAllModelContact } from "api/contact";
import { getClients } from "api/client";
import { getProjects } from "api/project";
import { getQuoteById, getQuotes } from "api/quote";
import { getTickets } from "api/ticket";
import { ISO, ISOComplete } from "api/so";
import { createAModelDocument } from "api/document";

import { exportPdf } from "logic/pdf";
import { formatTimestampToDate } from "logic/date";

import SOCus from "PDFTemplates/SOCus";
import SORep from "PDFTemplates/SORep";
import SOAcc from "PDFTemplates/SOAcc";
import { getPO } from "api/po";

const useStyles = makeStyles({
  checkboxLabel: {
    fontSize: "11px",
  },
});

export const GeneralForm = ({
  handleChange,
  handleBlur,
  onChangeInit,
  values,
  setFieldValue,
}: {
  values: any;
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
  onChangeInit: (data: any) => void;
  setFieldValue: any;
}) => {
  const classes = useStyles();
  const [selectedQuote, setSelectedQuote] = useState<string>();

  useEffect(() => {
    if (selectedQuote) {
      getQuoteById(selectedQuote)
        .then((d) => {
          const {
            freightTerms,
            paymentTerms,
            carrier,
            issuedBy,
            status,
            expodate,

            estShipDate,
            actShipDate,
            shipping,
            shippingContact,
            shippingPhone,
            shippingEmail,
            shippingEntitiy,

            billingContact,
            billingPhone,
            billingEmail,
            billing,
            billingEntitiy,

            requester,
            // ClientId,
            ProjectId,
          } = d;
          onChangeInit({
            ...values,
            freightTerms,
            paymentTerms,
            carrier,
            issuedBy,
            status,
            expodate,

            estShipDate,
            actShipDate,
            shipping,
            shippingContact,
            shippingPhone,
            shippingEmail,
            shippingEntitiy,

            billingContact,
            billingPhone,
            billingEmail,
            billing,
            billingEntitiy,

            requester,
            ProjectId,
          });
        })
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuote]);
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr 1fr"}
        gridColumnGap={phone ? 5 : 10}
        gridRowGap={10}
      >
        <TextField value={values.number} name="number" label="SO NO." onChange={handleChange} onBlur={handleBlur} />
        <LinkSelect
          path="/quote"
          filterLabel="number"
          value={typeof values.QuoteId === "string" ? values.QuoteId : values.QuoteId}
          label="Quote NO."
          request={getQuotes}
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(quote) => quote?.number}
          getOptionValue={(quote) => quote?.id}
          onChange={(e, nv) => {
            setSelectedQuote(nv?.id as string);
            setFieldValue("QuoteId", nv?.id);
          }}
          onBlur={handleBlur}
          url="/panel/quote"
        />
        <TextField
          value={values.invoiceNumber}
          name="invoiceNumber"
          label={values.invoiceLabel || "Invoice"}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField value={formatTimestampToDate(values.date)} name="date" label="SO Date" disabled />
        <LinkSelect
          value={typeof values.WarrantyId === "string" ? values.WarrantyId : values.WarrantyId}
          label="Warranty"
          request={async () => {
            return [];
          }}
          path="/service"
          filterLabel="name"
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(warranty) => warranty?.name}
          getOptionValue={(warranty) => warranty?.id}
          onChange={(e, nv) => {
            setFieldValue("WarrantyId", nv?.id);
          }}
          onBlur={handleBlur}
          url="/panel/warranty"
        />
        <LinkSelect
          value={typeof values.ProjectId === "string" ? values.ProjectId : values.ProjectId}
          label="Project Name"
          path="/project"
          filterLabel="name"
          request={getProjects}
          getOptionList={(resp) => resp}
          getOptionLabel={(project) => project?.name}
          getOptionValue={(project) => project?.id}
          onChange={(e, nv) => {
            setFieldValue("ProjectId", nv?.id);
          }}
          onBlur={handleBlur}
          url="/panel/project"
        />

        <TextField value={values.projectLocation} name="projectLocation" label="Project Location" disabled />
        <TextField value={values.leadTime} name="leadTime" label="Lead Time" onChange={handleChange} />
        <TextField
          value={values.acknowledgeDate}
          name="acknowledgeDate"
          label="Date Ack."
          onChange={handleChange}
          disabled
        />
        <TextField
          value={values.paymentTerm}
          name="paymentTerm"
          label="Payment Term"
          onChange={handleChange}
          disabled
        />
        <Paper
          style={{
            padding: "0 0.5em 0 1em",
            backgroundColor: "#eee",
            gridColumnEnd: "span 2",
          }}
        >
          <FormControlLabel
            name="callADayBeforeDelivery"
            control={<Checkbox checked={Boolean(values.callADayBeforeDelivery)} />}
            label="Call 24 hours before delivery"
            classes={{ label: classes.checkboxLabel }}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Paper>
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
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr 1fr"} gridColumnGap={10} mt="5px">
      <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} my={1}>
        <LinkSelect
          value={typeof values.RepId === "string" ? values.RepId : values.RepId?.id}
          label="rep / Agency"
          path="/rep"
          filterLabel="name"
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(cus) => cus?.name}
          getOptionValue={(cus) => cus?.id}
          onChange={(e, nv) => {
            setFieldValue("RepId", nv?.id);
          }}
          onBlur={handleBlur}
          url="/panel/rep"
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
      <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} my={1}>
        <LinkSelect
          value={typeof values.client === "string" ? values.client : values.client?.id}
          label="Client"
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(cus) => cus?.name}
          getOptionValue={(cus) => cus?.id}
          onChange={(e, nv) => {
            setFieldValue("client", nv?.id);
          }}
          onBlur={handleBlur}
          url="/panel/client"
          path="/client"
          filterLabel="name"
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
      <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} my={1}>
        <TextField disabled label="Requester" />
        <TextField disabled label="Email" />
        <TextField disabled label="Phone" />
        <TextField disabled label="Fax" />
        <div style={{ height: 33 }} />
      </Box>
      <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10} my={1}>
        <FieldSelect
          label="24 Hour Contact"
          name="twentyFourContact"
          request={
            typeof values.client === "string"
              ? () => getAllModelContact("client", values.client)
              : () => getAllModelContact("client", values.client?.id)
          }
          itemTitleField="lastName"
          itemValueField="id"
          value={typeof values.twentyFourContact === "string" ? values.twentyFourContact : values.twentyFourContact?.id}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={!values.client}
        />
        <FieldSelect
          label="Phone"
          name="twentyFourContact"
          request={
            typeof values.client === "string"
              ? () => getAllModelContact("client", values.client)
              : () => getAllModelContact("client", values.client?.id)
          }
          itemTitleField="phone"
          itemValueField="id"
          value={typeof values.twentyFourContact === "string" ? values.twentyFourContact : values.twentyFourContact?.id}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
        />
        <FieldSelect
          label="Email"
          name="twentyFourContact"
          request={
            typeof values.client === "string"
              ? () => getAllModelContact("client", values.client)
              : () => getAllModelContact("client", values.client?.id)
          }
          itemTitleField="email"
          itemValueField="id"
          value={typeof values.twentyFourContact === "string" ? values.twentyFourContact : values.twentyFourContact?.id}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
        />
        <div style={{ height: "80px", width: "100%" }}></div>
      </Box>
    </Box>
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
        style={{ maxWidth: 600, marginBottom: "10px" }}
      >
        <Tab label="Billing Address" />
        <Tab label="Shipping Address" />
      </Tabs>
      {activeTab === 0 && (
        <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridRowGap={10}>
          <TextField
            value={values.billingCompany}
            name="billingCompany"
            label="Company"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingAttn}
            name="billingAttn"
            label="Attn"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextField
            value={values.billingAddress}
            name="billingAddress"
            label="Billing Address"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingCity}
            name="billingCity"
            label="City"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingState}
            name="billingState"
            label="State"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingZipCode}
            name="billingZipCode"
            label="Zip Code"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingCountry}
            name="billingCountry"
            label="Country"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingPhone}
            name="billingPhone"
            label="Phone"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingEmail}
            name="billingEmail"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ gridColumnEnd: "span 2" }}
          />
        </Box>
      )}
      {activeTab === 1 && (
        <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridRowGap={10} gridColumnGap={10}>
          <TextField
            value={values.shippingCompany}
            name="shippingCompany"
            label="Company"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAttn}
            name="shippingAttn"
            label="Attn"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddress}
            label="Address"
            name="shippingAddress"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingCity}
            name="shippingCity"
            label="City"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingState}
            name="shippingState"
            label="State"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingZipCode}
            name="shippingZipCode"
            label="Zip Code"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingCountry}
            name="shippingCountry"
            label="Country"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingPhone}
            name="shippingPhone"
            label="Phone"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingEmail}
            name="shippingEmail"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ gridColumnEnd: "span 2" }}
          />
        </Box>
      )}
    </>
  );
};

export const AccountingForm = ({
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
      <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
        <TextField
          value={values.requestApproval}
          name="requestApproval"
          label=" Request Approval"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          value={formatTimestampToDate(values.date)}
          name="toBeInvoicedDate"
          label="To be Invoiced Date"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
      <Tabs
        textColor="primary"
        value={activeTab}
        onChange={(e, nv) => setActiveTab(nv)}
        variant="scrollable"
        style={{ maxWidth: 600 }}
      >
        <Tab label="Commissions" />
        <Tab label="Cost" />
      </Tabs>
      {activeTab === 0 && (
        <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridGap={10}>
          <TextField
            style={{ gridColumnEnd: "span 2" }}
            value={values.commisionBaseAmt}
            name="commisionBaseAmt"
            label="Commission Base Amt"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.regularCommision}
            name="regularCommision"
            label="Regular Commission %"
            type="number"
            placeholder="0.00%"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.regularCommision}
            name="regularCommision"
            label="Regular Commission $"
            placeholder="0.00$"
            disabled
          />
          <TextField
            value={values.overageCommision}
            name="overageCommision"
            label="Overage Commission"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.totalCommision}
            name="totalCommision"
            label="Total Commission"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
      )}
      {activeTab === 1 && (
        <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridGap={10}>
          <TextField
            style={{ gridColumnEnd: "span 2" }}
            value={values.soCost}
            name="soCost"
            label="SO Cost"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.partsCost}
            name="partsCost"
            label="Parts Cost"
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField value={values.labor} name="labor" label="Labor" onChange={handleChange} onBlur={handleBlur} />
          <TextField value={values.margin} name="margin" label="Margin" onChange={handleChange} onBlur={handleBlur} />
          <TextField value={(values.margin / values.soCost) * 100} name="marginPercent" label="Margin %" disabled />
        </Box>
      )}
    </>
  );
};

export const ApprovalForm = ({
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
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Paper
        style={
          phone
            ? {
                margin: "1em 0",
                padding: "0 0.5em 0 1em",
                backgroundColor: "#eee",
                gridColumnEnd: "span 4",
                display: "grid",
                gridTemplateColumns: "1fr",
              }
            : {
                margin: "1em 0",
                padding: "0 0.5em 0 1em",
                backgroundColor: "#eee",
                gridColumnEnd: "span 4",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }
        }
      >
        <FormControlLabel
          name="releaseToProduction"
          control={<Checkbox checked={Boolean(values.releaseToProduction)} />}
          label="Release to Production"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={Boolean(values.releaseToProduction)}
        />
        <FormControlLabel
          name="expedite"
          control={<Checkbox checked={Boolean(values.expedite)} />}
          label="Expedite"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Paper>
      <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={10} gridRowGap={10}>
        <FieldSelect
          itemValueField="id"
          itemTitleField="number"
          request={getPO}
          name="POId"
          value={typeof values.POId === "string" ? values.POId : values.POId?.id}
          onBlur={handleBlur}
          onChange={handleChange}
          label="Customer PO"
        />
        <TextField
          value={formatTimestampToDate(values.poReceivedDate)}
          name="POReceivedDate"
          label="PO Received Date"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
        />
        <TextField
          value={values.soIssuedBy}
          name="soIssuedBy"
          label="Issued By"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          value={values.releaseDate ? formatTimestampToDate(values.releaseDate) : ""}
          name="releaseDate"
          label="Release Date"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
        />
        <ArraySelect
          value={values.warranty}
          name="warranty"
          label="Warranty"
          onChange={handleChange}
          onBlur={handleBlur}
          items={[]}
        />
        <ArraySelect
          value={values.status}
          name="status"
          label="Status"
          onChange={handleChange}
          onBlur={handleBlur}
          items={["New", "Pending", "Fulfilled", "Shipped"]}
        />
      </Box>
    </>
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
        value={values.estimatedShipDate}
        name="estimatedShipDate"
        label="Estimated ship date"
        onChange={(date) => setFieldValue("estimatedShipDate", date)}
        onBlur={handleBlur}
        format="yyyy-mm-dd"
      />
      <DateTimePicker
        style={{ gridColumnEnd: "span 2" }}
        size="small"
        value={values.orgShipDate}
        name="orgShipDate"
        label="Original ship date"
        onChange={(date) => setFieldValue("orgShipDate", date)}
        onBlur={handleBlur}
        format="yyyy-mm-dd"
      />
      <DateTimePicker
        style={{ gridColumnEnd: "span 2" }}
        size="small"
        value={values.actualShipDate}
        name="actualShipDate"
        label="Actual ship date"
        onChange={(date) => setFieldValue("actualShipDate", date)}
        onBlur={handleBlur}
        format="yyyy-mm-dd"
      />
      <TextField value={values.carrier} name="carrier" label="Carrier" onChange={handleChange} onBlur={handleBlur} />
      <TextField
        value={values.freightTerm}
        name="freightTerm"
        label="Freight Terms"
        onChange={handleChange}
        onBlur={handleBlur}
      />
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
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10}>
      <CacheFieldSelect
        value={values.billing ? values.billing : ""}
        url="/address"
        itemTitleField="address"
        itemValueField="id"
        keyField="id"
        name="billing"
        label="Address"
        onChange={handleChange}
      />
      <CacheFieldSelect
        value={values.billingContact ? values.billingContact : ""}
        url="/contact"
        itemTitleField="lastName"
        itemValueField="id"
        keyField="id"
        name="billingContact"
        label="Contact"
        onChange={handleChange}
      />
      <CacheFieldSelect
        value={values.billingPhone ? values.billingPhone : ""}
        url="/phone"
        itemTitleField="phone"
        itemValueField="id"
        keyField="id"
        name="billingPhone"
        label="Phone"
        onChange={handleChange}
      />
      <CacheFieldSelect
        value={values.billingEmail ? values.billingEmail : ""}
        url="/email"
        itemTitleField="email"
        itemValueField="id"
        keyField="id"
        name="billingEmail"
        label="Email"
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
        request={getClients}
        itemTitleField="name"
        itemValueField="id"
        value={values.repOrAgency}
        name="repOrAgency"
        label="Rep / Agency"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FieldSelect
        value={values.requester ? values.requester : ""}
        request={getAllEmployees}
        getOptionList={(resp) => resp.result}
        itemTitleField="username"
        itemValueField="id"
        keyField="id"
        name="requester"
        label="Requester"
        onChange={handleChange}
      />
      <FieldSelect
        value={values.client ? values.client : ""}
        request={getClients}
        getOptionList={(resp) => resp.result}
        itemTitleField="name"
        itemValueField="id"
        keyField="id"
        name="client"
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
        request={getTickets}
        itemTitleField="description"
        itemValueField="id"
        keyField="id"
        name="JobId"
        label="Job"
        onChange={handleChange}
      />
      <FieldSelect
        value={typeof values.issuedBy === "string" ? values.issuedBy : values.issuedBy?.id}
        name="issuedBy"
        label="Issued By"
        request={getAllEmployees}
        itemTitleField="username"
        itemValueField="id"
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Box>
  );
};

export const DocumentForm = ({
  data,
  createdSO,
  onDone,
}: {
  data: ISOComplete;
  createdSO: any;
  onDone: () => void;
}) => {
  const divToPrintAcc = useRef<HTMLElement | null>(null);
  const divToPrintRep = useRef<HTMLElement | null>(null);
  const divToPrintCus = useRef<HTMLElement | null>(null);

  const classes = useStyles();
  const [canSave, setCanSave] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveDocument = async () => {
    try {
      setIsUploading(true);
      if (divToPrintAcc.current && createdSO?.id) {
        const generatedAccPdf = await exportPdf(divToPrintAcc.current);
        await createAModelDocument({
          model: "so",
          id: createdSO.id,
          file: generatedAccPdf,
          description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
          name: `SO_ACC_${createdSO.number}.pdf`,
        });
      }
      if (divToPrintRep.current) {
        const generatedRepPdf = await exportPdf(divToPrintRep.current);
        await createAModelDocument({
          model: "so",
          id: createdSO.id,
          file: generatedRepPdf,
          description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
          name: `SO_REP_${createdSO.number}.pdf`,
        });
      }
      if (divToPrintCus.current) {
        const generatedCusPdf = await exportPdf(divToPrintCus.current);
        await createAModelDocument({
          model: "so",
          id: createdSO.id,
          file: generatedCusPdf,
          description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
          name: `SO_CUS_${createdSO.number}.pdf`,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
      onDone();
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
        <Button disabled={isUploading} kind="add" onClick={handleSaveDocument}>
          Save
        </Button>
        {isUploading && <LinearProgress />}
      </Box>
    </Box>
  );
};
