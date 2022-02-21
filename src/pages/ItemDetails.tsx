import React, { useMemo, useState, useRef } from "react";
import { Box, Grid, Tabs, Tab, LinearProgress, Typography } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";
import { host } from "../host";
import Button from "../app/Button";
import BaseDataGrid from "../app/BaseDataGrid";
import { BasePaper } from "../app/Paper";
import VendorsTable from "../features/Items/VandorsTable";

import { MoreInfo, Quantity, Shipping, General, Levels, LastUsed } from "../features/Items/Forms";
import { SalesReport } from "../features/Items/Reports";

import ManualCountModal from "../features/Items/ManualCountModal";
import UpdateQuantityModal from "../features/Items/Quantity";

import { INote } from "../api/note";
import { IDocument } from "../api/document";
import { updateAnItem, addImage, IItem } from "../api/items";
import { IBom } from "../api/bom";
import SOTable from "../features/Items/SOTable";
import Toast from "../app/Toast";
import UploadButton from "../app/FileUploader";
import { exportPdf } from "../logic/pdf";
import QRCode from "../app/QRCode";
import { formatTimestampToDate } from "../logic/date";

function ItemsDetails() {
  const qrCode = useRef<HTMLElement | null>(null);
  const { itemId } = useParams<{ itemId: string }>();
  const { data: selectedRow } = useSWR<IItem>(itemId ? `/item/${itemId}` : null);

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
  // TODO: Add Note and Document modal

  const [moreInfoTab, setMoreInfoTab] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const { data: notes } = useSWR<INote[]>(
    activeTab === 0 ? (selectedRow && selectedRow.id ? `/note/item/${selectedRow.id}` : null) : null
  );
  const { data: docs } = useSWR<IDocument[]>(
    activeTab === 1 ? (selectedRow && selectedRow.id ? `/document/item/${selectedRow.id}` : null) : null
  );
  const { data: uses } = useSWR(
    activeTab === 2 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/uses` : null) : null
  );
  const { data: boms } = useSWR<IBom[]>(
    activeTab === 3 ? (selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null) : null
  );
  const { data: vendors } = useSWR(
    activeTab === 4 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/vendors` : null) : null
  );

  const { data: itemQuotes } = useSWR(
    activeTab === 5 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/quote` : null) : null
  );
  const { data: itemSOs } = useSWR(
    activeTab === 6 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/so` : null) : null
  );

  const { data: itemPOs } = useSWR(
    activeTab === 7 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/purchasepo` : null) : null
  );
  const { data: itemUsage } = useSWR(
    activeTab === 9 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/uses` : null) : null
  );
  const { data: itemQtyHistory } = useSWR(
    activeTab === 10 ? (selectedRow && selectedRow.id ? `/item/${selectedRow.id}/qty` : null) : null
  );

  const [manualCountModal, setManualCountModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);

  const poCols = useMemo(
    () => [
      { field: "number", headerName: "Number" },
      { field: "status", headerName: "Status", width: 180 },
    ],
    []
  );
  const noteCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
        width: 120,
      },
      {
        field: "creator",
        headerName: "Creator",
        width: 180,
        valueFormatter: (params) => params.row?.EmployeeId?.username,
      },
      { field: "subject", headerName: "Subject", width: 300 },
      { field: "note", headerName: "Note", flex: 1 },
    ],
    []
  );

  const docCols = useMemo(
    () => [
      { field: "name", headerName: "Name" },
      { field: "EmployeeId", headerName: "Employee" },
      { field: "description", headerName: "Description", width: 250 },
      { field: "date", headerName: "Date", width: 300 },
    ],
    []
  );

  const bomCols = useMemo<GridColDef[]>(
    () => [
      { field: "no", headerName: "no." },
      { field: "name", headerName: "Name" },
      { field: "note", headerName: "note", flex: 1 },
      { field: "current", headerName: "current", type: "boolean" },
    ],
    []
  );

  const usesCols = useMemo<GridColDef[]>(
    () => [
      { field: "no", headerName: "no." },
      { field: "name", headerName: "Name" },
      { field: "note", headerName: "note", flex: 1 },
      { field: "current", headerName: "current", type: "boolean" },
    ],
    []
  );

  const usageCols = useMemo<GridColDef[]>(
    () => [
      { field: "number", headerName: "Serial No." },
      { field: "laborCost", headerName: "Labor Cost" },
      { field: "dueDate", headerName: "Due Date", flex: 1 },
      { field: "status", headerName: "Status" },
    ],
    []
  );

  const qtyHistoryCols = useMemo<GridColDef[]>(
    () => [
      { field: "before", headerName: "Before" },
      { field: "after", headerName: "After" },
      { field: "fieldName", headerName: "Level name" },
      { field: "description", headerName: "description", flex: 1 },
    ],
    []
  );
  const QuoteCols = useMemo<GridColumns>(
    () => [
      {
        field: "Date",
        valueFormatter: (params) => formatTimestampToDate(params?.row?.date),
        minWidth: 100,
      },
      { field: "number", headerName: "Quote ID", minWidth: 100 },
      {
        field: "client",
        headerName: "Client",
        minWidth: 100,
        valueFormatter: (params) => params?.row?.client?.name,
      },
      {
        field: "rep",
        headerName: "Rep",
        minWidth: 100,
        valueFormatter: (params) => params?.row?.repOrAgency?.name,
      },
      {
        field: "state",
        headerName: "State",
        minWidth: 100,
        valueFormatter: (params) => params?.row?.repOrAgency?.state,
      },
      { field: "requesterName", headerName: "Requester", minWidth: 100 },
      {
        field: "project",
        headerName: "Project Name",
        minWidth: 100,
        valueFormatter: (params) => params?.row?.ProjectId?.name,
      },
      {
        field: "quotedBy",
        headerName: "Quoted By",
        minWidth: 100,
        valueFormatter: (params) => params?.row?.salesperson?.username,
      },
      { field: "so", headerName: "SO", minWidth: 100, valueFormatter: (params) => params?.row?.SOId?.number },
      { field: "status", headerName: "Status", minWidth: 100 },
      { field: "total", headerName: "Total Amount", flex: 1 },
    ],
    []
  );
  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      if (selectedRow && selectedRow.id) {
        const resp = await updateAnItem(selectedRow.id, data);
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
      {/* <NoteModal
                itemId={selectedItem.id as any}
                model="item"
                open={addNoteModal}
                onClose={() => setAddNoteModal(false)}
            />
            <DocumentModal
                open={addDocModal}
                onClose={() => setAddDocModal(false)}
                itemId={selectedItem.id as any}
                model="item"
            /> */}

      <ManualCountModal open={manualCountModal} onClose={() => setManualCountModal(false)} itemId={selectedRow.id} />
      <UpdateQuantityModal open={quantityModal} onClose={() => setQuantityModal(false)} itemId={selectedRow.id} />

      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item md={7} xs={12}>
                <BasePaper>
                  <General
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />

                  <Button style={{ margin: "1.3em 43% 0.5em 43%" }} kind="edit" type="submit">
                    Save
                  </Button>
                </BasePaper>
              </Grid>
              <Grid item md={5} xs={12}>
                <BasePaper
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tabs
                    style={{ marginBottom: 16 }}
                    value={moreInfoTab}
                    variant="scrollable"
                    textColor="primary"
                    onChange={(e, v) => setMoreInfoTab(v)}
                  >
                    <Tab label="More Info." />
                    <Tab label="Quantity" />
                    <Tab label="Shipping" />
                    <Tab label="Last Used" />
                    <Tab label="Image" />
                    <Tab label="QR Code" />
                    <Tab label="Clusters and Levels" />
                  </Tabs>
                  {moreInfoTab === 0 && (
                    <MoreInfo
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {moreInfoTab === 1 && (
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
                  )}
                  {moreInfoTab === 2 && (
                    <Shipping
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {moreInfoTab === 3 && (
                    <LastUsed
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {moreInfoTab === 4 && (
                    <Box mt={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
                      {/* {selectedRow?.photo && (
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
                      )} */}
                      <UploadButton onChange={handleFileChange} accept="image/*" />
                    </Box>
                  )}
                  {moreInfoTab === 5 && (
                    <Box display="flex" justifyContent="space-around" alignItems="center">
                      <div ref={(e) => (qrCode.current = e)}>
                        <QRCode
                          value={JSON.stringify({
                            type: "item",
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
                  {moreInfoTab === 6 && (
                    <Levels
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
                      selectedItem={selectedRow}
                    />
                  )}
                </BasePaper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <BasePaper style={{ margin: "1em 0" }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} textColor="primary" variant="scrollable">
          <Tab label="Notes" />
          <Tab label="Documents" />
          <Tab label="BOM allocated" />
          <Tab label="BOM" />
          <Tab label="Vendors" />
          <Tab label="Quote History" />
          <Tab label="Sales order History" />
          <Tab label="Purchase order History" />
          <Tab label="Sales Report" />
          <Tab label="Usage" />
          <Tab label="Quantity history" />
        </Tabs>
        <Box p={3}>
          {activeTab === 0 && <BaseDataGrid cols={noteCols} rows={notes || []} onRowSelected={() => {}} />}
          {activeTab === 1 && <BaseDataGrid cols={docCols} rows={docs || []} onRowSelected={() => {}} />}
          {activeTab === 2 && <BaseDataGrid cols={usesCols} rows={uses || []} onRowSelected={() => {}} />}
          {activeTab === 3 && <BaseDataGrid cols={bomCols} rows={boms || []} onRowSelected={() => {}} />}
          {activeTab === 4 && <VendorsTable selectedItem={selectedRow} rows={vendors || []} onRowSelected={() => {}} />}
          {activeTab === 5 && <BaseDataGrid rows={itemQuotes || []} cols={QuoteCols} onRowSelected={() => {}} />}
          {activeTab === 6 && <SOTable rows={itemSOs} />}
          {activeTab === 7 && <BaseDataGrid cols={poCols} rows={itemPOs || []} onRowSelected={() => {}} />}
          {activeTab === 8 && <SalesReport quotes={itemQuotes} salesOrders={itemSOs || []} />}
          {activeTab === 9 && <BaseDataGrid cols={usageCols} rows={itemUsage || []} onRowSelected={() => {}} />}
          {activeTab === 10 && (
            <BaseDataGrid cols={qtyHistoryCols} rows={itemQtyHistory || []} onRowSelected={() => {}} />
          )}
        </Box>
      </BasePaper>
    </>
  );
}

export default ItemsDetails;
