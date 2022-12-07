import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { GeneralForm } from "./Forms";
import Shipping from "./Forms/Shipping";
import Billing from "./Forms/Billing";
import Approvals from "./Forms/Approvals";
import Entities from "./Forms/Entities";

export default function MainForm({
  values,
  handleChange,
  handleBlur,
  setValues,
  setFieldValue,
  getFieldProps,
  add,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  setValues: any;
  setFieldValue: any;
  getFieldProps: any;
  add?: boolean;
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
          add={add}
        />
      </Box>
      <Box>
        <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)} style={{ marginBottom: 16 }}>
          <Tab label="Approvals" />
          <Tab label="Entities" />
          <Tab label="Shipping" />
          <Tab label="Billing" />
        </Tabs>
        {activeTab === 0 && <Approvals getFieldProps={getFieldProps} add={add} />}
        {activeTab === 1 && (
          <Entities
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            add={add}
          />
        )}
        {activeTab === 2 && <Shipping getFieldProps={getFieldProps} add={add} />}
        {activeTab === 3 && <Billing getFieldProps={getFieldProps} add={add} />}
      </Box>
    </Box>
  );
}
