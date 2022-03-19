import React, { MutableRefObject, useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  useMediaQuery,
} from "@material-ui/core";
import DateTimePicker from "app/DateTimePicker";

import TextField from "app/TextField";
import Button from "app/Button";
import { FieldSelect, ArraySelect, CacheFieldSelect } from "app/Inputs";
import LinkSelect from "app/Inputs/LinkFields";

import { getItems } from "api/items";
import { getTickets } from "api/ticket";
import { IQuoteComplete } from "api/quote";
import { getClients, IClient } from "api/client";
import { getSO } from "api/so";

import QuotePDF from "PDFTemplates/Quote";

export const DocumentForm = ({
  data,
  divToPrint,
}: {
  data: IQuoteComplete;
  divToPrint: MutableRefObject<HTMLElement | null>;
}) => {
  return (
    <Box margin="0 auto">
      <Typography>We made a pdf from your Quote, now you can save it</Typography>
      <div style={{ height: "calc(100vh - 240px)", overflowY: "auto" }}>
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
          <QuotePDF createdQuote={data} />
        </div>
      </div>
      {/* <Box
        textAlign="right"
        width="100%"
        display="flex"
        justifyContent="space-between"
        p={2}
        flexDirection="column"
        alignItems="center"
      >
        {isUploading && (
          <div style={{ width: "100%", height: "20px" }}>
            <LinearProgress />
          </div>
        )}
        <Button type="submit" kind="add" onClick={handleSaveDocument} disabled={isUploading}>
          Save Document
        </Button>
      </Box> */}
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
          <RadioGroup value={String(values.tax)} name="tax" onChange={handleChange} style={{ flexDirection: "row" }}>
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
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"} gridColumnGap={5} gridRowGap={10}>
        {edit && <TextField label="Quote ID" value={values.number} disabled />}
        {/* {edit && <TextField label="SO ID" value={values.number} style={{ width: "100%" }} disabled />} */}
        {edit && (
          <LinkSelect
            filterLabel="number"
            path="/so"
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
          filterLabel="name"
          path="/project"
          value={typeof values.ProjectId === "string" ? values.ProjectId : values.ProjectId}
          label="Project Name"
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(project) => project?.name}
          getOptionValue={(project) => project?.id}
          onChange={(e, nv) => {
            setFieldValue("ProjectId", nv?.id);
          }}
          onBlur={handleBlur}
          url="/panel/project"
        />
        <CacheFieldSelect
          value={typeof values.salesperson === "string" ? values.salesperson : values.salesperson?.id}
          url="/employee"
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
          style={phone ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 3" }}
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
  // const phone = useMediaQuery("(max-width:900px)");
  const [rep, setRep] = useState<IClient>();
  const [client, setClient] = useState<IClient>();
  return (
    <Box display="grid" gridTemplateColumns={"1fr 1fr"} gridColumnGap={5} pt="12px">
      <Box mb={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={7}>
        <LinkSelect
          filterLabel="name"
          path="/client"
          value={typeof values.repOrAgency === "string" ? values.repOrAgency : values.repOrAgency?.id}
          label="rep / Agency"
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(cus) => cus?.name}
          getOptionValue={(cus) => cus?.id}
          onChange={(e, nv) => {
            setFieldValue("repOrAgency", nv?.id);
            setRep(nv);
          }}
          onBlur={handleBlur}
          url="/panel/customer"
        />
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
      </Box>
      <Box mb={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={7}>
        <LinkSelect
          filterLabel="name"
          path="/client"
          value={typeof values.client === "string" ? values.client : values.client?.id}
          label="Client"
          request={getClients}
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(cus) => cus?.name}
          getOptionValue={(cus) => cus?.id}
          onChange={(e, nv) => {
            setFieldValue("client", nv?.id);
            setClient(nv);
          }}
          onBlur={handleBlur}
          url="/panel/customer"
        />
        <TextField
          value={client?.name}
          name="contactName"
          label="Contact Name"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* <TextField
          value={client?.email}
          name="email"
          label="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
        /> */}
        <TextField
          value={client?.phone}
          name="phone"
          label="Phone"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          value={values.unitPricingLevel}
          name="Unit Pricing Level"
          label="Unit Pricing Level"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
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
    <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridGap={5} style={{ flex: 1 }}>
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
