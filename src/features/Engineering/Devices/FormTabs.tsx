import React, { useRef, useState } from "react";
import { Box, Tabs, Tab, Typography, useMediaQuery } from "@material-ui/core";

import DeviceQRCode from "app/QRCode";
import { exportPdf } from "logic/pdf";
import PricingTab from "common/Pricing";
import PhotoTab from "common/PhotoTab";
import LevelsTab from "common/Level/Tab";

import Button from "app/Button";

import { IItem } from "api/items";
import { LockButton, useLock } from "common/Lock";

export default function FormTabs({
  boms,
  handleBlur,
  handleChange,
  values,
  selectedRow,
  sales,
  setFieldValue,
  getFieldProps,
}: {
  handleBlur: any;
  handleChange: any;
  boms?: { result: any[]; total: number };
  values: any;
  selectedRow: IItem;
  sales?: boolean;
  setFieldValue: any;
  getFieldProps: any;
}) {
  const qrCode = useRef<HTMLElement | null>(null);
  const [moreInfoTab, setMoreInfoTab] = useState(0);

  const phone = useMediaQuery("(max-width:900px)");
  const { setLock } = useLock();

  return (
    <>
      <Box display={"flex"} alignItems="center" mb={2} justifyContent="space-between">
        <Tabs
          value={moreInfoTab}
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)" } : {}}
          textColor="primary"
          onChange={(e, v) => {
            setMoreInfoTab(v);
            setLock(true);
          }}
        >
          <Tab label="Image" />
          <Tab label="UPC" />
          <Tab label="Pricing" />
          {!sales && <Tab label="Clusters and Levels" />}
        </Tabs>
        <LockButton />
      </Box>
      {moreInfoTab === 0 && <PhotoTab model="item" id={selectedRow.id} />}
      {moreInfoTab === 1 && (
        <Box display="flex" justifyContent="space-around" alignItems="center" maxWidth="83vw">
          <div ref={(e) => (qrCode.current = e)}>
            <DeviceQRCode
              value={JSON.stringify({
                type: "device",
                no: selectedRow.no,
              })}
            />
            <Typography variant="subtitle1">Device Number: {selectedRow.no}</Typography>
            <Typography variant="subtitle1">Device Name: {selectedRow.name}</Typography>
          </div>
          <Button
            variant="contained"
            onClick={async () => {
              if (qrCode.current) {
                await exportPdf(qrCode.current);
              }
            }}
          >
            Print
          </Button>
        </Box>
      )}
      {moreInfoTab === 2 && (
        <PricingTab
          handleBlur={handleBlur}
          handleChange={handleChange}
          itemId={selectedRow.id}
          values={values}
          boms={boms || { result: [], total: 0 }}
        />
      )}
      {moreInfoTab === 3 && !sales && (
        <LevelsTab
          values={values}
          getFieldProps={getFieldProps}
          setFieldValue={setFieldValue}
          itemType={selectedRow.class}
        />
      )}
    </>
  );
}
