import React, { useState } from "react";
import { Box, Tabs, Tab, ListItem, IconButton } from "@material-ui/core";
import { AddRounded, NoteAddRounded, FileCopyRounded, ShoppingCartRounded, PostAddRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Table from "./Table";
import Details from "./Details";

import List from "../../app/SideUtilityList";
import TicketModal from "../../features/Tickets/Modals";

import { ITicket } from "../../api/ticket";
import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import { INote } from "../../api/note";
import { IDocument } from "../../api/document";
import AddSOModal from "../Sales/SO/AddSoModal";
import AddQuote from "../Sales/Quote/AddQuote";

export default function Tickets() {
    const [ticketModal, setTicketModal] = useState(false);
    const [noteModal, setNoteModal] = useState(false);
    const [documentModal, setDocumentModal] = useState(false);
    const [soModal, setSoModal] = useState(false);
    const [quoteModal, setQuoteModal] = useState(false);

    const [selectedJob, setSelectedJob] = useState<ITicket>();
    const [selectedNote, setSelectedNote] = useState<INote>();
    const [selectedDocument, setSelectedDocument] = useState<IDocument>();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            {selectedJob && (
                <NoteModal
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    model="ticket"
                    itemId={selectedJob.id}
                    noteData={selectedNote}
                    onDone={() => mutate(`/note/ticket/${selectedJob.id}`)}
                />
            )}
            {selectedJob && (
                <DocumentModal
                    open={documentModal}
                    onClose={() => setDocumentModal(false)}
                    model="ticket"
                    itemId={selectedJob.id}
                    docData={selectedDocument}
                    onDone={() => mutate(`/document/ticket/${selectedJob.id}`)}
                />
            )}
            {selectedJob && (
                <AddSOModal
                    open={soModal}
                    onClose={() => setSoModal(false)}
                    initialData={{ JobId: selectedJob.id } as any}
                    onDone={() => {}}
                />
            )}
            {selectedJob && (
                <AddQuote
                    open={quoteModal}
                    onClose={() => setQuoteModal(false)}
                    initialData={{ JobId: selectedJob.id } as any}
                    onDone={() => {}}
                />
            )}
            <TicketModal open={ticketModal} onClose={() => setTicketModal(false)} />

            <Box display="flex">
                <div style={{ flexGrow: 1 }} />
                <Tabs textColor="primary" value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedJob} />
                </Tabs>
            </Box>

            <Box display="flex">
                <Box>
                    <List>
                        <ListItem>
                            <IconButton onClick={() => setTicketModal(true)}>
                                <AddRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton
                                title="Add note"
                                onClick={() => {
                                    setSelectedNote(undefined);
                                    setNoteModal(true);
                                }}
                            >
                                <NoteAddRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton
                                title="Add document"
                                onClick={() => {
                                    setSelectedDocument(undefined);
                                    setDocumentModal(true);
                                }}
                            >
                                <FileCopyRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton disabled={activeTab !== 1} title="Add new SO" onClick={() => setSoModal(true)}>
                                <ShoppingCartRounded />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton
                                disabled={activeTab !== 1}
                                title="Add new Quote"
                                onClick={() => setQuoteModal(true)}
                            >
                                <PostAddRounded />
                            </IconButton>
                        </ListItem>
                    </List>
                </Box>
                <Box flex={1} flexGrow={1} ml={2}>
                    {activeTab === 0 && (
                        <Box flex={11} ml={2}>
                            <Table
                                onRowSelected={(r) => {
                                    setSelectedJob(r);
                                    setActiveTab(1);
                                    // setJobModal(true);
                                }}
                            />
                        </Box>
                    )}
                    {activeTab === 1 && selectedJob && (
                        <Details
                            initialValue={selectedJob}
                            onNoteSelected={(n) => {
                                setSelectedNote(n);
                                setNoteModal(true);
                            }}
                            onDocumentSelected={(d) => {
                                setSelectedDocument(d);
                                setDocumentModal(true);
                            }}
                        />
                    )}
                </Box>
            </Box>
        </>
    );
}
