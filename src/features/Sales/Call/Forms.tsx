import React from "react";
import { Box, useMediaQuery } from "@material-ui/core";

import { FieldSelect } from "app/Inputs";
import TextField from "app/TextField";

import { getAllEmployees } from "api/employee";
import { formatTimestampToDate } from "logic/date";
import { getQuotes } from "api/quote";
import { getSO } from "api/so";
import { getCallsTags } from "api/callsTags";
import LinkSelect from "app/Inputs/LinkFields";

export const GeneralForm = ({
  add,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}: {
  add?: boolean;
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
  setFieldValue: any;
}) => {
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      {/* <div
                style={
                    phone
                        ? { marginBottom: "1em", display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" }
                        : { marginBottom: "1em", display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr 1fr" }
                }
            > */}
      <Box display="grid" gridGap="1em" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}>
        <TextField
          name="date"
          label="Date"
          disabled
          value={values.date ? formatTimestampToDate(values.date) : new Date()}
        />
        <TextField name="number" label="Ticket ID" disabled value={values.number} />
        <TextField
          name="company"
          value={values.company}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.company)}
          helperText={touched.company && errors.company && String(errors.company)}
          label="Company"
        />
        <TextField
          name="contactName"
          value={values.contactName}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.contactName)}
          helperText={touched.contactName && errors.contactName && String(errors.contactName)}
          label="Contact Name"
        />
        <TextField
          name="contactNumber"
          value={values.contactNumber}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.contactNumber)}
          helperText={touched.contactNumber && errors.contactNumber && String(errors.contactNumber)}
          label="Contact Number"
        />
        <TextField
          name="contactEmail"
          value={values.contactEmail}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.contactEmail)}
          helperText={touched.contactEmail && errors.contactEmail && String(errors.contactEmail)}
          label="Contact Email"
        />
        <TextField
          name="address"
          value={values.address}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.address)}
          helperText={touched.address && errors.address && String(errors.address)}
          label="Address"
        />
        <TextField
          name="state"
          value={values.state}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.state)}
          helperText={touched.state && errors.state && String(errors.state)}
          label="State"
        />
        <TextField
          name="zip"
          value={values.zip}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.zip)}
          helperText={touched.zip && errors.zip && String(errors.zip)}
          label="Zip Code"
        />

        <LinkSelect
          path="/calls"
          filterLabel="number"
          value={typeof values.QuoteId === "string" ? values.QuoteId : values.QuoteId}
          label="Quote ID"
          request={getQuotes}
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(quote) => quote?.number}
          getOptionValue={(quote) => quote?.id}
          onChange={(e, nv) => {
            // setSelectedQuote(nv?.id as string);
            setFieldValue("QuoteId", nv?.id);
          }}
          onBlur={handleBlur}
          url="/panel/quote"
        />

        <LinkSelect
          value={typeof values.SOId === "string" ? values.SOId : values.SOId}
          label="SO ID"
          request={getSO}
          path="/so"
          filterLabel="number"
          getOptionList={(resp) => resp?.result}
          getOptionLabel={(so) => so?.number}
          getOptionValue={(so) => so?.id}
          onChange={(e, nv) => {
            setFieldValue("SOId", nv?.id);
          }}
          onBlur={handleBlur}
          url="/panel/so"
        />
        <FieldSelect
          itemValueField="id"
          itemTitleField="name"
          request={getCallsTags}
          name="Tags"
          value={values.Tags ? (typeof values.Tags === "string" ? values.Tags : values?.Tags[0]?.id) : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.Tags)}
          helperText={touched.Tags && errors.Tags && String(errors.Tags)}
          label="Tags"
        />

        {!add && (
          <>
            <FieldSelect
              value={typeof values.AssignedTo === "string" ? values.AssignedTo : values.AssignedTo?.id}
              request={getAllEmployees}
              itemTitleField="username"
              itemValueField="id"
              keyField="id"
              name="AssignedTo"
              label="Assigned To"
              onChange={handleChange}
              error={Boolean(errors.AssignedTo)}
            />
            <FieldSelect
              value={typeof values.CreatedBy === "string" ? values.CreatedBy : values.CreatedBy?.id}
              request={getAllEmployees}
              itemTitleField="username"
              itemValueField="id"
              keyField="id"
              name="CreatedBy"
              label="Created By"
              onChange={handleChange}
              error={Boolean(errors.CreatedBy)}
            />
            <TextField
              name="subject"
              value={values.subject}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(errors.subject)}
              helperText={touched.subject && errors.subject && String(errors.subject)}
              label="Subject"
              style={phone ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 3" }}
            />
          </>
        )}
      </Box>
    </>
  );
};

export const MoreInfoForm = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}: {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
}) => {
  return (
    <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr">
      <TextField
        name="subject"
        value={values.subject}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.subject)}
        helperText={touched.subject && errors.subject && String(errors.subject)}
        label="Subject"
      />
      <TextField
        multiline
        rows={4}
        placeholder="description"
        label="Description"
        name="description"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        error={Boolean(errors.description)}
      />
    </Box>
  );
};

export const ResponseForm = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}: {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
}) => {
  return (
    <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr 1fr">
      <FieldSelect
        value={typeof values.AssignedTo === "string" ? values.AssignedTo : values.AssignedTo?.id}
        request={getAllEmployees}
        itemTitleField="username"
        itemValueField="id"
        keyField="id"
        name="AssignedTo"
        label="Assigned To"
        onChange={handleChange}
        error={Boolean(errors.AssignedTo)}
      />
      <FieldSelect
        value={typeof values.CreatedBy === "string" ? values.CreatedBy : values.CreatedBy?.id}
        request={getAllEmployees}
        itemTitleField="username"
        itemValueField="id"
        keyField="id"
        name="CreatedBy"
        label="Created By"
        onChange={handleChange}
        error={Boolean(errors.CreatedBy)}
      />
      <TextField
        multiline
        style={{ gridColumnEnd: "span 2" }}
        rows={4}
        placeholder="response"
        label="Response"
        name="response"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.response}
        error={Boolean(errors.response)}
      />
    </Box>
  );
};
