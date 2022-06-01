import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
// import useSWR from "swr";

import TextField from "app/TextField";
// import { FieldSelect } from "app/Inputs";
import AsyncCombo from "common/AsyncCombo";
import { useLock } from "common/Lock";

// import { getAllModelContact } from "api/contact";

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
  const { lock } = useLock();

  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr  1fr" gridColumnGap={10} gridRowGap={10}>
        <TextField
          value={values.number}
          name="number"
          label="Customer PO Number"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={lock}
        />
        <TextField value={values.SOId?.issuedBy?.username} label="SO Issued By" disabled />
        <AsyncCombo
          label="Quote Id"
          filterBy="number"
          getOptionLabel={(o) => o?.number || "No-Number"}
          getOptionSelected={(o, v) => o.id === v.id}
          url="/quote"
          onChange={(e, nv) => setFieldValue("QuoteId", nv?.id)}
          value={values.QuoteId}
          style={{ flex: 1, gridColumn: "span 2" }}
          disabled={lock}
        />
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
  const [selectedRep, setSelectedRep] = useState<any>(values.RepId);

  return (
    <>
      <Box my={1} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridColumnGap={10}>
        <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
          <AsyncCombo
            label="Rep/Agency"
            filterBy="name"
            getOptionLabel={(o) => o?.name}
            getOptionSelected={(o, v) => o?.id === v?.id}
            url="/rep"
            value={values.RepId}
            onChange={(e, nv) => {
              setFieldValue("RepId", nv?.id);
              setSelectedRep(nv);
            }}
          />
          <TextField value={selectedRep?.address} label="Address" disabled />
          <TextField
            value={selectedRep?.city}
            name="city"
            label="City"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          <TextField
            value={selectedRep?.state}
            name="state"
            label="State"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          <TextField
            value={selectedRep?.zip}
            name="zipCode"
            label="Zip Code"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
        </Box>
        <Box my={1} display="grid" gridTemplateColumns=" 1fr " gridRowGap={10}>
          <TextField
            value={(values.requester?.firstName || "") + " " + (values.requester?.lastName || "")}
            name="requesterName"
            label="Requester Name"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          <TextField
            value={values.requester?.emails?.length > 0 ? values.requester?.emails[0]?.email : ""}
            name="requesterMail"
            label="Requester Mail"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          <TextField
            value={values.requester?.phones?.length > 0 ? values.requester?.phones[0]?.phone : ""}
            name="requesterPhone"
            label="Requester Phone"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          <TextField style={{ opacity: 0 }} />
          <TextField style={{ opacity: 0 }} />
        </Box>
      </Box>
    </>
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
        style={{ maxWidth: 600 }}
      >
        <Tab label="Billing" />
        <Tab label="Shipping" />
      </Tabs>
      {activeTab === 0 && (
        <Box my={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10} gridRowGap={10}>
          <TextField
            value={values.billingAddressCompany}
            name="billingAddressCompany"
            label="Company"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingAddressAttn}
            name="billingAddressAttn"
            label="Attn"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextField
            value={values.billingAddressAddress}
            name="billingAddressAddress"
            label="Address"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingAddressCity}
            name="billingAddressCity"
            label="City"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingAddressState}
            name="billingAddressState"
            label="State"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingAddressZipcode}
            name="billingAddressZipcode"
            label="Zip Code"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingAddressCountry}
            name="billingAddressCountry"
            label="Country"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingAddressPhone}
            name="billingAddressPhone"
            label="Phone"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.billingAddressEmail}
            name="billingAddressEmail"
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
            value={values.shippingAddressCompany}
            name="shippingAddressCompany"
            label="Company"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddressAttn}
            name="shippingAddressAttn"
            label="Attn"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddressAddress}
            label=" Address"
            name="shippingAddressAddress"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddressCity}
            name="shippingAddressCity"
            label="City"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddressState}
            name="shippingAddressState"
            label="State"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddressZipcode}
            name="shippingAddressZipcode"
            label="Zip Code"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddressCountry}
            name="shippingAddressCountry"
            label="Country"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddressPhone}
            name="shippingAddressPhone"
            label=" Phone"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            value={values.shippingAddressEmail}
            name="shippingAddressEmail"
            label=" Email"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ gridColumnEnd: "span 2" }}
          />
        </Box>
      )}
    </>
  );
};
