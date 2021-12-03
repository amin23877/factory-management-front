import React, { useState } from "react";
import { Box, Tabs, Tab, ListItem, IconButton } from "@material-ui/core";
import {
    AddRounded,
    NoteAddRounded,
    FileCopyRounded,
    ShoppingCartRounded,
    PostAddRounded,
    CategoryRounded,
    LocalOfferRounded,
    PlaylistAddCheckRounded,
    FindInPageRounded,
    ListAltRounded,
} from "@material-ui/icons";
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
import AddTagModal from "./AddTag";
import AddStatusModal from "./AddStatus";
import AddCategoryModal from "./AddCategory";
import { BasePaper } from "../../app/Paper";

export default function Tickets() {
    const [ticketModal, setTicketModal] = useState(false);
    const [noteModal, setNoteModal] = useState(false);
    const [documentModal, setDocumentModal] = useState(false);
    const [soModal, setSoModal] = useState(false);
    const [quoteModal, setQuoteModal] = useState(false);
    const [tagModal, setTagModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);

    const [selectedJob, setSelectedJob] = useState<ITicket>({
        id: "",
        note: "",
        priority: "",
        productionStatus: "",
        status: "",
        subject: "",
        tags: "",
        updatedAt: +new Date(),
        deadline: +new Date(),
        name: "",
        ItemId: { description: "", name: "", active: false, id: "" },
        ContactId: "",
        LineServiceRecordId: "",
        __v: 1,
        callTime: +new Date(),
        date: +new Date(),
        description: "",
        fsh: false,
    });
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
            <AddTagModal open={tagModal} onClose={() => setTagModal(false)} />
            <AddStatusModal open={statusModal} onClose={() => setStatusModal(false)} />
            <AddCategoryModal open={categoryModal} onClose={() => setCategoryModal(false)} />

            <BasePaper style={{ height: "100%" }}>
                <Box display="flex">
                    <Tabs
                        textColor="primary"
                        value={activeTab}
                        onChange={(e, nv) => setActiveTab(nv)}
                        style={{ marginBottom: 10 }}
                    >
                        <Tab
                            icon={
                                <span
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                                >
                                    <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                                </span>
                            }
                            wrapped
                        />
                        <Tab
                            disabled={!selectedJob}
                            icon={
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                                </span>
                            }
                        />
                    </Tabs>
                    <Box marginLeft="auto">
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
                                <IconButton
                                    title="Add Tag"
                                    onClick={() => {
                                        setTagModal(true);
                                    }}
                                >
                                    <LocalOfferRounded />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <IconButton
                                    title="Add Status"
                                    onClick={() => {
                                        setStatusModal(true);
                                    }}
                                >
                                    <PlaylistAddCheckRounded />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <IconButton
                                    title="Add Category"
                                    onClick={() => {
                                        setCategoryModal(true);
                                    }}
                                >
                                    <CategoryRounded />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <IconButton
                                    disabled={activeTab !== 1}
                                    title="Add new SO"
                                    onClick={() => setSoModal(true)}
                                >
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
                </Box>
                <Box display="flex" height="90%">
                    {activeTab === 0 && (
                        <Table
                            onRowSelected={(r) => {
                                setSelectedJob(r);
                                setActiveTab(1);
                            }}
                        />
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
            </BasePaper>
        </>
    );
}
