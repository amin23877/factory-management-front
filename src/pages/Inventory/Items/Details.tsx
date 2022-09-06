import React, { useState, useRef, useMemo } from "react";
import { Box, Tabs, Tab, LinearProgress, Typography, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import Button from "app/Button";
import { BasePaper } from "app/Paper";
import VendorsTable from "features/Items/VendorsTable";

import { General } from "features/Items/Forms";
import MoreInfo from "features/Items/Forms/MoreInfo";
import Quantity from "features/Items/Forms/Quantity";
import PricingTab from "features/Items/Forms/Pricing";
import Shipping from "features/Items/Forms/Shipping";

import ManualCountModal from "features/Items/ManualCountModal";
import UpdateQuantityModal from "features/Items/Quantity";

import NotesTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import { VendorModal } from "features/Modals/AddVendor";
import Parts from "features/BOM/Parts";

import { IItem, updateAnItem } from "api/items";
import { IBom } from "api/bom";
import { exportPdf } from "logic/pdf";
import { getModifiedValues } from "logic/utils";
import ItemBomTable from "features/BOM/ItemBomTable";

import QRCode from "app/QRCode";
// import Confirm from "common/Confirm";
import Toast from "app/Toast";
import PhotoTab from "common/PhotoTab";
import AuditTable from "common/Audit";
import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";
import { formatTimestampToDate } from "logic/date";
import LevelsTab from "common/Level/Tab";
import { useParams } from "react-router-dom";
import { LockButton } from "common/Lock";

const style = {
  border: "1px solid gray ",
  borderRadius: "4px",
  padding: "5px 10px",
  margin: "0px 0px 10px 5px ",
};

function ItemsDetails() {
  const { itemId } = useParams<{ itemId: string }>();
  const { data: selectedRow } = useSWR<IItem>(itemId ? `/item/${itemId}` : null);

  const qrCode = useRef<HTMLElement | null>(null);
  const [moreInfoTab, setMoreInfoTab] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const { data: boms, mutate: mutateBoms } = useSWR<{ result: IBom[]; total: number }>(
    selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null
  );

  const { data: itemUsage } = useSWR<{ result: any[]; total: number }>(
    activeTab === 5 ? (selectedRow && selectedRow.id ? `/usage?ItemId=${selectedRow.id}` : null) : null
  );

  const [manualCountModal, setManualCountModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);
  const [addVendorModal, setAddVendorModal] = useState(false);
  const [bomPartsModal, setBomPartsModal] = useState(false);
  const [selectedBom] = useState<IBom>();
  const phone = useMediaQuery("(max-width:900px)");

  const usageCols = useMemo<GridColumns>(
    () => [
      {
        field: "soNumber",
        headerName: "SO NO.",
        valueFormatter: (params) => params.row?.SOId?.number,
        flex: 1,
      },
      {
        field: "unit",
        headerName: "Unit NO.",
        valueFormatter: (params) => params.row?.UnitId?.number,
        flex: 1,
      },
      {
        field: "unitName",
        headerName: "Device NO.",
        valueFormatter: (params) => {
          let serial = params.row?.UnitId?.serial.split("-");
          serial.pop();
          return serial.join("-");
        },
        flex: 1,
      },
      {
        field: "count",
        headerName: "Usage",
        flex: 1,
      },
      {
        field: "soDate",
        headerName: "SO Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.SOId?.createdAt),
        flex: 1,
      },
    ],
    []
  );

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      if (selectedRow && selectedRow.id) {
        const reqData = getModifiedValues(data, selectedRow);

        const resp = await updateAnItem(selectedRow.id, reqData);
        if (resp) {
          setSubmitting(false);
          mutate("/item?device=false");

          Toast("Record updated successfully", "success");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedRow) {
    return <LinearProgress />;
  }

  return (
    <>
      <VendorModal open={addVendorModal} onClose={() => setAddVendorModal(false)} itemId={selectedRow.id as any} />
      {selectedBom && <Parts open={bomPartsModal} onClose={() => setBomPartsModal(false)} bom={selectedBom} />}
      <ManualCountModal open={manualCountModal} onClose={() => setManualCountModal(false)} itemId={selectedRow.id} />
      <UpdateQuantityModal open={quantityModal} onClose={() => setQuantityModal(false)} itemId={selectedRow.id} />

      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, getFieldProps }) => (
          <Form style={{ flex: 1, display: "flex" }}>
            <Box
              display="grid"
              gridTemplateColumns={phone ? "1fr" : "1fr 2fr"}
              gridTemplateRows={phone ? "" : "1fr"}
              gridGap={10}
              flex={1}
            >
              <Box display="flex" flexDirection="column" gridGap={5} height={phone ? "" : "100%"}>
                <BasePaper>
                  <General
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <button type="submit" style={{ display: "none" }}>
                    submit
                  </button>
                </BasePaper>
                <BasePaper style={{ flex: 1 }}>
                  <Box display={"flex"} justifyContent="space-between" alignItems={"center"} mb={1}>
                    <Tabs
                      value={moreInfoTab}
                      variant="scrollable"
                      scrollButtons={phone ? "on" : "auto"}
                      style={phone ? { maxWidth: "calc(100vw - 63px)" } : { maxWidth: "35vw" }}
                      textColor="primary"
                      onChange={(e, v) => setMoreInfoTab(v)}
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
                  {moreInfoTab === 0 && <PhotoTab model="item" id={selectedRow.id} />}
                  {moreInfoTab === 1 && (
                    <Box display="flex" justifyContent="space-around" alignItems="center" maxWidth="83vw">
                      <div ref={(e) => (qrCode.current = e)}>
                        <QRCode
                          value={JSON.stringify({
                            type: "item",
                            panel: "inventory",
                            no: selectedRow.no,
                            id: selectedRow.id,
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
                    <PricingTab itemId={selectedRow.id} boms={boms} values={values} getFieldProps={getFieldProps} />
                  )}
                  {moreInfoTab === 5 && (
                    <Shipping values={values} getFieldProps={getFieldProps} setFieldValue={setFieldValue} />
                  )}
                  {moreInfoTab === 6 && (
                    <LevelsTab
                      itemType={selectedRow.class}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </BasePaper>
              </Box>
              <BasePaper style={{ height: "100%" }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, v) => setActiveTab(v)}
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons={phone ? "on" : "auto"}
                  style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" } : { marginBottom: "10px" }}
                >
                  <Tab label="Document" />
                  <Tab label="Vendor" />
                  <Tab label="BOM" disabled={!values.bom} />
                  <Tab label="Sales order History" />
                  <Tab label="PO History" />
                  <Tab label="Usage" />
                  <Tab label="Note" />
                  <Tab label="Auditing" />
                </Tabs>
                {activeTab === 0 && <DocumentTab itemId={selectedRow.id} model="item" />}
                {activeTab === 1 && (
                  <div style={{ maxWidth: "79vw", overflow: "auto" }}>
                    <Button
                      onClick={() => {
                        setAddVendorModal(true);
                      }}
                      style={style}
                    >
                      + Add Vendor
                    </Button>
                    <VendorsTable selectedItem={selectedRow} />
                  </div>
                )}
                {activeTab === 2 && boms && (
                  <div style={{ maxWidth: "79vw", overflow: "auto", height: "85%" }}>
                    <ItemBomTable item={selectedRow} boms={boms?.result || []} mutateBoms={mutateBoms} />
                  </div>
                )}
                {activeTab === 5 && (
                  <BaseDataGrid
                    cols={usageCols}
                    rows={itemUsage?.result || []}
                    onRowSelected={() => {}}
                    height={"calc(100% - 60px)"}
                  />
                )}
                {activeTab === 6 && <NotesTab itemId={selectedRow.id} model="item" />}
                {activeTab === 7 && <AuditTable itemId={selectedRow.id} />}
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ItemsDetails;
