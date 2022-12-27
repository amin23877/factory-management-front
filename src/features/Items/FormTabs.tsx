import React, { useState, useRef } from "react";
import { Box, Tabs, Tab, Typography, useMediaQuery } from "@material-ui/core";

import Button from "app/Button";

import MoreInfo from "features/Items/Forms/MoreInfo";
import Quantity from "features/Items/Forms/Quantity";
import PricingTab from "features/Items/Forms/Pricing";
import Shipping from "features/Items/Forms/Shipping";

import PhotoTab from "common/PhotoTab";
import LevelsTab from "common/Level/Tab";
import { LockButton, useLock } from "common/Lock";
import QRCode from "app/QRCode";

import ManualCountModal from "features/Items/ManualCountModal";
import UpdateQuantityModal from "features/Items/Quantity";

import { exportPdf } from "logic/pdf";

export default function FormTabs({
  boms,
  values,
  getFieldProps,
  selectedRow,
  setFieldValue,
}: {
  values: any;
  getFieldProps: any;
  boms?: { result: any[]; total: number };
  selectedRow: any;
  setFieldValue: any;
}) {
  const selected = selectedRow?.result?.find(() => true);

  const qrCode = useRef<HTMLElement | null>(null);
  const [moreInfoTab, setMoreInfoTab] = useState(0);
  const [manualCountModal, setManualCountModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);

  const { setLock } = useLock();

  const phone = useMediaQuery("(max-width:900px)");
  return (
    <>
      <ManualCountModal open={manualCountModal} onClose={() => setManualCountModal(false)} itemId={selected.id} />
      <UpdateQuantityModal open={quantityModal} onClose={() => setQuantityModal(false)} itemId={selected.id} />
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"} mb={1}>
        <Tabs
          value={moreInfoTab}
          variant="scrollable"
          scrollButtons={phone ? "on" : "auto"}
          style={phone ? { maxWidth: "calc(100vw - 63px)" } : { maxWidth: "35vw" }}
          textColor="primary"
          onChange={(e, v) => {
            setMoreInfoTab(v);
            setLock(true);
          }}
        >
          <Tab label="Image" />
          <Tab label="UPC" />
          <Tab label="More Info." />
          <Tab label="Quantity" />
          <Tab label="Pricing" />
          <Tab label="Shipping" />
          <Tab label="Clusters and Levels" />
        </Tabs>
        <LockButton />
      </Box>
      {moreInfoTab === 0 && <PhotoTab model="item" id={selected.id} />}
      {moreInfoTab === 1 && (
        <Box display="flex" justifyContent="space-around" alignItems="center" maxWidth="83vw">
          <div ref={(e) => (qrCode.current = e)}>
            <QRCode
              value={JSON.stringify({
                type: "item",
                panel: "inventory",
                no: selected.no,
                id: selected.id,
              })}
            />
            <Typography variant="subtitle1">Device Number: {selected.no}</Typography>
            <Typography variant="subtitle1">Device Name: {selected.name}</Typography>
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
      {moreInfoTab === 2 && <MoreInfo values={values} getFieldProps={getFieldProps} />}
      {moreInfoTab === 3 && (
        <>
          <Quantity
            getFieldProps={getFieldProps}
            values={values}
            handleManualCount={() => setManualCountModal(true)}
            handleUpdateQuantity={() => setQuantityModal(true)}
            setFieldValue={setFieldValue}
          />
        </>
      )}
      {moreInfoTab === 4 && (
        <PricingTab itemId={selected.id} boms={boms} values={values} getFieldProps={getFieldProps} />
      )}
      {moreInfoTab === 5 && <Shipping values={values} getFieldProps={getFieldProps} setFieldValue={setFieldValue} />}
      {moreInfoTab === 6 && (
        <LevelsTab
          itemType={selected.class}
          values={values.result[0]}
          getFieldProps={getFieldProps}
          setFieldValue={setFieldValue}
        />
      )}
    </>
  );
}
