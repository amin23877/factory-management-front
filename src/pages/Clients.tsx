import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Button } from "@material-ui/core";
import { AddRounded, DeleteRounded, DescriptionRounded, PrintRounded } from "@material-ui/icons";

import { getClients, deleteClient } from "../api/client";

import { AddClientModal } from "../features/Modals/ClientModals";
import { ClientTypeModal } from "../features/Modals/ClientType";
import Confirm from "../features/Modals/Confirm";

import { MyTab, MyTabs } from "../app/Tabs";

import { NoteModal } from "../features/Modals/NoteModals";
import { DocumentModal, EditDocumentModal } from "../features/Modals/DocumentModals";

import ClientDetails from "../features/ClientDetails";
import ClientOverview from "../features/ClientOverview";

export default function Clients() {
    const [activeTab, setActiveTab] = useState(0);
    const [addClientModal, setAddClientModal] = useState(false);
    const [cTypeModal, setCTypeModal] = useState(false);
    const [clients, setClients] = useState([]);

    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [selectedNote, setSelectedNote] = useState<any>(null);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    const [editNoteModal, setEditNoteModal] = useState(false);
    const [editDocModal, setEditDocModal] = useState(false);
    const [addNoteModal, setAddNoteModal] = useState(false);
    const [addDocModal, setAddDocModal] = useState(false);

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
        refreshClients();
    }, []);

    return (
        <Container style={{ padding: "1em 0" }}>
            <Confirm open={conf} onClose={() => setConf(false)} onConfirm={handleDelete} />

            <AddClientModal open={addClientModal} onClose={() => setAddClientModal(false)} onDone={refreshClients} />

            <ClientTypeModal open={cTypeModal} onClose={() => setCTypeModal(false)} />

            <NoteModal
                noteData={selectedNote === null ? "" : selectedNote.data}
                itemId={selectedRow?.id}
                model="client"
                open={editNoteModal}
                onClose={() => setEditNoteModal(false)}
            />
            <EditDocumentModal
                docData={selectedDoc === null ? "" : selectedDoc.data}
                open={editDocModal}
                itemId={selectedRow?.id}
                model="client"
                onClose={() => setEditDocModal(false)}
            />

            <NoteModal itemId={selectedRow?.id} model="client" open={addNoteModal} onClose={() => setAddNoteModal(false)} />
            <DocumentModal open={addDocModal} onClose={() => setAddDocModal(false)} itemId={selectedRow?.id} model="client" />

            <Grid container spacing={3}>
                <Grid item xs={1}>
                    <Box px={1} display="flex" flexDirection="column" my={2}>
                        <Button onClick={() => setAddClientModal(true)} title="Add item" variant="outlined">
                            <AddRounded />
                        </Button>
                        <Button
                            disabled={!selectedRow}
                            onClick={() => setConf(true)}
                            title="Delete item"
                            variant="outlined"
                            style={{ margin: "1em 0" }}
                        >
                            <DeleteRounded />
                        </Button>
                        <Button title="Payment" variant="outlined">
                            <DescriptionRounded />
                        </Button>
                        <Button title="Print a report" variant="outlined" style={{ margin: "1em 0" }}>
                            <PrintRounded />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box my={2} display="flex">
                        <Box display="flex" flex={1} justifyContent="space-around">
                            <Button onClick={() => setCTypeModal(true)}>Client Types</Button>
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
                                setSelectedRow(v);
                            }}
                        />
                    )}
                    {activeTab === 1 && (
                        <ClientDetails onNoteSelected={setSelectedNote} onDocSelected={setSelectedDoc} selectedRow={selectedRow} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}
