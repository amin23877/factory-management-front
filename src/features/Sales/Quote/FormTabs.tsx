import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";

import Status from "./Forms/Status";
import Metrics from "./Forms/Metrics";
import Shipping from "./../SO/Forms/Shipping";
import Billing from "./../SO/Forms/Billing";
import Entities from "./../SO/Forms/Entities";

import { useLock, LockButton } from "common/Lock";

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
      {activeTab === 0 && (
        <Entities setFieldValue={setFieldValue} values={values} handleBlur={handleBlur} handleChange={handleChange} />
      )}
      {activeTab === 1 && <Shipping getFieldProps={getFieldProps} />}
      {activeTab === 2 && <Billing getFieldProps={getFieldProps} />}
      {activeTab === 3 && <Status getFieldProps={getFieldProps} />}
      {activeTab === 4 && <Metrics values={values} getFieldProps={getFieldProps} />}
    </>
  );
}
