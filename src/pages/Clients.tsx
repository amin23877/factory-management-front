import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Button } from "@material-ui/core";
import {
    AddRounded,
    DeleteRounded,
    DescriptionRounded,
    PrintRounded,
    MapOutlined,
    EqualizerOutlined,
    MailOutline,
    ContactMailOutlined,
    PhoneOutlined,
} from "@material-ui/icons";

import { getClients, deleteClient } from "../api/client";
import { getAllModelNotes } from "../api/note";
import { getAllModelDocuments } from "../api/document";
import { getAllModelAddress } from "../api/address";
import { getAllAgencies } from "../api/agency";
import { getClientDivisons } from "../api/division";
import { getAllModelPhone } from "../api/phone";
import { getAllModelEmailAddrs } from "../api/emailAddress";
import { getAllModelContact } from "../api/contact";

import { AddClientModal } from "../features/Modals/ClientModals";
import { AllClientTypesModal } from "../features/Modals/ClientType";
import Confirm from "../features/Modals/Confirm";

import { MyTab, MyTabs } from "../app/Tabs";

import { NoteModal } from "../features/Modals/NoteModals";
import { DocumentModal, EditDocumentModal } from "../features/Modals/DocumentModals";
import { AddressModal } from "../features/Modals/AddressModal";
import { AgencyModal } from "../features/Modals/AgencyModal";
import { DivisionModal } from "../features/Modals/DivisionModal";
import { PhoneModal } from "../features/Modals/PhoneModal";
import { EmailModal } from "../features/Modals/EmailModal";
import { ContactModal } from "../features/Modals/ContactModal";

import ClientDetails from "../features/ClientDetails";
import ClientOverview from "../features/ClientOverview";

export default function Clients() {
    const [activeTab, setActiveTab] = useState(0);
    const [addClientModal, setAddClientModal] = useState(false);
    const [cTypeModal, setCTypeModal] = useState(false);
    const [clients, setClients] = useState([]);

    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [addrs, setAddrs] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [phones, setPhones] = useState([]);
    const [emails, setEmails] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [selectedNote, setSelectedNote] = useState<any>(null);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [selectedAddr, setSelectedAddr] = useState<any>(null);
    const [selectedAgency, setSelectedAgency] = useState<any>(null);

    const [editNoteModal, setEditNoteModal] = useState(false);
    const [editDocModal, setEditDocModal] = useState(false);

    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);
    const [addAddress, setAddAddress] = useState(false);
    const [addAgency, setAddAgency] = useState(false);
    const [addDivision, setAddDivision] = useState(false);
    const [addPhone, setAddPhone] = useState(false);
    const [addEmail, setAddEmail] = useState(false);
    const [addContact, setAddContact] = useState(false);

    const [conf, setConf] = useState(false);

    const refreshClients = async () => {
        try {
            const resp = await getClients();
            setClients(resp);
            // console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshNotes = async () => {
        if (selectedRow.id) {
            const resp = await getAllModelNotes("client", selectedRow.id);
            setNotes(resp);
        }
    };
    const refreshDocs = async () => {
        if (selectedRow.id) {
            const resp = await getAllModelDocuments("client", selectedRow.id);
            setDocs(resp);
        }
    };

    const refreshAddresses = async () => {
        if (selectedRow.id) {
            const resp = await getAllModelAddress("client", selectedRow.id);
            setAddrs(resp);
        }
    };

    const refreshAgencies = async () => {
        if (selectedRow.id) {
            const resp = await getAllAgencies();
            if (resp) {
                setAgencies(resp.filter((a: any) => a.ClientId === selectedRow.id));
            }
        }
    };

    const refreshDivisions = async () => {
        try {
            if (selectedRow.id) {
                const resp = await getClientDivisons(selectedRow.id);
                if (resp) {
                    setDivisions(resp);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshPhones = async () => {
        try {
            const resp = await getAllModelPhone("client", selectedRow.id);
            setPhones(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshEmails = async () => {
        try {
            const resp = await getAllModelEmailAddrs("client", selectedRow.id);
            setEmails(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshContacts = async () => {
        try {
            const resp = await getAllModelContact("client", selectedRow.id);
            setContacts(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const resp = await deleteClient(selectedRow.id);
            console.log(resp);
            if (resp) {
                refreshClients();
                setConf(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activeTab === 1) {
            refreshNotes();
            refreshDocs();
            refreshAddresses();
            refreshAgencies();
            refreshDivisions();
            refreshPhones();
            refreshEmails();
            refreshContacts();
        }
    }, [activeTab]);

    useEffect(() => {
        refreshClients();
    }, []);

    return (
        <Container style={{ padding: "1em 0" }}>
            <Confirm open={conf} onClose={() => setConf(false)} onConfirm={handleDelete} />

            <AddClientModal open={addClientModal} onClose={() => setAddClientModal(false)} onDone={refreshClients} />

            <AllClientTypesModal open={cTypeModal} onClose={() => setCTypeModal(false)} />

            <AddressModal
                data={selectedAddr === null ? "" : selectedAddr}
                itemId={selectedRow?.id}
                model="client"
                open={addAddress}
                onClose={() => setAddAddress(false)}
                onDone={refreshAddresses}
            />
            <AgencyModal
                data={selectedAgency === null ? "" : selectedAgency}
                itemId={selectedRow?.id}
                model="client"
                open={addAgency}
                onClose={() => setAddAgency(false)}
                onDone={refreshAgencies}
            />
            <DivisionModal
                data={selectedAgency === null ? "" : selectedAgency}
                itemId={selectedRow?.id}
                model="client"
                open={addDivision}
                onClose={() => setAddDivision(false)}
                onDone={refreshDivisions}
            />
            <PhoneModal
                data={selectedAgency === null ? "" : selectedAgency}
                itemId={selectedRow?.id}
                model="client"
                open={addPhone}
                onClose={() => setAddPhone(false)}
                onDone={refreshPhones}
            />
            <EmailModal
                data={selectedAgency === null ? "" : selectedAgency}
                itemId={selectedRow?.id}
                model="client"
                open={addEmail}
                onClose={() => setAddEmail(false)}
                onDone={refreshEmails}
            />
            <ContactModal
                data={selectedAgency === null ? "" : selectedAgency}
                itemId={selectedRow?.id}
                model="client"
                open={addContact}
                onClose={() => setAddContact(false)}
                onDone={refreshContacts}
            />

            <NoteModal
                noteData={selectedNote === null ? "" : selectedNote}
                itemId={selectedRow?.id}
                model="client"
                open={editNoteModal}
                onClose={() => setEditNoteModal(false)}
                onDone={refreshNotes}
            />
            <EditDocumentModal
                docData={selectedDoc === null ? "" : selectedDoc}
                open={editDocModal}
                itemId={selectedRow?.id}
                model="client"
                onClose={() => setEditDocModal(false)}
                onDone={refreshDocs}
            />

            <NoteModal
                itemId={selectedRow?.id}
                model="client"
                open={addNoteModal}
                onClose={() => setAddNoteModal(false)}
                onDone={refreshNotes}
            />
            <DocumentModal
                open={addDocModal}
                onClose={() => setAddDocModal(false)}
                itemId={selectedRow?.id}
                model="client"
                onDone={refreshDocs}
            />

            <Grid container spacing={3}>
                <Grid item xs={1}>
                    <Box px={1} display="flex" flexDirection="column" my={2}>
                        <Button onClick={() => setAddClientModal(true)} title="Add item" variant="outlined" style={{ margin: "0.5em 0" }}>
                            <AddRounded />
                        </Button>
                        <Button
                            disabled={!selectedRow}
                            onClick={() => setConf(true)}
                            title="Delete item"
                            variant="outlined"
                            style={{ margin: "0.5em 0" }}
                        >
                            <DeleteRounded />
                        </Button>
                        <Button title="Payment" variant="outlined" style={{ margin: "0.5em 0" }}>
                            <DescriptionRounded />
                        </Button>
                        <Button title="Print a report" variant="outlined" style={{ margin: "0.5em 0" }}>
                            <PrintRounded />
                        </Button>
                        <Button onClick={() => setAddAddress(true)} title="Address" variant="outlined" style={{ margin: "0.5em 0" }}>
                            <MapOutlined />
                        </Button>
                        <Button onClick={() => setAddAgency(true)} title="Agency" variant="outlined" style={{ margin: "0.5em 0" }}>
                            <EqualizerOutlined />
                        </Button>
                        <Button onClick={() => setAddDivision(true)} title="Division" variant="outlined" style={{ margin: "0.5em 0" }}>
                            %
                        </Button>
                        <Button onClick={() => setAddPhone(true)} title="Phone" variant="outlined" style={{ margin: "0.5em 0" }}>
                            <PhoneOutlined />
                        </Button>
                        <Button onClick={() => setAddEmail(true)} title="Email Address" variant="outlined" style={{ margin: "0.5em 0" }}>
                            <MailOutline />
                        </Button>
                        <Button onClick={() => setAddContact(true)} title="Contact" variant="outlined" style={{ margin: "0.5em 0" }}>
                            <ContactMailOutlined />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box my={2} display="flex">
                        <Box display="flex" flex={1} justifyContent="space-around">
                            <Button onClick={() => setCTypeModal(true)}>All Types</Button>
                            <Button onClick={() => setAddNoteModal(true)} disabled={!selectedRow}>
                                + Add new Note
                            </Button>
                            <Button onClick={() => setEditNoteModal(true)} disabled={!selectedNote}>
                                Edit / Delete Note
                            </Button>
                            <Button onClick={() => setAddDocModal(true)} disabled={!selectedRow}>
                                + Add Document
                            </Button>
                            <Button onClick={() => setEditDocModal(true)} disabled={!selectedDoc}>
                                Edit / Delete Document
                            </Button>
                        </Box>

                        <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                            <MyTab label="Overview" />
                            <MyTab label="Details" disabled={Boolean(selectedRow === null)} />
                        </MyTabs>
                    </Box>
                    {activeTab === 0 && (
                        <ClientOverview
                            rows={clients}
                            onRowSelected={(v) => {
                                console.log(v);

                                setSelectedRow(v);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && (
                        <ClientDetails
                            notes={notes}
                            docs={docs}
                            addrs={addrs}
                            agencies={agencies}
                            divisions={divisions}
                            phones={phones}
                            emails={emails}
                            contacts={contacts}
                            onAgencySelected={setSelectedAgency}
                            onAddrSelected={setSelectedAddr}
                            onNoteSelected={setSelectedNote}
                            onDocSelected={setSelectedDoc}
                            selectedRow={selectedRow}
                        />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}
