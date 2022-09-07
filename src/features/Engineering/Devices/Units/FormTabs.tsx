import React, { useState } from "react";

import { Status, Expense, Shipping } from "../../../FieldService/Units/Forms";
import LevelsTab from "common/Level/Tab";
import QRCode from "common/QRCode/UnitQRCode";

import { Box, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { LockButton, useLock } from "common/Lock";
import { IUnit } from "api/units";

interface IForm {
  values: any;
  errors: any;
  touched: any;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: any;
  unit: IUnit;
  isSubmitting?: boolean;
  device?: boolean;
}

export default function FormsTabs({ values, errors, handleChange, handleBlur, touched, unit, setFieldValue }: IForm) {
  const { setLock } = useLock();
  const phone = useMediaQuery("(max-width:900px)");

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Box display={"flex"} alignItems="center" mb={2}>
        <Tabs
          textColor="primary"
          value={activeTab}
          onChange={(e, nv) => {
            setActiveTab(nv);
            setLock(true);
          }}
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
        >
          <Tab label="Image" />
          <Tab label="UPC" />
          <Tab label="Status" />
          <Tab label="Expense" />
          <Tab label="Shipping" />
          <Tab label="Cluster & Level" />
        </Tabs>
        <LockButton />
      </Box>
      {activeTab === 0 && (
        <Box
          mt={1}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gridGap={10}
        ></Box>
      )}
      {activeTab === 1 && <QRCode unit={unit} />}
      {activeTab === 2 && (
        <Status
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      )}
      {activeTab === 3 && (
        <Expense
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      )}
      {activeTab === 4 && (
        <Shipping
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      )}
      {activeTab === 5 && (
        <LevelsTab
          itemType={unit.ItemId.class}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
      )}
    </>
  );
}
