import React, { useMemo, useState, useRef } from "react";
import { Box, Tabs, Tab, LinearProgress, Typography, useMediaQuery } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import { host } from "../../host";
import Button from "../../app/Button";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";
import VendorsTable from "./VandorsTable";

import { MoreInfo, Quantity, Shipping, General, LastUsed, Pricing } from "./Forms";

import ManualCountModal from "./ManualCountModal";
import UpdateQuantityModal from "./Quantity";

import NoteModal from "../../common/NoteModal";
import DocumentModal from "../../common/DocumentModal";
import { VendorModal } from "../Modals/AddVendor";
// import BOMModal from "../BOM/BomModal";
import Parts from "../BOM/Parts";

import { addImage, updateAnItem } from "../../api/items";
import { IBom } from "../../api/bom";
// import SOTable from "./SOTable";
import UploadButton from "../../app/FileUploader";
import { exportPdf } from "../../logic/pdf";
// import { formatTimestampToDate } from "../../logic/date";
import { getModifiedValues } from "../../logic/utils";
import ItemBomTable from "../BOM/ItemBomTable";

import QRCode from "../../app/QRCode";
import { DocumentsDataGrid, NotesDataGrid } from "common/DataGrids";
import Toast from "app/Toast";

const style = {
  border: "1px solid gray ",
  borderRadius: "4px",
  padding: "5px 10px",
  margin: "0px 0px 10px 5px ",
};

function ItemsDetails({
  selectedRow,
  onNoteSelected,
  onDocSelected,
  onDone,
}: {
  selectedRow: any;
  onDone?: () => void;
  onNoteSelected: (a: any) => void;
  onDocSelected: (a: any) => void;
}) {
  const qrCode = useRef<HTMLElement | null>(null);

  const [img, setImg] = useState<any>();

  const handleFileChange = async (e: any) => {
    if (selectedRow && selectedRow.id) {
      if (!e.target.files) {
        return;
      }
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      const resp = await addImage(selectedRow.id, file);
      if (resp) {
        setImg(url);
      }
    }
  };
  const [moreInfoTab, setMoreInfoTab] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const { data: boms } = useSWR<IBom[]>(selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null);

  const { data: vendors } = useSWR(
    activeTab === 1 ? (selectedRow && selectedRow.id ? `/vending?ItemId=${selectedRow.id}` : null) : null
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
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addDocModal, setAddDocModal] = useState(false);
  const [addVendorModal, setAddVendorModal] = useState(false);
  const [bomPartsModal, setBomPartsModal] = useState(false);
  const [selectedBom] = useState<IBom>();
  const phone = useMediaQuery("(max-width:900px)");

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

  const pricingCols = useMemo<GridColDef[]>(
    () => [
      { field: "label", headerName: "Label", flex: 1 },
      { field: "price", headerName: "Price", flex: 1 },
      { field: "nonCommissionable", headerName: "no Com.", flex: 1, type: "boolean" },
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
      <NoteModal
        itemId={selectedRow.id as any}
        model="item"
        open={addNoteModal}
        onClose={() => setAddNoteModal(false)}
      />
      <DocumentModal
        open={addDocModal}
        onClose={() => setAddDocModal(false)}
        itemId={selectedRow.id as any}
        model="item"
      />
      <VendorModal open={addVendorModal} onClose={() => setAddVendorModal(false)} itemId={selectedRow.id as any} />
      {selectedBom && <Parts open={bomPartsModal} onClose={() => setBomPartsModal(false)} bom={selectedBom} />}
      <ManualCountModal open={manualCountModal} onClose={() => setManualCountModal(false)} itemId={selectedRow.id} />
      <UpdateQuantityModal open={quantityModal} onClose={() => setQuantityModal(false)} itemId={selectedRow.id} />

      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
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
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Button style={{ width: "200px", marginTop: "10px" }} kind="edit" type="submit">
                      Save
                    </Button>
                  </div>
                </BasePaper>
                <BasePaper style={{ flex: 1 }}>
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
                  </Tabs>
                  {moreInfoTab === 0 && (
                    <Box
                      mt={1}
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      gridGap={10}
                    >
                      {selectedRow?.photo && (
                        <img
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            maxHeight: 400,
                            margin: "0px auto",
                          }}
                          alt=""
                          src={img ? img : `http://${host}${selectedRow?.photo}`}
                        />
                      )}
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <UploadButton onChange={handleFileChange} accept="image/*" />
                      </div>
                    </Box>
                  )}
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

                  {moreInfoTab === 2 && (
                    <MoreInfo
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  )}
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
                    <div style={{ maxWidth: "83vw" }}>
                      <BaseDataGrid rows={selectedRow?.pricing || []} cols={pricingCols} height={220} pagination />
                      <Pricing
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        boms={boms?.length === 0 ? false : true}
                      />
                    </div>
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
                  {/* {moreInfoTab === 6 && (
                    <DynamicFilterAndFields
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                      selectedItem={selectedRow}
                    />
                  )} */}
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
                  {boms?.length === 0 ? <Tab label="Vendor" /> : <Tab label="BOM" />}
                  <Tab label="Sales order History" />
                  <Tab label="PO History" />
                  <Tab label="Usage" />
                  <Tab label="Note" />
                  <Tab label="Auditing" />
                </Tabs>
                {activeTab === 0 && (
                  <>
                    <Button
                      onClick={() => {
                        setAddDocModal(true);
                      }}
                      style={style}
                    >
                      + Add Document
                    </Button>
                    <DocumentsDataGrid model="item" recordId={selectedRow.id} onDocumentSelected={onDocSelected} />
                  </>
                )}
                {activeTab === 1 && boms?.length === 0 && (
                  <div style={{ maxWidth: "79vw", overflow: "auto" }}>
                    <Button
                      onClick={() => {
                        setAddVendorModal(true);
                      }}
                      style={style}
                    >
                      + Add Vendor
                    </Button>
                    <VendorsTable selectedItem={selectedRow} rows={vendors || []} onRowSelected={() => {}} />
                  </div>
                )}
                {activeTab === 1 && boms && boms.length > 0 && (
                  <div style={{ maxWidth: "79vw", overflow: "auto" }}>
                    <ItemBomTable item={selectedRow} boms={boms} />
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
                {activeTab === 5 && (
                  <>
                    <Button
                      onClick={() => {
                        setAddNoteModal(true);
                      }}
                      style={style}
                    >
                      + Add Note
                    </Button>
                    <NotesDataGrid model="item" recordId={selectedRow.id} onNoteSelected={onNoteSelected} />
                  </>
                )}
                {activeTab === 6 && <div>Auditing</div>}
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ItemsDetails;
