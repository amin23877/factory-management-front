import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { GeneralForm, BillingTab, EntitiesForm } from "./Forms";
import Shipping from "./AddSo/Forms/Shipping";

export default function MainForm({
  values,
  handleChange,
  handleBlur,
  setValues,
  setFieldValue,
  getFieldProps,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  setValues: any;
  setFieldValue: any;
  getFieldProps: any;
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
          <Tab label="Entities" />
          <Tab label="Billing" />
          {/* <Tab label="Terms" /> */}
        </Tabs>
        {activeTab === 0 && (
          <Shipping
            getFieldProps={getFieldProps}
            setFieldValue={setFieldValue}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        )}
        {activeTab === 1 && (
          <EntitiesForm
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
          />
        )}
        {activeTab === 2 && <BillingTab values={values} handleChange={handleChange} handleBlur={handleBlur} />}
        {/* {activeTab === 3 && <TermsTab values={values} handleChange={handleChange} handleBlur={handleBlur} />} */}
      </Box>
    </Box>
  );
}
