import React, { useState, useEffect } from "react";
import { Container, Box, Grid, IconButton, ListItem, Tabs, Tab, Paper } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import {
    AddRounded,
    DeleteRounded,
    DescriptionRounded,
    ChevronLeftRounded,
    PrintRounded,
    MapOutlined,
    EqualizerOutlined,
    MailOutline,
    ContactMailOutlined,
    PhoneOutlined,
} from "@material-ui/icons";

import List from "../app/SideUtilityList";
import Button from "../app/Button";

import { getClients, deleteClient } from "../api/client";
import { getAllModelNotes } from "../api/note";
import { getAllModelDocuments } from "../api/document";
import { getAllModelAddress } from "../api/address";
import { getAllAgencies } from "../api/agency";
import { getClientActivities } from "../api/activity";
import { getClientDivisons } from "../api/division";
import { getAllModelPhone } from "../api/phone";
import { getAllModelEmailAddrs } from "../api/emailAddress";
import { getAllModelContact } from "../api/contact";
import { getClientTypes } from "../api/clientType";

import { AddClientModal } from "../features/Client/ClientModals";
import { AllClientTypesModal } from "../features/Modals/ClientType";
import Confirm from "../features/Modals/Confirm";

import { MyTab, MyTabs } from "../app/Tabs";

import NoteModal from "../features/Modals/NoteModals";
import DocumentModal from "../features/Modals/DocumentModals";
import { AddressModal } from "../features/Modals/AddressModal";
import { AgencyModal } from "../features/Modals/AgencyModal";
import { DivisionModal } from "../features/Modals/DivisionModal";
import { PhoneModal } from "../features/Modals/PhoneModal";
import { EmailModal } from "../features/Modals/EmailModal";
import { ContactModal } from "../features/Modals/ContactModal";

import ClientDetails from "../features/Client/ClientDetails";
import ClientOverview from "../features/Client/ClientOverview";
import { GridRowData } from "@material-ui/data-grid";
import { BasePaper } from "../app/Paper";

export default function Clients() {
    const [activeTab, setActiveTab] = useState(0);
    const [addClientModal, setAddClientModal] = useState(false);
    const [cTypeModal, setCTypeModal] = useState(false);
    const [clients, setClients] = useState<GridRowData[]>([]);

    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [addrs, setAddrs] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [phones, setPhones] = useState([]);
    const [emails, setEmails] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [clientTypes, setClientTypes] = useState([]);
    const [activities, setActivities] = useState([]);

    const [selectedRow, setSelectedRow] = useState<any>(null);

    const [selectedNote, setSelectedNote] = useState<any>(null);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [selectedAddr, setSelectedAddr] = useState<any>(null);
    const [selectedAgency, setSelectedAgency] = useState<any>(null);
    const [selectedDiv, setSelectedDiv] = useState<any>(null);
    const [selectedPhone, setSelectedPhone] = useState<any>(null);
    const [selectedEmail, setSelectedEmail] = useState<any>(null);
    const [selectedContact, setSelectedContact] = useState<any>(null);

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
            let resp = await getClients();
            setClients(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshClientTypes = async () => {
        try {
            const resp = await getClientTypes();
            setClientTypes(resp);
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

    const refreshActivities = async () => {
        try {
            const resp = await getClientActivities(selectedRow.id);
            console.log(resp);

            setActivities(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const resp = await deleteClient(selectedRow.id);
            if (resp) {
                refreshClients();
                setConf(false);
                setActiveTab(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activeTab === 1) {
            refreshNotes();
            refreshDocs();
            refreshActivities();
            refreshAddresses();
            refreshAgencies();
            refreshDivisions();
            refreshPhones();
            refreshEmails();
            refreshContacts();
            refreshClientTypes();
        }
    }, [activeTab]);

    useEffect(() => {
        refreshClients();
    }, []);

    return (
        <Container>
            <Confirm open={conf} onClose={() => setConf(false)} onConfirm={handleDelete} />

            <AddClientModal open={addClientModal} onClose={() => setAddClientModal(false)} onDone={refreshClients} />

            <AllClientTypesModal onCTDone={refreshClientTypes} open={cTypeModal} onClose={() => setCTypeModal(false)} />

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
                data={selectedDiv === null ? "" : selectedDiv}
                itemId={selectedRow?.id}
                model="client"
                open={addDivision}
                onClose={() => setAddDivision(false)}
                onDone={refreshDivisions}
            />
            <PhoneModal
                data={selectedPhone === null ? "" : selectedPhone}
                itemId={selectedRow?.id}
                model="client"
                open={addPhone}
                onClose={() => setAddPhone(false)}
                onDone={refreshPhones}
            />
            <EmailModal
                data={selectedEmail === null ? "" : selectedEmail}
                itemId={selectedRow?.id}
                model="client"
                open={addEmail}
                onClose={() => setAddEmail(false)}
                onDone={refreshEmails}
            />
            <ContactModal
                data={selectedContact === null ? "" : selectedContact}
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
            <DocumentModal
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

            <Box display="flex">
                <Box display="flex" flex={1} justifyContent="space-around">
                    {activeTab === 1 && (
                        <IconButton
                            onClick={() => {
                                setActiveTab(0);
                                setSelectedRow(false);
                            }}
                        >
                            <ChevronLeftRounded />
                        </IconButton>
                    )}
                    <Button onClick={() => setCTypeModal(true)}>All Types</Button>
                    <Button onClick={() => setAddNoteModal(true)} disabled={!selectedRow}>
                        + Add new Note
                    </Button>
                    <Button onClick={() => setAddDocModal(true)} disabled={!selectedRow}>
                        + Add Document
                    </Button>
                </Box>
            </Box>

            <Grid container style={{ marginRight: "1px" }}>
                <Grid item xs={1}>
                    <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
                        <ListItem>
                            <IconButton onClick={() => setAddClientModal(true)} title="Add item">
                                <AddRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={!selectedRow} onClick={() => setConf(true)} title="Delete item">
                                <DeleteRounded />
                            </IconButton>
                        </ListItem>
                        {activeTab === 0 && (
                            <ListItem>
                                <IconButton disabled={!selectedRow} onClick={() => setActiveTab(1)} title="Edit item">
                                    <EditRoundedIcon />
                                </IconButton>
                            </ListItem>
                        )}
                        <ListItem>
                            <IconButton title="Payment">
                                <DescriptionRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton title="Print a report">
                                <PrintRounded />
                            </IconButton>
                        </ListItem>
                        {activeTab === 1 && (
                            <>
                                <ListItem>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedAddr(undefined);
                                            setAddAddress(true);
                                        }}
                                        title="Address"
                                    >
                                        <MapOutlined />
                                    </IconButton>
                                </ListItem>
                                <ListItem>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedAgency(undefined);
                                            setAddAgency(true);
                                        }}
                                        title="Agency"
                                    >
                                        <EqualizerOutlined />
                                    </IconButton>
                                </ListItem>
                                <ListItem>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedDiv(undefined);
                                            setAddDivision(true);
                                        }}
                                        title="Division"
                                    >
                                        %
                                    </IconButton>
                                </ListItem>
                                <ListItem>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedPhone(undefined);
                                            setAddPhone(true);
                                        }}
                                        title="Phone"
                                    >
                                        <PhoneOutlined />
                                    </IconButton>
                                </ListItem>
                                <ListItem>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedEmail(undefined);
                                            setAddEmail(true);
                                        }}
                                        title="Email Address"
                                    >
                                        <MailOutline />
                                    </IconButton>
                                </ListItem>
                                <ListItem>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedContact(undefined);
                                            setAddContact(true);
                                        }}
                                        title="Contact"
                                    >
                                        <ContactMailOutlined />
                                    </IconButton>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Grid>
                <Grid item xs={11}>
                    <BasePaper>
                        <Box mb={2} display="flex">
                            <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                                <Tab label="List" />
                                <Tab label="Details" disabled={Boolean(selectedRow === null)} />
                            </Tabs>
                            <div style={{ flex: 1 }}></div>
                        </Box>
                        {activeTab === 0 && (
                            <ClientOverview
                                rows={clients}
                                onRowSelected={(v) => {
                                    setSelectedRow(v);
                                    setActiveTab(1);
                                }}
                            />
                        )}
                        {activeTab === 1 && (
                            <ClientDetails
                                clientTypes={clientTypes}
                                onDone={refreshClients}
                                activities={activities}
                                notes={notes}
                                docs={docs}
                                addrs={addrs}
                                agencies={agencies}
                                divisions={divisions}
                                phones={phones}
                                emails={emails}
                                contacts={contacts}
                                onAgencySelected={(d) => {
                                    setSelectedAgency(d);
                                    setAddAgency(true);
                                }}
                                onAddrSelected={(d) => {
                                    setSelectedAddr(d);
                                    setAddAddress(true);
                                }}
                                onNoteSelected={(d) => {
                                    setSelectedNote(d);
                                    setEditNoteModal(true);
                                }}
                                onDocSelected={(d) => {
                                    setSelectedDoc(d);
                                    setEditDocModal(true);
                                }}
                                onDivSelected={(d) => {
                                    setSelectedDiv(d);
                                    setAddDivision(true);
                                }}
                                onPhoneSelected={(d) => {
                                    setSelectedPhone(d);
                                    setAddPhone(true);
                                }}
                                onEmailSelected={(d) => {
                                    setSelectedEmail(d);
                                    setAddEmail(true);
                                }}
                                onContactSelected={(d) => {
                                    setSelectedContact(d);
                                    setAddContact(true);
                                }}
                                selectedRow={selectedRow}
                            />
                        )}
                    </BasePaper>
                </Grid>
            </Grid>
        </Container>
    );
}
