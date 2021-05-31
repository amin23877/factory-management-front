import React, { useState } from "react";
import { Container, Box, Tabs, Tab, ListItem, IconButton } from "@material-ui/core";
import { AddRounded, NoteAddRounded, FileCopyRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Table from "./Table";
import Details from "./Details";

import List from "../../app/SideUtilityList";
import JobModal from "../../features/Tickets/Modals";

import { IJob } from "../../api/job";
import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import { INote } from "../../api/note";
import { IDocument } from "../../api/document";

export default function Tickets() {
    const [jobModal, setJobModal] = useState(false);
    const [noteModal, setNoteModal] = useState(false);
    const [documentModal, setDocumentModal] = useState(false);

    const [selectedJob, setSelectedJob] = useState<IJob>();
    const [selectedNote, setSelectedNote] = useState<INote>();
    const [selectedDocument, setSelectedDocument] = useState<IDocument>();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            {selectedJob && (
                <NoteModal
                    open={noteModal}
                    onClose={() => setNoteModal(false)}
                    model="job"
                    itemId={selectedJob.id}
                    noteData={selectedNote}
                    onDone={() => mutate(`/note/job/${selectedJob.id}`)}
                />
            )}
            {selectedJob && (
                <DocumentModal
                    open={documentModal}
                    onClose={() => setDocumentModal(false)}
                    model="job"
                    itemId={selectedJob.id}
                    docData={selectedDocument}
                    onDone={() => mutate(`/document/job/${selectedJob.id}`)}
                />
            )}
            <JobModal open={jobModal} onClose={() => setJobModal(false)} />

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
                            <IconButton onClick={() => setJobModal(true)}>
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
        </Container>
    );
}
