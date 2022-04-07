import React from "react";
import { Box, useMediaQuery } from "@material-ui/core";

import { getAllModelContact } from "api/contact";
import { FieldSelect } from "app/Inputs";
import TextField from "app/TextField";
import LinkField from "app/Inputs/LinkFields";

export default function Entities({
  handleChange,
  handleBlur,
  values,
  setFieldValue,
}: {
  values: any;
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
  setFieldValue: any;
}) {
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr 1fr"} gridColumnGap={10} mt="5px">
      <Box display="flex" flexDirection="column" style={{ gap: 10 }} my={1}>
        <LinkField
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
      <Box display="flex" flexDirection="column" style={{ gap: 10 }} my={1}>
        <LinkField
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
      <Box display="flex" flexDirection="column" style={{ gap: 10 }} my={1}>
        <TextField disabled label="Requester" />
        <TextField disabled label="Email" />
        <TextField disabled label="Phone" />
        <TextField disabled label="Fax" />
        <div />
        <div />
      </Box>
      <Box display="flex" flexDirection="column" style={{ gap: 10 }} my={1}>
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
      </Box>
    </Box>
  );
}
