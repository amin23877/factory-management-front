import React, { Fragment, useMemo, useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GridColumns } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";
import { Formik } from "formik";

import { AddressesForm, UpdateForm, MoreInfoForm, VendorForm } from "./Forms";
import BaseDataGrid from "app/BaseDataGrid";
import { BasePaper } from "app/Paper";
import Button from "app/Button";
import Toast from "app/Toast";
import NoteModal from "common/NoteModal";
import DocumentModal from "common/DocumentModal";
import { NotesDataGrid } from "common/DataGrids";

import { updatePurchasePO, IPurchasePO } from "api/purchasePO";
import { ILineItem } from "api/lineItem";
import { IDocument } from "api/document";

import { fileType } from "logic/fileType";
import { formatTimestampToDate } from "logic/date";
import { getModifiedValues } from "logic/utils";

const style = {
  border: "1px solid gray ",
  borderRadius: "4px",
  padding: "5px 10px",
  margin: "3px 0px 10px 5px ",
};

export default function Details({ selectedPO, onDone }: { selectedPO: IPurchasePO; onDone?: () => void }) {
  const phone = useMediaQuery("(max-width:900px)");
  const { data: lines } = useSWR<{ result: ILineItem[]; total: number }>(`/lineitem?po=${selectedPO.id}`);
  const { data: docs } = useSWR<IDocument[]>(`/document/po/${selectedPO.id}`);

  const [activeTab, setActiveTab] = useState(0);
  const [activeMoreTab, setActiveMoreTab] = useState(0);

  const [selectedDcoument, setSelectedDcoument] = useState<IDocument>();
  const [noteModal, setNoteModal] = useState(false);
  const [docModal, setDocModal] = useState(false);

  const receivedCols = useMemo<GridColumns>(
    () => [
      { field: "Date", valueFormatter: (r) => formatTimestampToDate(r.row.ItemId?.date), width: 200 },
      { field: "ItemId", headerName: "Item Number", valueFormatter: (r) => r.row.ItemId.number, width: 200 },
      { field: "ItemId", headerName: "Item Name", valueFormatter: (r) => r.row.ItemId.name, width: 200 },
      { field: "vendor", headerName: "Vendor P. NO.", flex: 1 },
      { field: "quantity", headerName: "QTY", width: 90 },
      { field: "uom", headerName: "UOM", width: 100 },
      { field: "note", headerName: "Note", width: 200 },
    ],
    []
  );

  const LICols = useMemo<GridColumns>(
    () => [
      { field: "ItemId", headerName: "Item No.", valueFormatter: (r) => r.row.ItemId?.no, width: 120 },
      { field: "ItemName", headerName: "Item Name", valueFormatter: (r) => r.row.ItemId?.name, flex: 1 },
      {
        field: "Vendor P.NO.",
        valueFormatter: (r) => r.row.ItemId?.vendorPartNumber,
        width: 120,
      },
      { field: "quantity", headerName: "QTY", width: 90 },
      {
        field: "UOM",
        valueFormatter: (r) => r.row.ItemId?.uom,
        width: 100,
      },
      { field: "price", headerName: "Cost", width: 100 }, //check
      { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row.quantity, width: 100 },
      { field: "Status", valueFormatter: (r) => r.row?.PurchasePOId?.status, width: 100 },
      { field: "Note", valueFormatter: (r) => r.row?.PurchasePOId?.note, width: 100 },
    ],
    []
  );

  const docCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.createdAt),
        width: 120,
      },
      {
        field: "creator",
        headerName: "Creator",
        width: 120,
      },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "id", headerName: "ID", width: 200, valueFormatter: () => selectedPO.number },
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "type",
        headerName: "File Type",
        valueFormatter: (params) => fileType(params.row?.path),
        width: 120,
      },
    ],
    [selectedPO.number]
  );

  const handleSubmit = async (d: any) => {
    try {
      if (selectedPO.id && d.status) {
        await updatePurchasePO(selectedPO.id, getModifiedValues(d, selectedPO));
        Toast("Purchase Order updated.", "success");
        mutate("/po");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedPO && selectedPO.id && (
        <NoteModal itemId={selectedPO.id} model="purchasePO" open={noteModal} onClose={() => setNoteModal(false)} />
      )}
      {selectedPO && selectedPO.id && (
        <DocumentModal
          itemId={selectedPO.id}
          model="purchasePO"
          docData={selectedDcoument}
          open={docModal}
          onClose={() => setDocModal(false)}
        />
      )}
      <Box
        display="grid"
        gridTemplateColumns={phone ? "1fr" : "3fr 4fr"}
        gridGap={10}
        height={phone ? "" : "calc(100vh - 160px)"}
      >
        <Formik initialValues={selectedPO} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur, errors, setFieldValue }) => (
            <Box display="flex" flexDirection="column" height={phone ? "" : "100%"} gridGap={10}>
              <Box>
                <BasePaper>
                  <UpdateForm values={values} errors={errors} handleBlur={handleBlur} handleChange={handleChange} />
                  <Box display="flex" width="100%" justifyContent="center" alignItems="center">
                    <Button style={{ marginTop: "1em", width: "200px" }} type="submit" kind="edit">
                      Save
                    </Button>
                  </Box>
                </BasePaper>
              </Box>
              <BasePaper style={{ flex: 1 }}>
                <Tabs
                  textColor="primary"
                  value={activeMoreTab}
                  onChange={(e, nv) => setActiveMoreTab(nv)}
                  variant="scrollable"
                  scrollButtons={phone ? "on" : "auto"}
                  style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "1em" } : { marginBottom: "1em" }}
                >
                  <Tab label="More Info" />
                  <Tab label="Vendor" />
                  <Tab label="Addresses" />
                </Tabs>
                <Box>
                  {activeMoreTab === 0 && (
                    <MoreInfoForm
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {activeMoreTab === 1 && (
                    <VendorForm values={values} handleBlur={handleBlur} handleChange={handleChange} />
                  )}
                  {activeMoreTab === 2 && (
                    <AddressesForm values={values} handleBlur={handleBlur} handleChange={handleChange} />
                  )}
                </Box>
              </BasePaper>
            </Box>
          )}
        </Formik>
        <BasePaper style={{ height: "100%" }}>
          <Tabs
            textColor="primary"
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            variant="scrollable"
            scrollButtons={phone ? "on" : "auto"}
            style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "1em" } : { marginBottom: "1em" }}
          >
            <Tab label="Line items" />
            <Tab label="Documents" />
            <Tab label="Receiving" />
            <Tab label="Notes" />
            <Tab label="Auditing" />
          </Tabs>
          {activeTab === 0 && (
            <BaseDataGrid
              rows={lines?.result || []}
              cols={LICols}
              onRowSelected={(d) => {
                // TODO: edit line item
              }}
              height={"calc(100% - 60px)"}
            />
          )}
          {activeTab === 1 && (
            <Fragment>
              <Button
                onClick={() => {
                  setDocModal(true);
                }}
                style={style}
              >
                + Add Document
              </Button>
              <BaseDataGrid
                cols={docCols}
                rows={docs || []}
                onRowSelected={(r) => {
                  setSelectedDcoument(r);
                  setDocModal(true);
                }}
                height={"calc(100% - 100px)"}
              />
            </Fragment>
          )}
          {activeTab === 2 && (
            <BaseDataGrid
              rows={[]}
              cols={receivedCols}
              onRowSelected={(d) => {
                // TODO: edit line item
              }}
              height={"calc(100% - 60px)"}
            />
          )}
          {activeTab === 3 && (
            <Fragment>
              <Button
                onClick={() => {
                  setNoteModal(true);
                }}
                style={style}
              >
                + Add Note
              </Button>
              <NotesDataGrid
                model="po"
                recordId={selectedPO?.id || ""}
                onNoteSelected={(d) => {
                  // TODO: edit note
                }}
              />
            </Fragment>
          )}
        </BasePaper>
      </Box>
    </>
  );
}
