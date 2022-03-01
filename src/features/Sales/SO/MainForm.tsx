import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { GeneralForm, ShippingForm, BillingTab, TermsTab } from "./Forms";

export default function MainForm({
  values,
  handleChange,
  handleBlur,
  setValues,
  setFieldValue,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  setValues: any;
  setFieldValue: any;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <Box>
        <GeneralForm
          onChangeInit={setValues}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
        {/* <Button type="submit" kind="add" fullWidth>
          Add
        </Button> */}
      </Box>
      <Box>
        <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)} style={{ marginBottom: 16 }}>
          <Tab label="Shipping" />
          <Tab label="Billing" />
          <Tab label="Terms" />
        </Tabs>
        {activeTab === 0 && (
          <ShippingForm
            setFieldValue={setFieldValue}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        )}
        {activeTab === 1 && <BillingTab values={values} handleChange={handleChange} handleBlur={handleBlur} />}
        {activeTab === 2 && <TermsTab values={values} handleChange={handleChange} handleBlur={handleBlur} />}
      </Box>
    </Box>
  );
}
