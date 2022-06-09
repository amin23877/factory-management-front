import React, { useState, useRef } from "react";
import { Box, Tabs, Tab, LinearProgress, Typography, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import Button from "app/Button";
import { BasePaper } from "app/Paper";
import VendorsTable from "./VendorsTable";

import { Quantity, Shipping, General, LastUsed, Levels } from "./Forms";
import MoreInfo from "./Forms/MoreInfo";
import PricingTab from "./Pricing";

import ManualCountModal from "./ManualCountModal";
import UpdateQuantityModal from "./Quantity";

import NotesTab from "common/Note/Tab";
import DocumentTab from "common/Document/Tab";
import { VendorModal } from "../Modals/AddVendor";
import Parts from "../BOM/Parts";

import { convertToService, IItem, updateAnItem } from "api/items";
import { IBom } from "api/bom";
import { exportPdf } from "logic/pdf";
import { getModifiedValues } from "logic/utils";
import ItemBomTable from "../BOM/ItemBomTable";

import QRCode from "app/QRCode";
import Confirm from "common/Confirm";
import Toast from "app/Toast";
import PhotoTab from "common/PhotoTab";
import { useLock, LockButton } from "common/Lock";
import AuditTable from "common/Audit";

const style = {
  border: "1px solid gray ",
  borderRadius: "4px",
  padding: "5px 10px",
  margin: "0px 0px 10px 5px ",
};

function ItemsDetails({
  selectedRow,
  setIndexActiveTab,
  setSelectedItem,
}: {
  selectedRow: IItem;
  setIndexActiveTab: (t: number) => void;
  setSelectedItem: (item: any) => void;
}) {
  const qrCode = useRef<HTMLElement | null>(null);
  const [moreInfoTab, setMoreInfoTab] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const { data: boms, mutate: mutateBoms } = useSWR<{ result: IBom[]; total: number }>(
    selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null
  );

  // const { data: itemSOs } = useSWR(
  //   activeTab === 2 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/so` : null) : null
  // );

  // const { data: itemPOs } = useSWR(
  //   activeTab === 3 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/purchasepo` : null) : null
  // );
  // const { data: itemUsage } = useSWR(
  //   activeTab === 4 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/uses` : null) : null
  // );

  const [manualCountModal, setManualCountModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);
  const [addVendorModal, setAddVendorModal] = useState(false);
  const [bomPartsModal, setBomPartsModal] = useState(false);
  const [selectedBom] = useState<IBom>();
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  // const poCols = useMemo<GridColDef[]>(
  //   () => [
  //     {
  //       field: "Date",
  //       valueFormatter: (params) => formatTimestampToDate(params?.row?.purchasePO.date),
  //       width: 100,
  //     },
  //     {
  //       field: "Number",
  //       flex: 1,
  //       valueFormatter: (params) => params.row?.purchasePO.number,
  //     },
  //     {
  //       field: "Vendor",
  //       width: 100,
  //       valueFormatter: (params) => params?.row?.vendor.name,
  //     },
  //     {
  //       field: "Qty Ord.",
  //       width: 120,
  //       valueFormatter: (params) => params.row?.lir.quantity,
  //     },
  //     {
  //       field: "Qty Received",
  //       width: 120,
  //       valueFormatter: (params) => params.row?.lir?.received,
  //     },
  //     {
  //       field: "Received Date",
  //       width: 100,
  //       valueFormatter: (params) => formatTimestampToDate(params.row?.lir.receivedDate),
  //     },
  //     {
  //       field: "UOM ",
  //       valueFormatter: (params) => params.row?.lir.uom,
  //       width: 120,
  //     },
  //     {
  //       field: "Cost",
  //       width: 80,
  //       valueFormatter: (params) => params.row?.lir.cost,
  //     },
  //     {
  //       field: "Total Cost",
  //       width: 100,
  //       valueFormatter: (params) => params?.row?.lir.cost * params?.row?.lir.quantity,
  //     },
  //     {
  //       field: "Status",
  //       width: 80,
  //       valueFormatter: (params) => params.row?.lir.status,
  //     },
  //   ],
  //   []
  // );

  // const usageCols = useMemo<GridColDef[]>(
  //   () => [
  //     {
  //       field: "soDate",
  //       headerName: "SO Date",
  //       valueFormatter: (params) => formatTimestampToDate(params.row?.so.date),
  //       flex: 1,
  //     },
  //     {
  //       field: "unit",
  //       headerName: "Unit",
  //       valueFormatter: (params) => params.row?.unit.number,
  //       flex: 1,
  //     },
  //     {
  //       field: "deviceNumber",
  //       headerName: "Device Number",
  //       valueFormatter: (params) => params.row?.item.no,
  //       flex: 1,
  //     },
  //     {
  //       field: "so",
  //       headerName: "SO",
  //       valueFormatter: (params) => params.row?.so.number,
  //       flex: 1,
  //     },
  //     {
  //       field: "estShipDate",
  //       headerName: "Est Shipping Date",
  //       valueFormatter: (params) => params.row?.so.estimatedShipDate,
  //       flex: 1,
  //     },
  //     {
  //       field: "qty",
  //       headerName: "QTY",
  //       valueFormatter: (params) => params.row?.lir.quantity,
  //       flex: 1,
  //     },
  //     {
  //       field: "client",
  //       headerName: "Client",
  //       valueFormatter: (params) => params.row?.client.name,
  //       flex: 1,
  //     },
  //   ],
  //   []
  // );

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

  const handleConvertToService = async () => {
    try {
      await Confirm({
        text: "You are going to make this item a service",
        onConfirm: async () => {
          try {
            await convertToService(selectedRow.id);
            setSelectedItem(null);
            setIndexActiveTab(0);
            Toast("Item converted to Service", "success");
          } catch (error) {
            console.log(error);
          }
        },
      });
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
              height={phone ? "" : "calc(100vh - 160px)"}
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
                </BasePaper>
                <BasePaper style={{ flex: 1, margin: 8 }}>
                  <Tabs
                    value={moreInfoTab}
                    variant="scrollable"
                    scrollButtons={phone ? "on" : "auto"}
                    style={
                      phone
                        ? { marginBottom: 10, maxWidth: "calc(100vw - 63px)" }
                        : { marginBottom: 10, maxWidth: "35vw" }
                    }
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
                    <Tab label="Convert" />
                  </Tabs>
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
                      <LastUsed
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                      />
                      <hr style={{ width: "100%" }} />
                      <Quantity
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        itemId={selectedRow.id}
                        handleManualCount={() => setManualCountModal(true)}
                        handleUpdateQuantity={() => setQuantityModal(true)}
                      />
                    </>
                  )}
                  {moreInfoTab === 4 && (
                    <PricingTab
                      itemId={selectedRow.id}
                      boms={boms}
                      errors={errors}
                      touched={touched}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {moreInfoTab === 5 && (
                    <Shipping
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {moreInfoTab === 6 && (
                    <Levels
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {moreInfoTab === 7 && (
                    <Box textAlign="center">
                      <Button kind="add" onClick={handleConvertToService}>
                        Convert to Service
                      </Button>
                    </Box>
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
                {/* {activeTab === 2 && itemSOs && <SOTable rows={itemSOs} />} */}
                {/* {activeTab === 3 && (
                  <BaseDataGrid
                    cols={poCols}
                    rows={itemPOs ? itemPOs.map((i: any, index: string) => ({ ...i, id: index })) : []}
                    onRowSelected={() => {}}
                    height={"calc(100% - 60px)"}
                  />
                )} */}
                {/* {activeTab === 4 && (
                  <BaseDataGrid
                    cols={usageCols}
                    rows={itemUsage || []}
                    onRowSelected={() => {}}
                    height={"calc(100% - 60px)"}
                  />
                )} */}
                {activeTab === 6 && <NotesTab itemId={selectedRow.id} model="item" />}
                {activeTab === 7 && <AuditTable itemId={selectedRow.id} model="Item" />}
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ItemsDetails;
