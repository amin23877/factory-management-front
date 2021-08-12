import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import useSWR from "swr";

import Button from "../../../app/Button";

import { INote } from "../../../api/note";
import { IDocument } from "../../../api/document";
import { deleteQuote, IQuote } from "../../../api/quote";
import { IActivity } from "../../../api/activity";
import { ILineItem } from "../../../api/lineItem";

import EditTab from "./EditTab";

import Confirm from "../../Modals/Confirm";
import NoteModal from "../../Modals/NoteModals";
import DocumentModal from "../../Modals/DocumentModals";
import LineItemModal from "./LineItemModals";

import AddQuote from "./AddQuote";
import AddLineServiceModal from "../../LineService";
import { ILineService } from "../../../api/lineService";
import { BasePaper } from "../../../app/Paper";
import QuoteDatagrid from "./Datagrid";

export default function QuotePanel() {
    const [selectedQuote, setSelectedQuote] = useState<IQuote>();
    const [selectedLI, setSelectedLI] = useState<ILineItem>();
    const [selectedLS, setSelectedLS] = useState<ILineService>();
    const [selectedNote, setSelectedNote] = useState<INote>();
    const [selectedDoc, setSelectedDocs] = useState<IDocument>();

    const { mutate: mutateQuotes } = useSWR("/quote");

    const { data: activities } = useSWR<IActivity[]>(
        selectedQuote && selectedQuote.id ? `/activity/quote/${selectedQuote.id}` : null
    );
    const { data: notes } = useSWR(selectedQuote && selectedQuote.id ? `/note/quote/${selectedQuote.id}` : null);
    const { data: documents } = useSWR(
        selectedQuote && selectedQuote.id ? `/document/quote/${selectedQuote.id}` : null
    );
    const { data: lineItems, mutate: mutateLineItems } = useSWR(
        selectedQuote && selectedQuote.id ? `/lineitem?QuoteId=${selectedQuote.id}` : null
    );
    const { data: lineServices } = useSWR(
        selectedQuote && selectedQuote.id ? `/lineservice?QuoteId=${selectedQuote.id}` : null
    );

    const [activeTab, setActiveTab] = useState(0);

    const [addQ, setAddQ] = useState(false);

    const [addLineItem, setAddLineItem] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [addDoc, setAddDoc] = useState(false);
    const [editLineItem, setEditLineItem] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [editDoc, setEditDoc] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [lineServiceModal, setLineServiceModal] = useState(false);
    const [compQ] = useState<any>();

    const handleDelete = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await deleteQuote(selectedQuote.id);
                if (resp) {
                    mutateQuotes();
                }
                setConfirm(false);
                setActiveTab(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />

            <AddQuote
                open={addQ}
                onClose={() => setAddQ(false)}
                initialData={compQ}
                onDone={() => {
                    console.log("done");
                }}
            />

            {selectedQuote && selectedQuote.id && (
                <NoteModal itemId={selectedQuote.id} model="quote" open={addNote} onClose={() => setAddNote(false)} />
            )}
            {selectedQuote && selectedQuote.id && (
                <DocumentModal itemId={selectedQuote.id} model="quote" open={addDoc} onClose={() => setAddDoc(false)} />
            )}
            {selectedNote && selectedQuote && selectedQuote?.id && (
                <NoteModal
                    noteData={selectedNote}
                    itemId={selectedQuote?.id}
                    model="quote"
                    open={editNote}
                    onClose={() => setEditNote(false)}
                />
            )}
            {selectedDoc && selectedQuote && selectedQuote?.id && (
                <DocumentModal
                    docData={selectedDoc}
                    itemId={selectedQuote?.id}
                    model="quote"
                    open={editDoc}
                    onClose={() => setEditDoc(false)}
                />
            )}
            <LineItemModal
                open={addLineItem}
                onClose={() => setAddLineItem(false)}
                quoteId={selectedQuote?.id}
                onDone={mutateLineItems}
            />
            {selectedLI && (
                <LineItemModal
                    LIData={selectedLI}
                    open={editLineItem}
                    onClose={() => setEditLineItem(false)}
                    quoteId={selectedQuote?.id}
                    onDone={mutateLineItems}
                />
            )}
            {selectedQuote && selectedQuote.id && (
                <AddLineServiceModal
                    open={lineServiceModal}
                    onClose={() => setLineServiceModal(false)}
                    record="Quote"
                    recordId={selectedQuote.id}
                    selectedLine={selectedLS}
                />
            )}

            <Box mb={2} display="flex" alignItems="center">
                <Button
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                    onClick={() => setAddQ(true)}
                >
                    <AddRoundedIcon />
                    Add Quote
                </Button>
                {selectedQuote ? (
                    <div>
                        <Button kind="delete" onClick={() => setConfirm(true)} disabled={!selectedQuote}>
                            Delete Quote
                        </Button>
                        <Button
                            kind="add"
                            onClick={() => setAddLineItem(true)}
                            disabled={!selectedQuote}
                            style={{ margin: "0 0.5em" }}
                        >
                            Add Line item
                        </Button>
                        <Button
                            kind="add"
                            onClick={() => setLineServiceModal(true)}
                            disabled={!selectedQuote}
                            // style={{ margin: "0 0.5em" }}
                        >
                            Add Line Service
                        </Button>
                        {/* <Button
                            kind="add"
                            onClick={() => setAddNote(true)}
                            disabled={!selectedQuote}
                            style={{ margin: "0 0.5em" }}
                        >
                            Add Note
                        </Button>

                        <Button style={{ margin: "0 0.5em" }} onClick={() => setAddDoc(true)} disabled={!selectedQuote}>
                            Add Document
                        </Button> */}
                    </div>
                ) : null}
                <div style={{ flexGrow: 1 }} />
            </Box>

            <BasePaper>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedQuote} />
                </Tabs>
                {activeTab === 0 && (
                    <QuoteDatagrid
                        onRowSelected={(d) => {
                            setSelectedQuote(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selectedQuote && (
                    <EditTab
                        onLISelected={(d) => {
                            setSelectedLI(d);
                            setEditLineItem(true);
                        }}
                        onLSSelected={(d) => {
                            setSelectedLS(d);
                            setLineServiceModal(true);
                        }}
                        onNoteSelected={(d) => {
                            setSelectedNote(d);
                            setEditNote(true);
                        }}
                        onDocSelected={(d) => {
                            setSelectedDocs(d);
                            setEditDoc(true);
                        }}
                        activities={activities || []}
                        notes={notes || []}
                        docs={documents || []}
                        lineItems={lineItems || []}
                        lineServices={lineServices || []}
                        selectedQuote={selectedQuote}
                    />
                )}
            </BasePaper>
        </Box>
    );
}
