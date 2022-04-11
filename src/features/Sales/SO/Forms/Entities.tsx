import React from "react";
import { Box, useMediaQuery } from "@material-ui/core";

// import { getAllModelContact } from "api/contact";
// import { FieldSelect } from "app/Inputs";
import TextField from "app/TextField";
// import LinkField from "app/Inputs/LinkFields";
import AsyncCombo from "common/AsyncCombo";
import useSWR from "swr";

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
  const { data: contacts } = useSWR(values?.ClientId?.id ? `/contact/client/${values?.ClientId?.id}` : null);
  const contact = contacts?.filter((c: any) => c.main).length > 0 ? contacts?.filter((c: any) => c.main)[0] : undefined;

  return (
    <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr 1fr"} gridColumnGap={10} mt="5px">
      <Box display="flex" flexDirection="column" style={{ gap: 10 }} my={1}>
        <AsyncCombo
          label="Rep / Agency"
          filterBy="name"
          getOptionLabel={(o) => o?.name}
          getOptionSelected={(o, v) => o.id === v.id}
          url="/rep"
          value={values.RepId}
          onChange={(e, nv) => {
            setFieldValue("RepId", nv?.id);
          }}
        />
        <TextField value={values.RepId?.address} label="Address" disabled />
        <TextField
          value={values.RepId?.city}
          name="city"
          label="City"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
        />
        <TextField
          value={values.RepId?.state}
          name="state"
          label="State"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
        />
        <TextField
          value={values.RepId?.zipcode}
          name="zipCode"
          label="Zip Code"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
        />
      </Box>
      <Box display="flex" flexDirection="column" style={{ gap: 10 }} my={1}>
        <AsyncCombo
          label="Client"
          filterBy="name"
          getOptionLabel={(o) => o?.name}
          getOptionSelected={(o, v) => o.id === v.id}
          url="/client"
          value={values.ClientId}
          onChange={(e, nv) => {
            setFieldValue("ClientId", nv?.id);
          }}
        />
        <TextField
          value={contact ? `${contact?.firstName} ${contact?.lastName}` : ""}
          name="contactName"
          label="Contact Name"
          disabled
        />
        <TextField
          value={contact?.emails?.length > 0 ? contact?.emails[0].email : ""}
          name="email"
          label="Email"
          disabled
        />
        <TextField
          value={contact?.phones?.length > 0 ? contact?.phones[0].phone : ""}
          name="phone"
          label="Phone"
          disabled
        />
        {/* <TextField
          value={values.unitPricingLevel}
          name="Unit Pricing Level"
          label="Unit Pricing Level"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
        /> */}
      </Box>
      <Box display="flex" flexDirection="column" style={{ gap: 10 }} my={1}>
        <AsyncCombo
          label="Rep / Agency"
          filterBy="name"
          getOptionLabel={(o) => o?.name}
          getOptionSelected={(o, v) => o.id === v.id}
          url="/rep"
          value={values.RepId}
          onChange={(e, nv) => {
            setFieldValue("RepId", nv?.id);
          }}
        />
        <TextField disabled label="Email" value={values?.RepId?.email} />
        <TextField disabled label="Phone" value={values?.RepId?.phone} />
        <TextField disabled label="City" value={values?.RepId?.city} />
        <div />
        <div />
      </Box>
      <Box display="flex" flexDirection="column" style={{ gap: 10 }} my={1}>
        <TextField disabled label="24 Hour Contact" value={values.twentyFourContact} />
        <TextField disabled label="24 Hour Contact Print" value={values.twentyFourContactPrint} />
        <TextField disabled label="24 Hour Contact Email" value={values.twentyFourEmail} />

        {/* <FieldSelect
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
        /> */}
      </Box>
    </Box>
  );
}
