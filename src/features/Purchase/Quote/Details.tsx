import React, { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@material-ui/core/Box";
import { Tab, Tabs, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";

import TextField from "app/TextField";
import { FieldSelect } from "app/Inputs";
import Button from "app/Button";
import { BasePaper } from "app/Paper";

import { getVendors } from "api/vendor";
import { IPurchaseQuote, updatePurchaseQuote } from "api/purchaseQuote";

import NoteModal from "../../../common/NoteModal";
import DocumentsModal from "../../../common/DocumentModal";
import BaseDataGrid from "app/BaseDataGrid";
import { formatTimestampToDate } from "logic/date";
import { DocumentsDataGrid, NotesDataGrid } from "common/DataGrids";

const style = {
  border: "1px solid gray ",
  borderRadius: "4px",
  padding: "5px 10px",
  margin: "3px 0px 10px 5px ",
};

export default function Details({
  onDone,
  initialValues,
  notes,
  docs,
  onDocumentSelected,
  onNoteSelected,
}: {
  onDone?: () => void;
  initialValues: IPurchaseQuote;
  notes: any;
  docs: any;
  onNoteSelected: (d: any) => void;
  onDocumentSelected: (d: any) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [noteModal, setNoteModal] = useState(false);
  const [docModal, setDocModal] = useState(false);
  const schema = Yup.object().shape({
    // VendorId: Yup.number().required(),
  });

  const LICols = useMemo<GridColumns>(
    () => [
      { field: "ItemId", headerName: "Item No.", valueFormatter: (r) => r.row.ItemId.no, width: 120 },
      { field: "ItemName", headerName: "Item Name", valueFormatter: (r) => r.row.ItemId.name, flex: 1 },
      {
        field: "Vendor P.NO.",
        valueFormatter: (r) => r.row.ItemId.vendorPartNumber,
        width: 120,
      },
      { field: "quantity", headerName: "QTY", width: 90 },
      {
        field: "UOM",
        valueFormatter: (r) => r.row.ItemId.uom,
        width: 100,
      },
      { field: "price", headerName: "Cost", width: 100 }, //check
      { field: "total", headerName: "Total", valueFormatter: (r) => r.row?.price * r.row.quantity, width: 100 },
    ],
    []
  );

  const handleSubmit = async (d: any) => {
    try {
      if (initialValues.id) {
        const resp = await updatePurchaseQuote(initialValues.id, { ...d });
        if (resp) {
          onDone && onDone();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      {initialValues && initialValues.id && (
        <NoteModal
          itemId={initialValues.id}
          model="purchaseQuote"
          open={noteModal}
          onClose={() => setNoteModal(false)}
        />
      )}
      {initialValues && initialValues.id && (
        <DocumentsModal
          itemId={initialValues.id}
          model="purchaseQuote"
          open={docModal}
          onClose={() => setDocModal(false)}
        />
      )}
      <Box
        display="grid"
        gridTemplateColumns={phone ? "1fr" : "1fr 3fr"}
        height={phone ? "" : "calc(100vh - 155px)"}
        gridGap={10}
      >
        <BasePaper>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, handleChange, handleBlur }: any) => (
              <Form>
                <Box display="grid" gridTemplateColumns="1fr  1fr" my={1} gridGap={10}>
                  <TextField
                    name="senderNumber"
                    value={values.senderNumber}
                    label="Quote Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ gridColumnEnd: "span 2" }}
                  />
                  <TextField
                    name="date"
                    value={formatTimestampToDate(values.date)}
                    label="Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                    style={{ gridColumnEnd: "span 2" }}
                  />
                  <FieldSelect
                    request={getVendors}
                    itemTitleField="name"
                    itemValueField="id"
                    name="VendorId"
                    label="Vendor Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={typeof values.VendorId === "string" ? values.VendorId : values.VendorId?.id}
                    error={Boolean(errors.VendorId)}
                  />
                  <FieldSelect
                    request={getVendors}
                    itemTitleField="number"
                    itemValueField="id"
                    name="VendorId"
                    label="Vendor Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={typeof values.VendorId === "string" ? values.VendorId : values.VendorId?.id}
                    error={Boolean(errors.VendorId)}
                    disabled
                  />

                  <FieldSelect
                    request={getVendors}
                    itemTitleField="website"
                    itemValueField="id"
                    name="VendorId"
                    label="Vendor Website"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={typeof values.VendorId === "string" ? values.VendorId : values.VendorId?.id}
                    error={Boolean(errors.VendorId)}
                    disabled
                    style={{ gridColumnEnd: "span 2" }}
                  />
                  <TextField
                    name="companyName"
                    value={values.companyName}
                    label="Company Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    name="companyWebsite"
                    value={values.companyWebsite}
                    label="Company Website"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    name="contactName"
                    value={values.contactName}
                    label="Contact Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    name="contactNumber"
                    value={values.contactNumber}
                    label="Contact Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button style={{ width: "200px" }} type="submit" kind="edit">
                    Save
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </BasePaper>
        <BasePaper style={{ height: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            textColor="primary"
            variant="scrollable"
            scrollButtons={phone ? "on" : "auto"}
            style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "1em" } : { marginBottom: "1em" }}
          >
            <Tab label="Line Items" />
            <Tab label="Documents" />
            <Tab label="Notes" />
            <Tab label="Auditing" />
          </Tabs>
          {activeTab === 0 && <BaseDataGrid rows={[]} cols={LICols} height={"calc(100% - 60px)"} />}
          {activeTab === 1 && (
            <>
              <Button
                onClick={() => {
                  setDocModal(true);
                }}
                style={style}
              >
                + Add Document
              </Button>
              <DocumentsDataGrid
                model="quote"
                recordId={initialValues.id || ""}
                onDocumentSelected={onDocumentSelected}
              />
            </>
          )}
          {activeTab === 2 && (
            <>
              <Button
                onClick={() => {
                  setNoteModal(true);
                }}
                style={style}
              >
                + Add Note
              </Button>
              <NotesDataGrid model="quote" recordId={initialValues.id || ""} onNoteSelected={onNoteSelected} />
            </>
          )}
          {activeTab === 3 && (
            <>
              <div style={{ height: "68vh", width: "100%" }}></div>
            </>
          )}
        </BasePaper>
      </Box>
    </>
  );
}
