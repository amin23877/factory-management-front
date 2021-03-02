import React, { useState, useEffect } from "react";
import { Box, Button, Tabs, Tab, makeStyles } from "@material-ui/core";
import { ColDef } from "@material-ui/data-grid";

import { INote, getAllModelNotes } from "../../api/note";
import { IDocument, getAllModelDocuments } from "../../api/document";
import { getQuotes, getLineItems, IQuote, ILineItem } from "../../api/quote";
import { getQuoteActivities } from "../../api/activity";

import Snack from "../../app/Snack";
import BaseDataGrid from "../../app/BaseDataGrid";
import EditTab from "./EditTab";

import NoteModal from "../Modals/NoteModals";
import DocumentModal from "../Modals/DocumentModals";
import LineItemModal from "./LineItemModals";

import AddQuoteModal from "./Modals";

const useStyles = makeStyles({
    TabContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        margin: "0.5em",
        padding: "0.5em",
    },
});

export default function QuotePanel() {
    const [activeTab, setActiveTab] = useState(0);
    const [quotes, setQuotes] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    const [notes, setNotes] = useState([]);
    const [docs, setDocs] = useState([]);
    const [activities, setActivities] = useState([]);

    const [selectedQuote, setSelectedQuote] = useState<IQuote>();
    const [selectedLI, setSelectedLI] = useState<ILineItem>();
    const [selectedNote, setSelectedNote] = useState<INote>();
    const [selectedDoc, setSelectedDocs] = useState<IDocument>();

    const [addQ, setAddQ] = useState(false);

    const [addLineItem, setAddLineItem] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [addDoc, setAddDoc] = useState(false);
    const [editLineItem, setEditLineItem] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [editDoc, setEditDoc] = useState(false);

    const [showSnack, setShowSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const classes = useStyles();

    const quoteCols: ColDef[] = [
        { field: "entryDate", width: 150 },
        { field: "expireDate", width: 150 },
        { field: "quoteStatus", width: 150 },
    ];

    const refreshQuotes = async () => {
        try {
            const resp = await getQuotes();
            if (resp && resp.length > 0) {
                setQuotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshActivities = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await getQuoteActivities(selectedQuote?.id);
                setActivities(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshNotes = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await getAllModelNotes("quote", selectedQuote.id);
                setNotes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshDocs = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await getAllModelDocuments("quote", selectedQuote.id);
                setDocs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshLineItems = async () => {
        try {
            if (selectedQuote && selectedQuote.id) {
                const resp = await getLineItems(selectedQuote?.id);
                setLineItems(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshQuotes();
        refreshLineItems();
        refreshNotes();
        refreshDocs();
        refreshActivities();
    }, [selectedQuote]);

    return (
        <div>
            <AddQuoteModal open={addQ} onClose={() => setAddQ(false)} onDone={refreshQuotes} />
            <LineItemModal open={addLineItem} onClose={() => setAddLineItem(false)} quoteId={selectedQuote?.id} onDone={refreshLineItems} />
            {selectedQuote && selectedQuote.id && (
                <NoteModal itemId={selectedQuote.id} model="quote" open={addNote} onClose={() => setAddNote(false)} onDone={refreshNotes} />
            )}
            {selectedQuote && selectedQuote.id && (
                <DocumentModal
                    itemId={selectedQuote.id}
                    model="quote"
                    open={addDoc}
                    onClose={() => setAddDoc(false)}
                    onDone={refreshDocs}
                />
            )}
            {selectedNote && selectedQuote && selectedQuote?.id && (
                <NoteModal
                    noteData={selectedNote}
                    itemId={selectedQuote?.id}
                    model="quote"
                    open={editNote}
                    onClose={() => setEditNote(false)}
                    onDone={refreshNotes}
                />
            )}
            {selectedDoc && selectedQuote && selectedQuote?.id && (
                <DocumentModal
                    docData={selectedDoc}
                    itemId={selectedQuote?.id}
                    model="quote"
                    open={editDoc}
                    onClose={() => setEditDoc(false)}
                    onDone={refreshDocs}
                />
            )}
            {selectedLI && (
                <LineItemModal
                    LIData={selectedLI}
                    open={editLineItem}
                    onClose={() => setEditLineItem(false)}
                    quoteId={selectedQuote?.id}
                    onDone={refreshLineItems}
                />
            )}

            <Snack open={showSnack} onClose={() => setShowSnack(false)}>
                {msg}
            </Snack>

            <Box display="flex" alignItems="center" className="sticky-toolbar">
                <Button onClick={() => setAddQ(true)}>Add Quote</Button>
                <Button onClick={() => setAddLineItem(true)} disabled={!selectedQuote} style={{ margin: "0 0.5em" }}>
                    Add Line item
                </Button>
                <Button onClick={() => setAddNote(true)} disabled={!selectedQuote} style={{ marginRight: "0.5em" }}>
                    Add Note
                </Button>
                <Button onClick={() => setAddDoc(true)} disabled={!selectedQuote}>
                    Add Document
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selectedQuote} />
                </Tabs>
            </Box>
            <Box className={classes.TabContainer}>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={quoteCols}
                        rows={quotes}
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
                        onNoteSelected={(d) => {
                            setSelectedNote(d);
                            setEditNote(true);
                        }}
                        onDocSelected={(d) => {
                            setSelectedDocs(d);
                            setEditDoc(true);
                        }}
                        activities={activities}
                        notes={notes}
                        docs={docs}
                        lineItems={lineItems}
                        onDone={() => {
                            setShowSnack(true);
                            setMsg("Record updated");
                            refreshQuotes();
                        }}
                        selectedQuote={selectedQuote}
                    />
                )}
            </Box>
        </div>
    );
}
