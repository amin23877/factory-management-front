import React, { useState } from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@material-ui/core";

import Shipping from "./Forms/Shipping";
import Billing from "./Forms/Billing";
import Summary from "./Forms/Summary";
import Approvals from "./Forms/Approvals";
import Entities from "./Forms/Entities";
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
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Tabs
          textColor="primary"
          value={activeTab}
          onChange={(e, nv) => {
            setActiveTab(nv);
            setLock(true);
          }}
          variant="scrollable"
          style={phone ? { maxWidth: "calc(100vw - 80px)" } : { maxWidth: 700 }}
        >
          <Tab label="summary" />
          <Tab label="Approvals" />
          <Tab label="Entities" />
          <Tab label="Shipping" />
          <Tab label="Billing" />
        </Tabs>
        <LockButton />
      </Box>
      <Box pt={2}>
        {activeTab === 0 && <Summary values={values} getFieldProps={getFieldProps} />}
        {activeTab === 1 && <Approvals values={values} getFieldProps={getFieldProps} />}
        {activeTab === 2 && (
          <Entities values={values} handleChange={handleChange} handleBlur={handleBlur} setFieldValue={setFieldValue} />
        )}
        {activeTab === 3 && <Shipping getFieldProps={getFieldProps} />}
        {activeTab === 4 && <Billing getFieldProps={getFieldProps} />}
      </Box>
    </>
  );
}
