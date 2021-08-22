import React, { useCallback, useEffect, useState } from "react";
import { GridColDef } from "@material-ui/data-grid";
import { Box, Button, IconButton, ListItem, Tab, Tabs } from "@material-ui/core";
import {
    AddRounded,
    DeleteRounded,
    PrintRounded,
    PhoneOutlined,
    MailOutline,
    ContactsOutlined,
    MapOutlined,
} from "@material-ui/icons";

import BaseDataGrid from "../app/BaseDataGrid";
import List from "../app/SideUtilityList";
import { MyTab, MyTabs } from "../app/Tabs";
import Details from "../features/Vendor";
import Snack from "../app/Snack";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import VendorModal from "../features/Vendor/AddVendor";
import VendingModal from "../features/Vending/Modal";
import { AddressModal } from "../features/Modals/AddressModal";
import { EmailModal } from "../features/Modals/EmailModal";
import { PhoneModal } from "../features/Modals/PhoneModal";
import { ContactModal } from "../features/Modals/ContactModal";

import Confirm from "../features/Modals/Confirm";
import { deleteVendor, getVendors, getVendorVendings, IVendor } from "../api/vendor";
import { IVending } from "../api/vending";
import { getAllModelNotes } from "../api/note";
import { getAllModelDocuments } from "../api/document";
import { getAllModelPhone } from "../api/phone";
import { getAllModelEmailAddrs } from "../api/emailAddress";
import { getAllModelContact } from "../api/contact";
import { getAllModelAddress } from "../api/address";

export default function Vendros() {
    const [activeTab, setActiveTab] = useState(0);
    const [vendors, setVendors] = useState([]);
    const [vendings, setVendings] = useState([]);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [addreses, setAddresses] = useState([]);
    const [emails, setEmails] = useState([]);
    const [phones, setPhones] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [selectedVendor, setSelectedVendor] = useState<IVendor>();
    const [selectedVending, setSelectedVending] = useState<IVending>();
    const [selNote, setSelNote] = useState<any>();
    const [selDoc, setSelDoc] = useState<any>();
    const [selAddress, setSelAddress] = useState<any>();
    const [selEmail, setSelEmail] = useState<any>();
    const [selPhone, setSelPhone] = useState<any>();
    const [selContact, setSelContact] = useState<any>();

    const [noteModal, setNoteModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [addressModal, setAddressModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [phoneModal, setPhoneModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);

    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");
    const [addVendor, setAddVendor] = useState(false);
    const [vendingModal, setVendingModal] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const refreshVendors = async () => {
        try {
            const resp = await getVendors();
            resp && setVendors(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshVendings = useCallback(async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                const resp = await getVendorVendings(selectedVendor.id);
                resp && setVendings(resp);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedVendor]);

    const refreshNotes = useCallback(async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                const resp = await getAllModelNotes("vendor", selectedVendor.id);
                resp && setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedVendor]);

    const refreshDocs = useCallback(async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                const resp = await getAllModelDocuments("vendor", selectedVendor.id);
                resp && setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedVendor]);

    const refreshPhones = useCallback(async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                const resp = await getAllModelPhone("vendor", String(selectedVendor.id));
                setPhones(resp);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedVendor]);

    const refreshEmails = useCallback(async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                const resp = await getAllModelEmailAddrs("vendor", String(selectedVendor.id));
                setEmails(resp);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedVendor]);

    const refreshContacts = useCallback(async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                const resp = await getAllModelContact("vendor", String(selectedVendor.id));
                setContacts(resp);
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedVendor]);

    const refreshAddresses = useCallback(async () => {
        if (selectedVendor && selectedVendor.id) {
            const resp = await getAllModelAddress("vendor", String(selectedVendor.id));
            setAddresses(resp);
        }
    }, [selectedVendor]);

    const handleDelete = async () => {
        try {
            if (selectedVendor && selectedVendor.id) {
                const resp = await deleteVendor(selectedVendor.id);
                if (resp) {
                    refreshVendors();
                    setConfirm(false);
                    setActiveTab(1);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshVendors();
    }, []);

    useEffect(() => {
        if (selectedVendor) {
            refreshVendings();
            refreshNotes();
            refreshDocs();
            refreshAddresses();
            refreshEmails();
            refreshPhones();
            refreshContacts();
        }
    }, [
        selectedVendor,
        refreshVendings,
        refreshNotes,
        refreshDocs,
        refreshAddresses,
        refreshEmails,
        refreshPhones,
        refreshContacts,
    ]);

    const cols: GridColDef[] = [{ field: "name", headerName: "Name" }];

    return (
        <Box>
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>
            {selectedVendor && selectedVendor.id && (
                <NoteModal
                    itemId={selectedVendor.id}
                    model="vendor"
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    noteData={selNote}
                    onDone={refreshNotes}
                />
            )}
            {selectedVendor && selectedVendor.id && (
                <DocumentModal
                    itemId={selectedVendor.id}
                    model="vendor"
                    open={docModal}
                    onClose={() => setDocModal(false)}
                    docData={selDoc}
                    onDone={refreshDocs}
                />
            )}
            {selectedVendor && selectedVendor.id && (
                <AddressModal
                    itemId={String(selectedVendor.id)}
                    model="vendor"
                    open={addressModal}
                    onClose={() => setAddressModal(false)}
                    data={selAddress}
                    onDone={refreshAddresses}
                />
            )}
            {selectedVendor && selectedVendor.id && (
                <EmailModal
                    itemId={String(selectedVendor.id)}
                    model="vendor"
                    open={emailModal}
                    onClose={() => setEmailModal(false)}
                    data={selEmail}
                    onDone={refreshEmails}
                />
            )}
            {selectedVendor && selectedVendor.id && (
                <PhoneModal
                    itemId={String(selectedVendor.id)}
                    model="vendor"
                    open={phoneModal}
                    onClose={() => setPhoneModal(false)}
                    data={selPhone}
                    onDone={refreshPhones}
                />
            )}
            {selectedVendor && selectedVendor.id && (
                <ContactModal
                    itemId={String(selectedVendor.id)}
                    model="vendor"
                    open={contactModal}
                    onClose={() => setContactModal(false)}
                    data={selContact}
                    onDone={refreshContacts}
                />
            )}
            <VendorModal open={addVendor} onClose={() => setAddVendor(false)} onDone={refreshVendors} />
            {selectedVendor && (
                <VendingModal
                    open={vendingModal}
                    onClose={() => setVendingModal(false)}
                    initialValues={selectedVending}
                    vendor={selectedVendor}
                    onDone={() => refreshVendings()}
                />
            )}
            <Confirm
                text={`Are you sure? You are going to delete vendor ${selectedVendor?.name}`}
                open={confirm}
                onClose={() => setConfirm(false)}
                onConfirm={handleDelete}
            />

            <Box display="flex">
                <Button
                    disabled={!selectedVendor}
                    onClick={() => {
                        setVendingModal(true);
                        setSelectedVending(undefined);
                    }}
                >
                    Add vending
                </Button>
                <Button
                    disabled={!selectedVendor}
                    onClick={() => {
                        setNoteModal(true);
                        setSelNote(undefined);
                    }}
                >
                    Add note
                </Button>
                <Button
                    disabled={!selectedVendor}
                    onClick={() => {
                        setDocModal(true);
                        setSelDoc(undefined);
                    }}
                >
                    Add document
                </Button>
                <div style={{ flexGrow: 1 }} />
            </Box>

            <Box display="flex">
                <Box flex={1} m={1}>
                    <List>
                        <ListItem>
                            <IconButton onClick={() => setAddVendor(true)}>
                                <AddRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setConfirm(true)}>
                                <DeleteRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setAddressModal(true)}>
                                <MapOutlined />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setPhoneModal(true)}>
                                <PhoneOutlined />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setContactModal(true)}>
                                <ContactsOutlined />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedVendor} onClick={() => setEmailModal(true)}>
                                <MailOutline />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton>
                                <PrintRounded />
                            </IconButton>
                        </ListItem>
                    </List>
                </Box>
                <Box flex={11} mt={1}>
                    <Box my={1}>
                        <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                            <Tab label="List" />
                            <Tab label="Details" disabled={!selectedVendor} />
                        </Tabs>
                        <div style={{ flexGrow: 1 }} />
                    </Box>
                    {activeTab === 0 && (
                        <BaseDataGrid
                            rows={vendors}
                            cols={cols}
                            onRowSelected={(d) => {
                                setSelectedVendor(d);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && selectedVendor && (
                        <Details
                            vendings={vendings}
                            vendor={selectedVendor}
                            notes={notes}
                            docs={docs}
                            addresses={addreses}
                            contacts={contacts}
                            emails={emails}
                            phones={phones}
                            onAddressSelected={(d) => {
                                setSelAddress(d);
                                setAddressModal(true);
                            }}
                            onContactSelected={(d) => {
                                setSelContact(d);
                                setContactModal(true);
                            }}
                            onEmailSelected={(d) => {
                                setSelEmail(d);
                                setEmailModal(true);
                            }}
                            onPhoneSelected={(d) => {
                                setSelPhone(d);
                                setPhoneModal(true);
                            }}
                            onNoteSelected={(d) => {
                                setSelNote(d);
                                setNoteModal(true);
                            }}
                            onDocSelected={(d) => {
                                setSelDoc(d);
                                setDocModal(true);
                            }}
                            onVendingSelected={(d) => {
                                setSelectedVending(d);
                                setVendingModal(true);
                            }}
                            onDone={() => {
                                refreshVendors();
                                setMsg("Record updated");
                                setSnack(true);
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}
