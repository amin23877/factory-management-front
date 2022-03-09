import React, { useMemo, useState } from "react";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Box, Tab, Tabs, useMediaQuery } from "@material-ui/core";
import useSWR from "swr";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import BaseDataGrid from "../../../app/BaseDataGrid";

import { UpdateVendorForm } from "./Forms";
import { formatTimestampToDate } from "../../../logic/date";

import NoteModal from "../../../common/NoteModal";
import DocumentModal from "../../../common/DocumentModal";

import { ContactModal } from "../../Modals/ContactModal";

import { IContact } from "../../../api/contact";
import { INote } from "../../../api/note";
import { IDocument } from "../../../api/document";
import { IVendor } from "../../../api/vendor";
import { fileType } from "../../../logic/fileType";

export default function VendorDetails({ vendor }: { vendor: IVendor }) {
  const [activeTab, setActiveTab] = useState(0);

  const { data: items } = useSWR(activeTab === 0 ? `/vendor/${vendor.id}/items` : null);
  const { data: documents } = useSWR(activeTab === 1 ? `/document/vendor/${vendor.id}` : null);
  const { data: contacts } = useSWR(activeTab === 2 ? `/contact/vendor/${vendor.id}` : null);
  const { data: notes } = useSWR(activeTab === 4 ? `/note/vendor/${vendor.id}` : null);
  const { data: POs } = useSWR(activeTab === 3 ? `/purchasepo?VendorId=${vendor.id}` : null);

  const [noteModal, setNoteModal] = useState(false);
  const [documentModal, setDocumentModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<INote>();
  const [selectedDocument, setSelectedDocument] = useState<IDocument>();
  const [selectedContact, setSelectedContact] = useState<IContact>();

  const itemCols: GridColDef[] = [
    { field: "ItemId", headerName: "Item NO.", valueFormatter: (r) => r.row?.ItemId?.no, width: 120 },
    { field: "ItemName", headerName: "Item Name", valueFormatter: (r) => r.row?.ItemId?.name, flex: 1 },
    {
      field: "vendorPartName",
      headerName: "Vendor P.NO.",
      width: 120,
      valueFormatter: (r) => r.row?.vending?.vendorPartName,
    },
    { field: "vendorSKU", headerName: "Vendor SKU", width: 120, valueFormatter: (r) => r.row?.vending?.vendorSKU },
    { field: "Last Lead", width: 120, valueFormatter: (r) => r.row?.vending?.leadTime },
    { field: "QOH", width: 100, valueFormatter: (r) => r.row?.ItemId?.qtyOnHand },
    { field: "Cost", width: 100, valueFormatter: (r) => r.row?.vending?.cost },
    { field: "Inventory Val.", width: 130, valueFormatter: (r) => r.row?.ItemId?.qohValue },
    { field: "Min Order", valueFormatter: (r) => r.row?.ItemId?.minOrder, width: 100 },
  ];
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

  const POCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
        width: 120,
      },
      { field: "Number", headerName: "PO NO.", width: 100 },
      { field: "qtyOrdered", headerName: "Qty Ordered", width: 120 },
      { field: "qtyReceived", headerName: "Qty Received", width: 120 },
      { field: "qtySold", headerName: "Qty Sold", width: 120 },
      { field: "uom", headerName: "PO UOM", width: 120 },
      { field: "dateReceived", headerName: "Date Received", width: 120 },
      { field: "cost", headerName: "Cost", width: 80 },
      { field: "total", headerName: "Total Cost", width: 120 },
      { field: "status", headerName: "Status", width: 100 },
    ],
    []
  );
  const docCols = useMemo<GridColumns>(
    () => [
      {
        field: "date",
        headerName: "Date",
        valueFormatter: (params) => formatTimestampToDate(params.row?.date),
        width: 120,
      },
      {
        field: "EmployeeId",
        headerName: "Creator",
        valueFormatter: (params) => params.row?.employee?.username,
        width: 120,
      },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "id", headerName: "ID", width: 200 },
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "type",
        headerName: "File Type",
        valueFormatter: (params) => fileType(params.row?.path),
        width: 120,
      },
    ],
    []
  );

  const contactsCols: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "ext", headerName: "EXT", width: 80 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "title", headerName: "Title", width: 110 },
    { field: "department", headerName: "Department", width: 120 },
    { field: "main", headerName: "Main", width: 80, type: "boolean" },
    { field: "active", headerName: "Active", width: 80, type: "boolean" },
  ];
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      <NoteModal
        itemId={vendor.id}
        model="vendor"
        open={noteModal}
        onClose={() => setNoteModal(false)}
        noteData={selectedNote}
      />
      <DocumentModal
        itemId={vendor.id}
        model="vendor"
        open={documentModal}
        onClose={() => setDocumentModal(false)}
        docData={selectedDocument}
      />

      <ContactModal
        itemId={String(vendor.id)}
        model="vendor"
        open={contactModal}
        onClose={() => setContactModal(false)}
        data={selectedContact}
      />

      <Box
        display="grid"
        gridGap={10}
        gridTemplateColumns={phone ? "1fr" : "2fr 3fr"}
        height={phone ? "" : "calc(100vh - 160px)"}
      >
        <UpdateVendorForm initialValues={vendor} />
        <BasePaper>
          <Tabs
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            textColor="primary"
            variant="scrollable"
            scrollButtons={phone ? "on" : "auto"}
            style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "1em" } : { marginBottom: "1em" }}
          >
            <Tab label="Items" />
            <Tab label="Documents" />
            <Tab label="Contacts" />
            <Tab label="PO History" />
            <Tab label="Notes" />
            <Tab label="Auditing" />
          </Tabs>
          {activeTab === 0 && (
            <BaseDataGrid
              cols={itemCols}
              rows={(items && items.map((r: any, i: number) => ({ ...r, id: i }))) || []}
              onRowSelected={() => {}}
              height="calc(100% - 60px)"
            />
          )}
          {activeTab === 1 && (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedDocument(undefined);
                  setDocumentModal(true);
                }}
                style={{ marginBottom: "10px" }}
              >
                + Add Document
              </Button>
              <BaseDataGrid
                cols={docCols}
                rows={documents || []}
                onRowSelected={(r) => {
                  setSelectedDocument(r);
                  setDocumentModal(true);
                }}
                height="calc(100% - 100px)"
              />
            </>
          )}
          {activeTab === 2 && (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedContact(undefined);
                  setContactModal(true);
                }}
                style={{ marginBottom: "10px" }}
              >
                + Add Contact
              </Button>
              <BaseDataGrid
                cols={contactsCols}
                rows={contacts || []}
                onRowSelected={(r) => {
                  setSelectedContact(r);
                  setContactModal(true);
                }}
                height="calc(100% - 100px)"
              />
            </>
          )}

          {activeTab === 3 && (
            <BaseDataGrid cols={POCols} rows={POs?.result || []} onRowSelected={() => {}} height="calc(100% - 60px)" />
          )}
          {activeTab === 4 && (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedNote(undefined);
                  setNoteModal(true);
                }}
                style={{ marginBottom: "10px" }}
              >
                + Add Note
              </Button>
              <BaseDataGrid
                cols={noteCols}
                rows={notes || []}
                onRowSelected={(r) => {
                  setSelectedNote(r);
                  setNoteModal(true);
                }}
                height="calc(100% - 100px)"
              />
            </>
          )}
        </BasePaper>
      </Box>
    </>
  );
}
