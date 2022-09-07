import React, { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import { CommissionForm, MainContactForm, MoreInfoForm } from "features/Sales/Customer/Forms";
import { LockButton, useLock } from "common/Lock";
import { IClient } from "api/client";

export default function FormTabs({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  selectedRow,
}: {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
  selectedRow: IClient;
}) {
  const [activeSubTab, setActiveSubTab] = useState(0);

  const phone = useMediaQuery("(max-width:900px)");
  const { setLock } = useLock();

  return (
    <>
      <Box display={"flex"} alignItems="center" mb={2} justifyContent="space-between">
        <Tabs
          textColor="primary"
          value={activeSubTab}
          onChange={(e, nv) => {
            setActiveSubTab(nv);
            setLock(true);
          }}
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
        >
          <Tab label="More Info" />
          <Tab label="Main Contact" />
          <Tab label="Commission" />
        </Tabs>
        <LockButton />
      </Box>
      <Box>
        {activeSubTab === 0 && (
          <MoreInfoForm
            values={values}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
          />
        )}
        {activeSubTab === 1 && <MainContactForm selectedRow={selectedRow} />}
        {activeSubTab === 2 && (
          <CommissionForm
            values={values}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
          />
        )}
      </Box>
    </>
  );
}
