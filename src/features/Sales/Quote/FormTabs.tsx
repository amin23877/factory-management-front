import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";

import Status from "./Forms/Status";
import Metrics from "./Forms/Metrics";
import Shipping from "./../SO/Forms/Shipping";
import Billing from "./../SO/Forms/Billing";
import Entities from "./../SO/Forms/Entities";

import { useLock, LockButton } from "common/Lock";
import Summary from "../SO/Forms/Summary";

export default function FormTabs({
  handleChange,
  handleBlur,
  values,
  setFieldValue,
  getFieldProps,
}: {
  values: any;
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
  setFieldValue: any;
  getFieldProps: any;
}) {
  const { setLock } = useLock();
  const [activeTab, setActiveTab] = useState(0);

  console.log("quoteValues: ", values);

  return (
    <>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => {
            setActiveTab(nv);
            setLock(true);
          }}
          variant="scrollable"
          style={{ maxWidth: 700, marginBottom: "10px" }}
        >
          {/* <Tab label="Entities" />
                <Tab label="Addresses" />*/}
          <Tab label="Summary" />
          <Tab label="Entities" />
          <Tab label="Shipping" />
          <Tab label="Billing" />
          <Tab label="Status" />
          <Tab label="Metrics" />
        </Tabs>
        <LockButton />
      </Box>
      {/* {activeTab === 0 && (
                <Entities values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} />
                )}
              {activeTab === 1 && <Addresses getFieldProps={getFieldProps} />} */}
      {activeTab === 0 && <Summary values={values} getFieldProps={getFieldProps} />}

      {activeTab === 1 && (
        <Entities setFieldValue={setFieldValue} values={values} handleBlur={handleBlur} handleChange={handleChange} />
      )}
      {activeTab === 2 && <Shipping getFieldProps={getFieldProps} />}
      {activeTab === 3 && <Billing getFieldProps={getFieldProps} />}
      {activeTab === 4 && <Status getFieldProps={getFieldProps} />}
      {activeTab === 5 && <Metrics values={values} getFieldProps={getFieldProps} />}
    </>
  );
}
