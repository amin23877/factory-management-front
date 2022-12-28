import { Box, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { LockButton, useLock } from "common/Lock";
import React, { useState } from "react";
import { AddressesForm, MoreInfoForm, VendorForm } from "../../../features/Purchase/PO/Forms";

export default function FormTabs({
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  errors: any;
  setFieldValue: any;
}) {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock, setLock } = useLock();

  const [activeMoreTab, setActiveMoreTab] = useState(0);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Tabs
          textColor="primary"
          value={activeMoreTab}
          onChange={(e, nv) => {
            setActiveMoreTab(nv);
            setLock(true);
          }}
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
        >
          <Tab label="More Info" />
          <Tab label="Vendor" />
          <Tab label="Addresses" />
        </Tabs>
        <LockButton />
      </Box>
      <Box>
        {activeMoreTab === 0 && (
          <MoreInfoForm
            lock={lock}
            errors={errors}
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        )}
        {activeMoreTab === 1 && <VendorForm values={values} handleBlur={handleBlur} handleChange={handleChange} />}
        {activeMoreTab === 2 && <AddressesForm values={values} handleBlur={handleBlur} handleChange={handleChange} />}
      </Box>
    </>
  );
}
