import React, { useMemo, useState } from "react";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Box, Tab, Tabs } from "@material-ui/core";
import useSWR from "swr";

import Button from "../../app/Button";
import { BasePaper } from "../../app/Paper";
import BaseDataGrid from "../../app/BaseDataGrid";

import { UpdateVendorForm } from "./Forms";
import { formatTimestampToDate } from "../../logic/date";

import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import VendingModal from "./Vending/Modal";
import { AddressModal } from "../Modals/AddressModal";
import { EmailModal } from "../Modals/EmailModal";
import { PhoneModal } from "../Modals/PhoneModal";
import { ContactModal } from "../Modals/ContactModal";

import { IAddress } from "../../api/address";
import { IEmailAddress } from "../../api/emailAddress";
import { IPhone } from "../../api/phone";
import { IContact } from "../../api/contact";
import { INote } from "../../api/note";
import { IDocument } from "../../api/document";
import { IVending } from "../../api/vending";
import { IVendor } from "../../api/vendor";

export default function VendorDetails({ vendor }: { vendor: IVendor }) {
    const [activeTab, setActiveTab] = useState(0);

    const { data: vendings } = useSWR(activeTab === 0 ? `/vending?VendorId=${vendor.id}` : null);
    const { data: items } = useSWR(activeTab === 1 ? `/vendor/${vendor.id}/items` : null);
    const { data: notes } = useSWR(activeTab === 2 ? `/note/vendor/${vendor.id}` : null);
    const { data: documents } = useSWR(activeTab === 3 ? `/document/vendor/${vendor.id}` : null);
    const { data: addresses } = useSWR(activeTab === 4 ? `/address/vendor/${vendor.id}` : null);
    const { data: emails } = useSWR(activeTab === 5 ? `/email/vendor/${vendor.id}` : null);
    const { data: phones } = useSWR(activeTab === 6 ? `/phone/vendor/${vendor.id}` : null);
    const { data: contacts } = useSWR(activeTab === 7 ? `/contact/vendor/${vendor.id}` : null);

    const [noteModal, setNoteModal] = useState(false);
    const [documentModal, setDocumentModal] = useState(false);
    const [addressModal, setAddressModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [phoneModal, setPhoneModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [vendingModal, setVendingModal] = useState(false);

    const [selectedNote, setSelectedNote] = useState<INote>();
    const [selectedDocument, setSelectedDocument] = useState<IDocument>();
    const [selectedAddress, setSelectedAddress] = useState<IAddress>();
    const [selectedEmail, setSelectedEmail] = useState<IEmailAddress>();
    const [selectedPhone, setSelectedPhone] = useState<IPhone>();
    const [selectedContact, setSelectedContact] = useState<IContact>();
    const [selectedVending, setSelectedVending] = useState<IVending>();

    const cols: GridColDef[] = [
        { field: "ItemId", valueFormatter: (data) => data.row?.ItemId.name },
        { field: "leadTime" },
        { field: "lastCheckedPrice" },
        { field: "comment" },
    ];

    const itemCols: GridColDef[] = [
        { field: "no" },
        { field: "name" },
        { field: "cost" },
        { field: "retailPrice" },
        { field: "availableQoh" },
        { field: "allocatedQoh" },
    ];
    const noteCols = useMemo<GridColumns>(
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
                width: 180,
                valueFormatter: (params) => params.row?.EmployeeId?.username,
            },
            { field: "subject", headerName: "Subject", width: 300 },
            { field: "note", headerName: "Note", flex: 1 },
        ],
        []
    );

    const docCols: GridColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "EmployeeId", headerName: "Employee" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Date", width: 300 },
    ];

    const addrCols: GridColDef[] = [
        { field: "address" },
        { field: "city" },
        { field: "state" },
        { field: "zip" },
        { field: "main" },
    ];

    const phoneCols: GridColDef[] = [{ field: "ext" }, { field: "phone" }, { field: "main" }, { field: "PhoneTypeId" }];

    const emailCols: GridColDef[] = [{ field: "email" }, { field: "main" }];

    const contactsCols: GridColDef[] = [
        { field: "firstName" },
        { field: "lastName" },
        { field: "title" },
        { field: "department" },
        { field: "instagram" },
        { field: "website" },
        { field: "active" },
        { field: "main" },
    ];

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
            <AddressModal
                itemId={String(vendor.id)}
                model="vendor"
                open={addressModal}
                onClose={() => setAddressModal(false)}
                data={selectedAddress}
            />
            <EmailModal
                itemId={String(vendor.id)}
                model="vendor"
                open={emailModal}
                onClose={() => setEmailModal(false)}
                data={selectedEmail}
            />
            <PhoneModal
                itemId={String(vendor.id)}
                model="vendor"
                open={phoneModal}
                onClose={() => setPhoneModal(false)}
                data={selectedPhone}
            />
            <ContactModal
                itemId={String(vendor.id)}
                model="vendor"
                open={contactModal}
                onClose={() => setContactModal(false)}
                data={selectedContact}
            />
            <VendingModal
                open={vendingModal}
                onClose={() => setVendingModal(false)}
                initialValues={selectedVending}
                vendor={vendor}
            />

            <Box p={2}>
                <BasePaper>
                    <UpdateVendorForm initialValues={vendor} />
                </BasePaper>
                <BasePaper style={{ marginTop: "1em" }}>
                    <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} style={{ margin: "0.5em 0" }}>
                        <Tab label="Vendings" />
                        <Tab label="Items" />
                        <Tab label="Notes" />
                        <Tab label="Documents" />
                        <Tab label="Addresses" />
                        <Tab label="Emails" />
                        <Tab label="Phones" />
                        <Tab label="Contacts" />
                    </Tabs>
                    {activeTab === 0 && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSelectedVending(undefined);
                                    setVendingModal(true);
                                }}
                            >
                                Add
                            </Button>
                            <BaseDataGrid
                                cols={cols}
                                rows={vendings || []}
                                onRowSelected={(r) => {
                                    setSelectedVending(r);
                                    setVendingModal(true);
                                }}
                            />
                        </>
                    )}
                    {activeTab === 1 && <BaseDataGrid cols={itemCols} rows={items || []} onRowSelected={() => {}} />}
                    {activeTab === 2 && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSelectedNote(undefined);
                                    setNoteModal(true);
                                }}
                            >
                                Add
                            </Button>
                            <BaseDataGrid
                                cols={noteCols}
                                rows={notes || []}
                                onRowSelected={(r) => {
                                    setSelectedNote(r);
                                    setNoteModal(true);
                                }}
                            />
                        </>
                    )}
                    {activeTab === 3 && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSelectedDocument(undefined);
                                    setDocumentModal(true);
                                }}
                            >
                                Add
                            </Button>
                            <BaseDataGrid
                                cols={docCols}
                                rows={documents || []}
                                onRowSelected={(r) => {
                                    setSelectedDocument(r);
                                    setDocumentModal(true);
                                }}
                            />
                        </>
                    )}
                    {activeTab === 4 && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSelectedAddress(undefined);
                                    setAddressModal(true);
                                }}
                            >
                                Add
                            </Button>
                            <BaseDataGrid
                                cols={addrCols}
                                rows={addresses || []}
                                onRowSelected={(r) => {
                                    setSelectedAddress(r);
                                    setAddressModal(true);
                                }}
                            />
                        </>
                    )}
                    {activeTab === 5 && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSelectedEmail(undefined);
                                    setEmailModal(true);
                                }}
                            >
                                Add
                            </Button>
                            <BaseDataGrid
                                cols={emailCols}
                                rows={emails || []}
                                onRowSelected={(r) => {
                                    setSelectedEmail(r);
                                    setEmailModal(true);
                                }}
                            />
                        </>
                    )}
                    {activeTab === 6 && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSelectedPhone(undefined);
                                    setPhoneModal(true);
                                }}
                            >
                                Add
                            </Button>
                            <BaseDataGrid
                                cols={phoneCols}
                                rows={phones || []}
                                onRowSelected={(r) => {
                                    setSelectedPhone(r);
                                    setPhoneModal(true);
                                }}
                            />
                        </>
                    )}
                    {activeTab === 7 && (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSelectedContact(undefined);
                                    setContactModal(true);
                                }}
                            >
                                Add
                            </Button>
                            <BaseDataGrid
                                cols={contactsCols}
                                rows={contacts}
                                onRowSelected={(r) => {
                                    setSelectedContact(r);
                                    setContactModal(true);
                                }}
                            />
                        </>
                    )}
                </BasePaper>
            </Box>
        </>
    );
}
